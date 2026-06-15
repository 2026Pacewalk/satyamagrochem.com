import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { SESSION_COOKIE } from "./admin-config";

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "dev-insecure-secret-change-me",
);

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME || "";
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!username || !password || !hash) return false;
  if (username !== expectedUser) return false;
  return bcrypt.compare(password, hash);
}

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    // Only mark Secure when actually served over HTTPS (set in production).
    // Over plain HTTP (local dev) a Secure cookie is silently dropped.
    secure: process.env.APP_SECURE_COOKIES === "1",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function signSession(username: string): Promise<string> {
  return new SignJWT({ admin: true, username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function createSession(username: string): Promise<void> {
  const token = await signSession(username);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions());
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<{ username: string } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { username: String(payload.username ?? "admin") };
  } catch {
    return null;
  }
}
