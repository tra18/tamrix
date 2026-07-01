const PLACEHOLDER_SECRETS = new Set([
  "changez-moi-mot-de-passe-tres-long",
  "changez-moi-secret-hmac-tres-long",
  "changez-moi-postgres-tres-long",
]);

export function validateProductionEnv(): void {
  if (process.env.NODE_ENV !== "production") return;

  const password = process.env.ADMIN_PASSWORD?.trim();
  const secret = process.env.ADMIN_SECRET?.trim();
  const email = process.env.ADMIN_EMAIL?.trim();

  if (!email || !email.includes("@")) {
    throw new Error(
      "[security] ADMIN_EMAIL must be set in production for the initial admin account"
    );
  }

  if (!password || password.length < 16 || PLACEHOLDER_SECRETS.has(password)) {
    throw new Error(
      "[security] ADMIN_PASSWORD must be at least 16 characters and not a placeholder in production"
    );
  }

  if (!secret || secret.length < 32 || PLACEHOLDER_SECRETS.has(secret)) {
    throw new Error(
      "[security] ADMIN_SECRET must be at least 32 characters and not a placeholder in production"
    );
  }

  const hasUpstash =
    Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim()) &&
    Boolean(process.env.UPSTASH_REDIS_REST_TOKEN?.trim());

  if (!hasUpstash) {
    console.error(
      "[security] UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required in production for rate limiting"
    );
  }

  const hasTurnstile =
    Boolean(process.env.TURNSTILE_SECRET_KEY?.trim()) &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim());

  if (!hasTurnstile) {
    console.error(
      "[security] TURNSTILE_SECRET_KEY and NEXT_PUBLIC_TURNSTILE_SITE_KEY are required in production"
    );
  }
}
