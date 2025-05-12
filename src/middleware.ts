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
  const isProtectedRoutes = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  if (isProtectedRoutes && !payload?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (isPublicRoutes && payload?.userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  return res;
}
export const config = {
  matcher: "/api/:path*",
};
