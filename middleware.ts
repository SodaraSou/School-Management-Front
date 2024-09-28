import { NextRequest, NextResponse } from "next/server";
import axios from "./lib/axios";

// Define route access for different roles
const ROUTE_ACCESS = {
  PUBLIC: ["/", "/sign-in", "/sign-up"],
  USER: ["/dashboard"],
  ADMIN: ["/admin"],
  SCHOOL_ADMIN: [""],
  DEPARTMENT_ADMIN: [""],
  SUPER_ADMIN: ["/super-admin"],
};

export default async function middleware(request: NextRequest) {
  const currentPath = new URL(request.url).pathname;
  const cookieSession = request.cookies.get("session")?.value || "";
  let user = null;

  if (cookieSession) {
    try {
      const res = await axios.get("/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieSession}`,
        },
      });
      user = res.data;
    } catch (error: any) {
      console.log(error.response || "Error fetching user data");
    }
  }

  // If user is not authenticated and trying to access a protected route
  if (!user && !ROUTE_ACCESS.PUBLIC.includes(currentPath)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Check user role and authorize access
  if (user) {
    // Redirect authenticated users away from temp-sign-in and temp-sign-up
    if (currentPath === "/sign-in" || currentPath === "/sign-up") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const userRole = getUserRole(user);
    const allowedRoutes = getAllowedRoutes(userRole);

    if (!allowedRoutes.includes(currentPath)) {
      // Redirect to an appropriate page (e.g., dashboard or unauthorized page)
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

function getUserRole(user: any): string {
  if (user.is_super_admin) return "SUPER_ADMIN";
  if (user.roles.includes("School Admin")) return "ADMIN";
  return "USER";
}

function getAllowedRoutes(role: string): string[] {
  switch (role) {
    case "SUPER_ADMIN":
      return [
        ...ROUTE_ACCESS.PUBLIC,
        ...ROUTE_ACCESS.USER,
        ...ROUTE_ACCESS.ADMIN,
        ...ROUTE_ACCESS.SUPER_ADMIN,
      ];
    case "ADMIN":
      return [
        ...ROUTE_ACCESS.PUBLIC,
        ...ROUTE_ACCESS.USER,
        ...ROUTE_ACCESS.ADMIN,
      ];
    case "USER":
      return [...ROUTE_ACCESS.PUBLIC, ...ROUTE_ACCESS.USER];
    default:
      return ROUTE_ACCESS.PUBLIC;
  }
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/admin",
    "/super-admin",
  ],
};
