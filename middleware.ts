import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  if (user.status === 200 && user.data) {
    if (user.data.role[0] === "student") {
      return NextResponse.redirect(new URL("/student", request.url));
    } else if (user.data.role[0] === "teacher") {
      return NextResponse.redirect(new URL("/teacher", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up"],
};
