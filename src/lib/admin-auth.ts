import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { AdminRole, AdminUser } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ADMIN_COOKIE, SESSION_MS } from "@/lib/admin-constants";

export { ADMIN_COOKIE } from "@/lib/admin-constants";

export type AdminSessionUser = Pick<
  AdminUser,
  "id" | "email" | "name" | "role" | "mfaEnabled"
>;

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}

export async function createAdminSession(
  user: AdminSessionUser,
  meta?: { ip?: string; userAgent?: string }
): Promise<string | null> {
  const secret = getJwtSecret();
  if (!secret) return null;

  const expiresAt = new Date(Date.now() + SESSION_MS);
  const session = await prisma.adminSession.create({
    data: {
      userId: user.id,
      expiresAt,
      ip: meta?.ip,
      userAgent: meta?.userAgent,
    },
  });

  return new SignJWT({ sid: session.id, uid: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(secret);
}

export async function verifyAdminSessionToken(
  token: string | undefined
): Promise<{ user: AdminSessionUser; sessionId: string } | null> {
  const secret = getJwtSecret();
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const sessionId = payload.sid;
    const userId = payload.uid;
    if (typeof sessionId !== "string" || typeof userId !== "string") return null;

    const session = await prisma.adminSession.findFirst({
      where: {
        id: sessionId,
        userId,
        revokedAt: null,
        expiresAt: { gt: new Date() },
        user: { active: true },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            mfaEnabled: true,
          },
        },
      },
    });

    if (!session) return null;

    return { user: session.user, sessionId: session.id };
  } catch {
    return null;
  }
}

export async function revokeAdminSession(sessionId: string): Promise<void> {
  await prisma.adminSession.updateMany({
    where: { id: sessionId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

export async function revokeAllUserSessions(
  userId: string,
  exceptSessionId?: string
): Promise<void> {
  await prisma.adminSession.updateMany({
    where: {
      userId,
      revokedAt: null,
      ...(exceptSessionId ? { id: { not: exceptSessionId } } : {}),
    },
    data: { revokedAt: new Date() },
  });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const auth = await verifyAdminSessionToken(
    cookieStore.get(ADMIN_COOKIE)?.value
  );
  return Boolean(auth);
}

export async function getAuthenticatedAdmin(): Promise<{
  user: AdminSessionUser;
  sessionId: string;
} | null> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function requireAdminApi(
  request: NextRequest
): Promise<{ user: AdminSessionUser; sessionId: string } | null> {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export function isSuperAdmin(role: AdminRole): boolean {
  return role === "SUPER_ADMIN";
}
