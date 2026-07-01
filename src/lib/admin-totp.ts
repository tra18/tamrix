import { generateSecret, generateURI, verifySync } from "otplib";
import QRCode from "qrcode";

export function generateTotpSecret(): string {
  return generateSecret();
}

export function verifyTotpToken(secret: string, token: string): boolean {
  const result = verifySync({
    secret,
    token,
    epochTolerance: 30,
  });
  return result.valid;
}

export function getTotpUri(email: string, secret: string): string {
  return generateURI({
    issuer: "Tamrix Admin",
    label: email,
    secret,
  });
}

export async function getTotpQrDataUrl(
  email: string,
  secret: string
): Promise<string> {
  return QRCode.toDataURL(getTotpUri(email, secret));
}
