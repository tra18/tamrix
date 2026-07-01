import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  forbiddenResponse,
  isSuperAdmin,
  requireAdminApi,
  revokeAdminSession,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { handleApiError, jsonError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    const sessions = await prisma.adminSession.findMany({
      where: { userId: auth.user.id, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        expiresAt: true,
        ip: true,
        userAgent: true,
      },
    });

    return NextResponse.json({
      sessions: sessions.map((s) => ({
        ...s,
        current: s.id === auth.sessionId,
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    const sessionId = request.nextUrl.searchParams.get("id");
    if (!sessionId) return jsonError("Missing session id", 400);

    const session = await prisma.adminSession.findFirst({
      where: { id: sessionId },
    });

    if (!session) return jsonError("Session not found", 404);

    const canRevoke =
      session.userId === auth.user.id ||
      isSuperAdmin(auth.user.role);

    if (!canRevoke) return forbiddenResponse();

    await revokeAdminSession(sessionId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
