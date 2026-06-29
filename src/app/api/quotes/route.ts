import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { notifyAdminNewQuote } from "@/lib/notify-admin";
import { notifyClientQuoteConfirmation } from "@/lib/notify-client";
import { quoteRequestSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp, isHoneypotFilled } from "@/lib/rate-limit";
import { handleApiError, jsonError } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const rate = await checkRateLimit(`quote:${ip}`);
    if (!rate.allowed) {
      return jsonError("Too many requests", 429);
    }

    const body = await request.json();
    const data = quoteRequestSchema.parse(body);

    if (isHoneypotFilled(data.website)) {
      return NextResponse.json({ id: "filtered" }, { status: 201 });
    }

    const record = await prisma.quoteRequest.create({
      data: {
        locale: data.locale,
        company: data.company,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || null,
        projectSlugs: data.projectSlugs,
        customProject: data.customProject,
        sector: data.sector,
        companySize: data.companySize,
        description: data.description,
        modules: data.modules,
        userCount: data.userCount,
        integrations: data.integrations,
        needsMobile: data.needsMobile,
        needsMultiSite: data.needsMultiSite,
        existingSystems: data.existingSystems || null,
        timeline: data.timeline,
        complexity: data.complexity,
        specification: data.specification,
      },
      select: { id: true },
    });

    notifyAdminNewQuote(record.id, data).catch((err) => {
      console.error("[quotes] notification admin:", err);
    });

    notifyClientQuoteConfirmation(record.id, data).catch((err) => {
      console.error("[quotes] confirmation client:", err);
    });

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
