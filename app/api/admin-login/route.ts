import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, signSession, sessionCookieOptions } from "@/lib/auth";
import { ADMIN_PATH, SESSION_COOKIE } from "@/lib/admin-config";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const username = String(form.get("username") ?? "");
  const password = String(form.get("password") ?? "");

  const ok = await verifyCredentials(username, password);
  if (!ok) {
    return NextResponse.redirect(new URL(`${ADMIN_PATH}/login?error=1`, req.url), {
      status: 303,
    });
  }

  const token = await signSession(username);
  const res = NextResponse.redirect(new URL(ADMIN_PATH, req.url), { status: 303 });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
