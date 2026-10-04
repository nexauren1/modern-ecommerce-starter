import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "mc_admin_session";
const SESSION_DAYS = 7;

function getAdminConfig() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!email || !password || !secret) {
    throw new Error("Admin authentication is not configured.");
  }
  return { email, password, secret };
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function createAdminSession(email: string) {
  const { secret } = getAdminConfig();
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ email, expiresAt }), "utf8").toString("base64url");
  return payload + "." + sign(payload, secret);
}

export function verifyAdminSession(token?: string | null) {
  if (!token) return null;
  try {
    const { secret, email: ownerEmail } = getAdminConfig();
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;
    const expected = sign(payload, secret);
    const valid = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!valid) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; expiresAt?: number };
    if (!data.email || !data.expiresAt || data.expiresAt < Date.now()) return null;
    if (data.email !== ownerEmail) return null;
    return { email: data.email, expiresAt: data.expiresAt };
  } catch {
    return null;
  }
}

export function credentialsMatch(email: string, password: string) {
  const config = getAdminConfig();
  return email === config.email && password === config.password;
}
