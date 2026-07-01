import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateTotpSecret,
  getTotpQrDataUrl,
  verifyTotpToken,
} from "@/lib/admin-totp";
import {
  requireAdminApi,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { adminMfaEnableSchema, adminMfaDisableSchema } from "@/lib/admin-validation";
import { handleApiError, jsonError } from "@/lib/api-utils";
import { verifyPassword } from "@/lib/admin-password";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    const user = await prisma.adminUser.findUnique({
      where: { id: auth.user.id },
    });
    if (!user) return unauthorizedResponse();
    if (user.mfaEnabled) {
      return jsonError("MFA already enabled", 400);
    }

    const secret = generateTotpSecret();
    const qrDataUrl = await getTotpQrDataUrl(user.email, secret);

    return NextResponse.json({ secret, qrDataUrl });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    const body = adminMfaEnableSchema.parse(await request.json());
    if (!verifyTotpToken(body.secret, body.totpCode)) {
      return jsonError("Invalid MFA code", 400);
    }

    await prisma.adminUser.update({
      where: { id: auth.user.id },
      data: { totpSecret: body.secret, mfaEnabled: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    const body = adminMfaDisableSchema.parse(await request.json());
    const user = await prisma.adminUser.findUnique({
      where: { id: auth.user.id },
    });
    if (!user?.totpSecret) {
      return jsonError("MFA not enabled", 400);
    }

    const passwordOk = await verifyPassword(body.password, user.passwordHash);
    if (!passwordOk) {
      return jsonError("Invalid credentials", 401);
    }

    if (!verifyTotpToken(user.totpSecret, body.totpCode)) {
      return jsonError("Invalid MFA code", 401);
    }

    await prisma.adminUser.update({
      where: { id: auth.user.id },
      data: { totpSecret: null, mfaEnabled: false },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
