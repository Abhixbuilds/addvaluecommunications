/**
 * proxy.ts — Next.js 16+ Route Proxy (replaces middleware.ts)
 *
 * Phase 5 — Route Protection
 *
 * Current state: Passthrough (Clerk keys not yet configured).
 * When real keys are added to .env.local, switch to the Clerk block below.
 *
 * HOW TO ACTIVATE:
 * 1. Add real keys to .env.local:
 *    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
 *    CLERK_SECRET_KEY=sk_live_xxx
 * 2. Comment out the passthrough export
 * 3. Uncomment the Clerk block below
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── PASSTHROUGH (active until real Clerk keys are set) ──────────────
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

/* ── CLERK ROUTE PROTECTION (uncomment when keys are ready) ──────────
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/services(.*)",
  "/onboarding(.*)",
  "/recommendation(.*)",
  "/book-consultation(.*)",
  "/payment(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/ai/(.*)",
  "/api/payments/webhook(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  }
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
─────────────────────────────────────────────────── */
