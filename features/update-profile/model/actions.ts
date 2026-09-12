"use server";

import { revalidatePath } from "next/cache";
import type { components } from "@/shared/api/generated/schema";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import {
  ApiError,
  splitValidationErrors,
  unwrapBackendResponse,
} from "@/shared/api/server/errors";
import { flattenZodFieldErrors } from "@/shared/lib/flatten-zod-errors";
import { updateProfileSchema, type UpdateProfileValues } from "./schema";

type MeResponseDto = components["schemas"]["MeResponseDto"];

export interface UpdateProfileActionResult {
  fieldErrors?: Partial<Record<keyof UpdateProfileValues, string>>;
  formError?: string;
}

export async function updateProfileAction(
  values: UpdateProfileValues,
): Promise<UpdateProfileActionResult | undefined> {
  const parsed = updateProfileSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: flattenZodFieldErrors(parsed.error) };
  }

  try {
    const response = await authenticatedBackendFetch("auth/me", {
      method: "patch",
      json: parsed.data,
    });
    await unwrapBackendResponse<MeResponseDto>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return splitValidationErrors(error, ["displayName", "primaryPhoneE164"]);
    }
    throw error;
  }

  // Re-renders the layout (and the SessionProvider it seeds) with the
  // updated name, so the sidebar reflects it without a full page reload.
  revalidatePath("/", "layout");
}
