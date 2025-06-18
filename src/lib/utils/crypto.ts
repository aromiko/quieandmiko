import * as crypto from "crypto";

const SECRET_KEY = process.env.RSVP_SECRET_KEY!;

export function generateDeterministicCode(rsvpCode: string): string {
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(rsvpCode);
  const digest = hmac.digest("base64url");
  return digest;
}
