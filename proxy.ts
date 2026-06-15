import { NextRequest, NextResponse } from "next/server";
import { ADMIN_PATH, SESSION_COOKIE } from "./lib/admin-config";

// Optimistic gate only: redirect visitors with no session cookie straight to
// login. The real cryptographic verification happens in the Node data layer
// (getSession in the admin layout, requireAdmin in every mutating action), so
// a forged cookie still cannot read or change anything.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(ADMIN_PATH)) return NextResponse.next();
  if (pathname === `${ADMIN_PATH}/login`) return NextResponse.next();

  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);
  if (hasCookie) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `${ADMIN_PATH}/login`;
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/sa-console-9x4k2/:path*"],
};
