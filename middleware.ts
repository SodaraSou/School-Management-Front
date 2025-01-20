import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUserV2 } from "./lib/auth";

const protectedRoutes = ["/student", "/dashboard"];

export default async function middleware(request: NextRequest) {
  // const url = new URL(request.url);
  // const currentPath = url.pathname;

  // if (currentPath === "/") {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const user = await getCurrentUserV2();

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/" && user) {
    if (user.role[0] === "teacher") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    } else if (user.role[0] === "student") {
      return NextResponse.redirect(new URL("/student", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
  ],
};
