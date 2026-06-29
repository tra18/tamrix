import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { adminLoginSchema } from "@/lib/admin-validation";
import { handleApiError, jsonError } from "@/lib/api-utils";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = await checkRateLimit(`admin-login:${ip}`, 5, 60_000);
    if (!rate.allowed) {
      return jsonError("Too many attempts", 429);
    }

    const body = adminLoginSchema.parse(await request.json());

    if (!verifyAdminPassword(body.password)) {
      return jsonError("Invalid credentials", 401);
    }

    const token = createSessionToken();
    if (!token) {
      return jsonError("Admin not configured", 503);
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
