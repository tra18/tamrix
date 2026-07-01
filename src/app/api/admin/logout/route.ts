import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  requireAdminApi,
  revokeAdminSession,
  sessionCookieOptions,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi(request);
  if (auth) {
    await revokeAdminSession(auth.sessionId);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}
