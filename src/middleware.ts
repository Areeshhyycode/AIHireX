import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher([
  "/",
  "/login(.*)",
  "/register(.*)",
  "/api/health",
]);

const isApi = createRouteMatcher(["/api/(.*)"]);

// Short URLs people may type after sign-in. Map to the candidate equivalents.
const shortRedirects: Record<string, string> = {
  "/jobs": "/candidate/jobs",
  "/resume": "/candidate/resume",
  "/chat": "/candidate/chat",
  "/interview": "/candidate/interview",
  "/applications": "/candidate/applications",
  "/profile": "/candidate/profile",
  "/settings": "/candidate/settings",
  "/notifications": "/candidate/notifications",
  "/saved": "/candidate/saved",
  "/dashboard": "/candidate",
};

export default clerkMiddleware((auth, req) => {
  const target = shortRedirects[req.nextUrl.pathname];
  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }
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
