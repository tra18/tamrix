import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
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
