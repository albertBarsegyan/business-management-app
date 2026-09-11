import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "@/shared/api/server/cookies";

/**
 * Next.js 16 renamed Middleware to Proxy (functionality unchanged — see
 * `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`).
 *
 * This is the *optimistic* check only, per the framework's own guidance
 * (`.../02-guides/authentication.md#optimistic-checks-with-proxy-optional`):
 * Proxy runs on every request, including prefetches, so it must stay cheap —
 * it only looks at cookie presence, never calls the backend. The real check
 * (is the session actually valid? has onboarding been completed?) happens in
 * `app/(zhamo)/layout.tsx` via `entities/session`'s `requireUser()`, which is
 * allowed to be slower since it only runs for requests that get this far.
 *
 * Forwards the resolved pathname as a request header because Server
 * Component layouts have no other way to read the current path — this is
 * the pattern the framework's own authentication guide uses for the same
 * reason (see that guide's "Auth and streaming" section).
 */
const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up", "/table-demo"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/customer");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const response = () =>
    NextResponse.next({ request: { headers: requestHeaders } });

  if (isPublicPath(pathname)) {
    return response();
  }

  const hasSession = request.cookies.has(ACCESS_TOKEN_COOKIE);
  if (!hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return response();
}

export const config = {
  // Skip static assets and the /api/* proxy routes — those return JSON on
  // their own 401s and must never be redirected to an HTML sign-in page.
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
