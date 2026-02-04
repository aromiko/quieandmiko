import * as crypto from "crypto";

const SECRET_KEY = process.env.RSVP_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("[Crypto]: RSVP_SECRET_KEY environment variable is required");
}

export function generateDeterministicCode(rsvpCode: string): string {
  const hmac = crypto.createHmac("sha256", SECRET_KEY as string);
  hmac.update(rsvpCode);
  const digest = hmac.digest("base64url");
  return digest;
}
