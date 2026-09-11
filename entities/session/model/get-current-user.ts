import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import {
  authenticatedBackendFetch,
  BackendAuthError,
} from "@/shared/api/server/backend-fetch";
import { unwrapBackendResponse } from "@/shared/api/server/errors";
import type { components } from "@/shared/api/generated/schema";

export type SessionUser = components["schemas"]["MeResponseDto"];

/**
 * The Data Access Layer's session check (per the Next.js auth guide bundled
 * with the installed version — `node_modules/next/dist/docs/01-app/02-guides/authentication.md`).
 * Memoized per request with React `cache()` so calling it from a layout, a
 * page, and a leaf component in the same render only hits the backend once.
 * Returns `null` on "not authenticated" rather than redirecting — callers
 * that need a hard redirect should use `requireUser()` instead, so a page
 * that wants to render differently for signed-out visitors still can.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const response = await authenticatedBackendFetch(
      "auth/me",
      {},
      { refreshOnExpiry: false },
    );
    return await unwrapBackendResponse<SessionUser>(response);
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return null;
    }
    throw error;
  }
});

/** Use in Server Components/Actions/Route Handlers that require a session. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}

/** Permission check against the current session — never trusted client-side. */
export async function can(permission: string): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.permissions.includes(permission) ?? false;
}
