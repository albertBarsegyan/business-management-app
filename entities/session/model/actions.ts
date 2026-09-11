"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { backendClient } from "@/shared/api/server/backend-client";
import {
  ACCESS_TOKEN_COOKIE,
  clearAuthCookies,
} from "@/shared/api/server/cookies";

/**
 * Best-effort: even if the backend call fails (token already expired,
 * network blip), local cookies are cleared and the user is signed out from
 * this app's point of view regardless — matching `app/api/auth/logout/route.ts`'s
 * existing behavior for the same endpoint.
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    await backendClient
      .post("auth/logout", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch(() => undefined);
  }

  clearAuthCookies(cookieStore);
  redirect("/sign-in");
}
