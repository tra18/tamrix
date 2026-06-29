import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const memoryStore = new Map<string, { count: number; resetAt: number }>();
const upstashCache = new Map<string, Ratelimit>();

function getUpstashRatelimit(limit: number, windowSec: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;

  const cacheKey = `${limit}:${windowSec}`;
  const cached = upstashCache.get(cacheKey);
  if (cached) return cached;

  const ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
    analytics: false,
    prefix: `tamrix:${cacheKey}`,
  });
  upstashCache.set(cacheKey, ratelimit);
  return ratelimit;
}

function checkMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true };
}

export async function checkRateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000
): Promise<{ allowed: boolean; retryAfterSec?: number }> {
  const windowSec = Math.max(1, Math.ceil(windowMs / 1000));
  const upstash = getUpstashRatelimit(limit, windowSec);

  if (upstash) {
    const result = await upstash.limit(key);
    if (result.success) return { allowed: true };
    return {
      allowed: false,
      retryAfterSec: Math.max(
        1,
        Math.ceil((result.reset - Date.now()) / 1000)
      ),
    };
  }

  return checkMemoryRateLimit(key, limit, windowMs);
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isHoneypotFilled(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}
