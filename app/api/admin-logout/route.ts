import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE } from "@/lib/admin-config";

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL(`${ADMIN_PATH}/login`, req.url), {
    status: 303,
  });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
