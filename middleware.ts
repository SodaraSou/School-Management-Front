import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUserV2 } from "./lib/auth";
import { cookies } from "next/headers";

const PROTECTED_ROUTES = ["/teacher", "/student", "/dashboard"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const cookie = (await cookies()).get("session")?.value;
  const user = await getCurrentUserV2();

  if (isProtectedRoute) {
    if (!user && !cookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user?.role[0] === "teacher" && pathname === "/student") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
    if (user?.role[0] === "student" && pathname === "/teacher") {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  if ((pathname === "/sign-in" || pathname === "/sign-up") && user) {
    if (user?.role[0] === "teacher") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
    if (user?.role[0] === "student") {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  if (pathname === "/" && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
