import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUserV2 } from "./lib/auth";

const PROTECTED_ROUTES = ["/dashboard", "/subject", "/group"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const cookieToken = request.cookies.get("session") || "";
  const user = await getCurrentUserV2();

  if (isProtectedRoute && (!cookieToken || !user)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
