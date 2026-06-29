import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, unauthorizedResponse } from "@/lib/admin-auth";
import { adminUpdateSchema } from "@/lib/admin-validation";
import { handleApiError } from "@/lib/api-utils";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    if (!requireAdminApi(request)) return unauthorizedResponse();

    const { id } = await context.params;
    const quote = await prisma.quoteRequest.findUnique({ where: { id } });

    if (!quote) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    if (!requireAdminApi(request)) return unauthorizedResponse();

    const { id } = await context.params;
    const body = adminUpdateSchema.parse(await request.json());

    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
        ...(body.adminNotes !== undefined && { adminNotes: body.adminNotes }),
      },
    });

    return NextResponse.json({ quote });
  } catch (error) {
    return handleApiError(error);
  }
}
