import "server-only";
import { cookies } from "next/headers";
import type { Options } from "ky";
import { backendClient } from "./backend-client";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  clearAuthCookies,
  setAuthCookies,
} from "./cookies";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class BackendAuthError extends Error {}

/**
 * Refresh calls in flight, keyed by the refresh-token value itself. Several
 * requests can land on the server at once, each with the same now-expired
 * access token; without this, each would race to exchange the same
 * refresh-token cookie value, and the backend's rotate-on-refresh /
 * reuse-detection (`AuthService.refresh`) would treat the second exchange as
 * a stolen-token replay and revoke the whole session (docs/integration
 * rules.md D1's "single-flight de-duplication"). Keying by the token value
 * (not e.g. a global lock) keeps unrelated sessions on the same server
 * process from blocking on each other.
 */
const inFlightRefreshes = new Map<string, Promise<TokenPair>>();

async function refreshTokens(refreshToken: string): Promise<TokenPair> {
  const existing = inFlightRefreshes.get(refreshToken);
  if (existing) {
    return existing;
  }

  const promise = (async () => {
    const refreshResponse = await backendClient.post("auth/refresh", {
      json: { refreshToken },
    });
    if (!refreshResponse.ok) {
      throw new BackendAuthError("Session expired");
    }
    return refreshResponse.json<TokenPair>();
  })();

  inFlightRefreshes.set(refreshToken, promise);
  try {
    return await promise;
  } finally {
    inFlightRefreshes.delete(refreshToken);
  }
}

/**
 * Calls the backend with the current access-token cookie attached. On a 401
 * it transparently exchanges the refresh-token cookie for a new pair via
 * POST /auth/refresh (single-flight per session, see `refreshTokens`),
 * re-sets both cookies, and retries once.
 *
 * Next.js only allows cookies to be *written* from a Server Action or Route
 * Handler — calling `cookies().set()`/`.delete()` during a Server Component
 * render throws. Every authenticated proxy route and Server Action should
 * call this with the default `refreshOnExpiry: true`. `entities/session`'s
 * `getCurrentUser()` — called from Server Components like
 * `app/(zhamo)/layout.tsx` — passes `refreshOnExpiry: false`: on a 401 it
 * reports "not authenticated" immediately rather than attempting a refresh
 * it has no legal way to persist. This trades a slightly less seamless
 * session (a page navigation right as the ~15min access token expires bounces
 * to sign-in instead of silently refreshing) for correctness — attempting
 * the mutation here would either crash, or worse, rotate the refresh token
 * server-side while failing to persist the new one, orphaning the session.
 */
export async function authenticatedBackendFetch(
  url: string,
  options: Options = {},
  { refreshOnExpiry = true }: { refreshOnExpiry?: boolean } = {},
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!accessToken) {
    throw new BackendAuthError("Not authenticated");
  }

  const withAuth = (token: string): Options => ({
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${token}` },
  });

  const response = await backendClient(url, withAuth(accessToken));
  if (response.status !== 401) {
    return response;
  }
  if (!refreshOnExpiry) {
    throw new BackendAuthError("Session expired");
  }

  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) {
    clearAuthCookies(cookieStore);
    throw new BackendAuthError("Session expired");
  }

  let tokens: TokenPair;
  try {
    tokens = await refreshTokens(refreshToken);
  } catch (error) {
    clearAuthCookies(cookieStore);
    if (error instanceof BackendAuthError) {
      throw error;
    }
    throw new BackendAuthError("Session expired");
  }

  setAuthCookies(cookieStore, tokens);

  return backendClient(url, withAuth(tokens.accessToken));
}
