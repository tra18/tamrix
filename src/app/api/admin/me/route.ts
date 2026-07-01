import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi, unauthorizedResponse } from "@/lib/admin-auth";
import { handleApiError } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAdminApi(request);
    if (!auth) return unauthorizedResponse();

    return NextResponse.json({ user: auth.user });
  } catch (error) {
    return handleApiError(error);
  }
}
