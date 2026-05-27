import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
  "/api/health",
]);

const isApi = createRouteMatcher(["/api/(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublic(req)) {
    if (isApi(req)) {
      auth().protect();
    } else {
      const { userId, redirectToSignIn } = auth();
      if (!userId) return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
  const res = NextResponse.next();
  res.headers.set("x-pathname", req.nextUrl.pathname);
  return res;
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/(.*)"],
};
