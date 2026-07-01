import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/admin-password";
import {
  forbiddenResponse,
  isSuperAdmin,
  requireAdminApi,
  unauthorizedResponse,
} from "@/lib/admin-auth";
import { adminCreateUserSchema } from "@/lib/admin-validation";
import { handleApiError, jsonError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();
    if (!isSuperAdmin(auth.user.role)) return forbiddenResponse();

    const users = await prisma.adminUser.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        mfaEnabled: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();
    if (!isSuperAdmin(auth.user.role)) return forbiddenResponse();

    const body = adminCreateUserSchema.parse(await request.json());

    const existing = await prisma.adminUser.findUnique({
      where: { email: body.email },
    });
    if (existing) {
      return jsonError("Email already registered", 409);
    }

    const user = await prisma.adminUser.create({
      data: {
        email: body.email,
        name: body.name,
        passwordHash: await hashPassword(body.password),
        role: body.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        active: true,
        mfaEnabled: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
