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
import { signUpSchema, type SignUpValues } from "./schema";

type AuthTokensResponseDto = components["schemas"]["AuthTokensResponseDto"];

export interface SignUpActionResult {
  fieldErrors?: Partial<Record<keyof SignUpValues, string>>;
  formError?: string;
}

/** See `features/sign-in/model/actions.ts` for the calling convention. */
export async function signUpAction(
  values: SignUpValues,
): Promise<SignUpActionResult | undefined> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: flattenZodFieldErrors(parsed.error) };
  }

  // businessName is UX-only — see the comment on signUpSchema. Business/
  // venue creation happens via the /setup wizard this redirects into.
  const { displayName, email, password } = parsed.data;

  let tokens: AuthTokensResponseDto;
  try {
    const response = await backendClient.post("auth/register", {
      json: { displayName, email, password },
    });
    tokens = await unwrapBackendResponse<AuthTokensResponseDto>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return splitValidationErrors(error, ["displayName", "email", "password"]);
    }
    throw error;
  }

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, tokens);
  redirect("/setup");
}
