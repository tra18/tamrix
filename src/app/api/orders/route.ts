import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdminNewOrder } from "@/lib/notify-admin";
import { notifyClientOrderConfirmation } from "@/lib/notify-client";
import { orderRequestSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp, isHoneypotFilled } from "@/lib/rate-limit";
import { handleApiError, jsonError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = await checkRateLimit(`order:${ip}`);
    if (!rate.allowed) {
      return jsonError("Too many requests", 429);
    }

    const body = await request.json();
    const data = orderRequestSchema.parse(body);

    if (isHoneypotFilled(data.website)) {
      return NextResponse.json({ id: "filtered" }, { status: 201 });
    }

    const record = await prisma.orderRequest.create({
      data: {
        locale: data.locale,
        appSlug: data.appSlug,
        appName: data.appName,
        company: data.company,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || null,
        plan: data.plan,
        notes: data.notes || null,
      },
      select: { id: true },
    });

    notifyAdminNewOrder(record.id, data).catch((err) => {
      console.error("[orders] notification admin:", err);
    });

    notifyClientOrderConfirmation(record.id, data).catch((err) => {
      console.error("[orders] confirmation client:", err);
    });

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
