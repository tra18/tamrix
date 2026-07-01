import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/admin-password";
import { verifyTotpToken } from "@/lib/admin-totp";
import {
  ADMIN_COOKIE,
  createAdminSession,
  sessionCookieOptions,
} from "@/lib/admin-auth";
import { bootstrapAdminUser } from "@/lib/admin-bootstrap";
import { adminLoginSchema } from "@/lib/admin-validation";
import { handleApiError, jsonError, rateLimitResponse } from "@/lib/api-utils";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { assertTurnstile } from "@/lib/require-turnstile";

export async function POST(request: NextRequest) {
  try {
    await bootstrapAdminUser();

    const ip = getClientIp(request);
    const rate = await checkRateLimit(`admin-login:${ip}`, 5, 60_000);
    if (!rate.allowed) {
      return rateLimitResponse(rate.retryAfterSec);
    }

    const body = adminLoginSchema.parse(await request.json());

    const captchaError = await assertTurnstile(request, body.turnstileToken);
    if (captchaError) return captchaError;

    const user = await prisma.adminUser.findUnique({
      where: { email: body.email },
    });

    if (!user?.active) {
      return jsonError("Invalid credentials", 401);
    }

    const passwordOk = await verifyPassword(body.password, user.passwordHash);
    if (!passwordOk) {
      return jsonError("Invalid credentials", 401);
    }

    if (user.mfaEnabled) {
      if (!body.totpCode) {
        return NextResponse.json({ requiresMfa: true }, { status: 401 });
      }
      if (!user.totpSecret || !verifyTotpToken(user.totpSecret, body.totpCode)) {
        return jsonError("Invalid MFA code", 401);
      }
    }

    const token = await createAdminSession(user, {
      ip,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    if (!token) {
      return jsonError("Admin not configured", 503);
    }

    const response = NextResponse.json({
      ok: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
    response.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
