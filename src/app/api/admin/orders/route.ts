import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorizedResponse } from "@/lib/admin-auth";
import { handleApiError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    if (!requireAdminApi(request)) return unauthorizedResponse();

    const status = request.nextUrl.searchParams.get("status");

    const orders = await prisma.orderRequest.findMany({
      where: status ? { status: status as never } : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        createdAt: true,
        status: true,
        company: true,
        contactName: true,
        email: true,
        appName: true,
        plan: true,
        locale: true,
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    return handleApiError(error);
  }
}
