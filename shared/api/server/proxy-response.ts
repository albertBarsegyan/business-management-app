import "server-only";
import { NextResponse } from "next/server";
import type { Options } from "ky";
import { backendClient } from "./backend-client";
import { BackendAuthError, authenticatedBackendFetch } from "./backend-fetch";

/**
 * Calls the backend via authenticatedBackendFetch and forwards its JSON
 * body and status straight through to the Next.js response, translating a
 * missing/expired session into a 401. Shared by every authenticated
 * proxy route (GET /api/clients, /api/clients/:id/contacts, etc.).
 */
export async function proxyAuthenticated(url: string, options: Options = {}) {
  try {
    const backendResponse = await authenticatedBackendFetch(url, options);
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
  const body = await backendResponse.json().catch(() => null);
  return NextResponse.json(body, { status: backendResponse.status });
}
