"use server";

import { cookies } from "next/headers";
import type { components } from "@/shared/api/generated/schema";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import { setAuthCookies } from "@/shared/api/server/cookies";
import {
  ApiError,
  splitValidationErrors,
  unwrapBackendResponse,
} from "@/shared/api/server/errors";
import { flattenZodFieldErrors } from "@/shared/lib/flatten-zod-errors";
import {
  changePasswordFormSchema,
  type ChangePasswordFormValues,
} from "./schema";

type TokenPairResponseDto = components["schemas"]["TokenPairResponseDto"];

export interface ChangePasswordActionResult {
  fieldErrors?: Partial<Record<keyof ChangePasswordFormValues, string>>;
  formError?: string;
}

/**
 * On success the backend rotates the refresh-token hash (revoking every
 * other session) and returns a fresh pair — set as this browser's new
 * cookies so changing your own password doesn't also sign you out.
 */
export async function changePasswordAction(
  values: ChangePasswordFormValues,
): Promise<ChangePasswordActionResult | undefined> {
  const parsed = changePasswordFormSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: flattenZodFieldErrors(parsed.error) };
  }

  let tokens: TokenPairResponseDto;
  try {
    const response = await authenticatedBackendFetch(
      "auth/me/change-password",
      {
        method: "post",
        json: {
          currentPassword: parsed.data.currentPassword,
          newPassword: parsed.data.newPassword,
        },
      },
    );
    tokens = await unwrapBackendResponse<TokenPairResponseDto>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return splitValidationErrors(error, ["currentPassword", "newPassword"]);
    }
    throw error;
  }

  const cookieStore = await cookies();
  setAuthCookies(cookieStore, tokens);
}
