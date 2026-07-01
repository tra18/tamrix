import { NextRequest } from "next/server";
import { jsonError } from "@/lib/api-utils";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getClientIp } from "@/lib/rate-limit";

export async function assertTurnstile(
  request: NextRequest,
  token: string | undefined
) {
  const ip = getClientIp(request);
  const valid = await verifyTurnstileToken(token, ip);
  if (!valid) {
    return jsonError("Captcha verification failed", 400);
  }
  return null;
}
