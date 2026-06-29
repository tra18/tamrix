import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE = "tamrix_admin_session";
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 h

function getAdminSecret(): string | null {
  return process.env.ADMIN_SECRET ?? null;
}

export function createSessionToken(): string | null {
  const secret = getAdminSecret();
  if (!secret) return null;

  const exp = Date.now() + SESSION_MS;
  const sig = createHmac("sha256", secret).update(String(exp)).digest("hex");
  return Buffer.from(JSON.stringify({ exp, sig })).toString("base64url");
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = getAdminSecret();
  if (!token || !secret) return false;

  try {
    const { exp, sig } = JSON.parse(
      Buffer.from(token, "base64url").toString("utf8")
    ) as { exp: number; sig: string };

    if (typeof exp !== "number" || typeof sig !== "string") return false;
    if (Date.now() > exp) return false;

    const expected = createHmac("sha256", secret)
      .update(String(exp))
      .digest("hex");

    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return false;

    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
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

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export function requireAdminApi(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
