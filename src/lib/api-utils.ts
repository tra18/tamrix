import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(
  message: string,
  status: number,
  extraHeaders?: Record<string, string>
) {
  return NextResponse.json(
    { error: message },
    { status, headers: extraHeaders }
  );
}

export function rateLimitResponse(retryAfterSec?: number) {
  const headers: Record<string, string> = {};
  if (retryAfterSec) {
    headers["Retry-After"] = String(retryAfterSec);
  }
  return jsonError("Too many requests", 429, headers);
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Invalid request data", 400);
  }

  console.error("[api]", error);

  if (
    error instanceof Error &&
    error.message.includes("Environment variable not found: DATABASE_URL")
  ) {
    return jsonError("Database not configured", 503);
  }

  return jsonError("Internal server error", 500);
}
