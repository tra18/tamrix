import { jwtVerify } from "jose";

function getJwtSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

/** Edge-safe JWT signature check (DB revocation enforced in API routes). */
export async function verifySessionTokenEdge(
  token: string | undefined
): Promise<boolean> {
  const secret = getJwtSecret();
  if (!token || !secret) return false;

  try {
    const { payload } = await jwtVerify(token, secret);
    return typeof payload.sid === "string" && typeof payload.uid === "string";
  } catch {
    return false;
  }
}
