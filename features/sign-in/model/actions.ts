"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { components } from "@/shared/api/generated/schema";
import { backendClient } from "@/shared/api/server/backend-client";
import { setAuthCookies } from "@/shared/api/server/cookies";
import {
  ApiError,
  splitValidationErrors,
  unwrapBackendResponse,
} from "@/shared/api/server/errors";
import { flattenZodFieldErrors } from "@/shared/lib/flatten-zod-errors";
import { signInSchema, type SignInValues } from "./schema";

type AuthTokensResponseDto = components["schemas"]["AuthTokensResponseDto"];

export interface SignInActionResult {
  fieldErrors?: Partial<Record<keyof SignInValues, string>>;
  formError?: string;
}

/**
 * Server Action, called directly from the client form (not via a `<form
 * action>` prop, so react-hook-form still owns the submit lifecycle — see
 * `ui/sign-in-form.tsx`). Always executes server-side (D1), so this is
 * where credentials actually get checked, never in the browser.
 */
export async function signInAction(
  values: SignInValues,
): Promise<SignInActionResult | undefined> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: flattenZodFieldErrors(parsed.error) };
  }

  let tokens: AuthTokensResponseDto;
  try {
    const response = await backendClient.post("auth/login", {
      json: parsed.data,
    });
    tokens = await unwrapBackendResponse<AuthTokensResponseDto>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return splitValidationErrors(error, ["email", "password"]);
    }
    throw error;
  }

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, tokens);
  redirect("/reports");
}
