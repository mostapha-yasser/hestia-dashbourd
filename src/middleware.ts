import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

const protectedRoutes = [
  "/",
  "/products",
  "/products/add-product",
  "/products/delete-product",
  "/products/edit-product",
  "/orders",
];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  
  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const cookie = (await cookies()).get("session")?.value;
  const payload = await decrypt(cookie);

  if (isProtectedRoute && !payload?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && payload?.userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
   
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
