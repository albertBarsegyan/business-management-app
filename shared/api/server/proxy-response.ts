import "server-only";
import { NextResponse } from "next/server";
import type { Options } from "ky";
import { backendClient } from "./backend-client";
import { BackendAuthError, authenticatedBackendFetch } from "./backend-fetch";

/**
 * The Fetch API's `Response` constructor throws if a 204/205/304 status is
 * given a body — even `NextResponse.json(null, { status: 204 })` counts,
 * since it still serializes to the 4-byte string "null". Every no-content
 * DELETE (e.g. `DELETE /site/pages/:id`) needs this, not just the body-less
 * ones that happened to get curl-tested before.
 */
const NO_BODY_STATUSES = new Set([204, 205, 304]);

/**
 * Calls the backend via authenticatedBackendFetch and forwards its JSON
 * body and status straight through to the Next.js response, translating a
 * missing/expired session into a 401. Shared by every authenticated
 * proxy route (GET /api/clients, /api/clients/:id/contacts, etc.).
 */
export async function proxyAuthenticated(url: string, options: Options = {}) {
  try {
    const backendResponse = await authenticatedBackendFetch(url, options);
    if (NO_BODY_STATUSES.has(backendResponse.status)) {
      return new NextResponse(null, { status: backendResponse.status });
    }
    const body = await backendResponse.json().catch(() => null);
    return NextResponse.json(body, { status: backendResponse.status });
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    throw error;
  }
}

/**
 * Sibling to proxyAuthenticated for the /public/bookings/me/* routes, which
 * a no-account customer reaches with a booking access token (not a staff
 * cookie session). Forwards the caller-supplied token straight through as
 * x-booking-access-token — no cookie auth, no refresh, since there is no
 * refresh concept for a token-authenticated customer request.
 */
export async function proxyPublic(
  url: string,
  accessToken: string,
  options: Options = {},
) {
  const backendResponse = await backendClient(url, {
    ...options,
    headers: { ...options.headers, "x-booking-access-token": accessToken },
  });
  if (NO_BODY_STATUSES.has(backendResponse.status)) {
    return new NextResponse(null, { status: backendResponse.status });
  }
  const body = await backendResponse.json().catch(() => null);
  return NextResponse.json(body, { status: backendResponse.status });
}
