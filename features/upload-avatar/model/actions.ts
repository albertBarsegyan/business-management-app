"use server";

import { revalidatePath } from "next/cache";
import type { components } from "@/shared/api/generated/schema";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import { ApiError, unwrapBackendResponse } from "@/shared/api/server/errors";

type MeResponseDto = components["schemas"]["MeResponseDto"];

export interface AvatarActionResult {
  error?: string;
}

export async function uploadAvatarAction(
  formData: FormData,
): Promise<AvatarActionResult | undefined> {
  try {
    const response = await authenticatedBackendFetch("auth/me/avatar", {
      method: "post",
      body: formData,
    });
    await unwrapBackendResponse<MeResponseDto>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    throw error;
  }

  // Re-renders the layout (and the SessionProvider it seeds) so the
  // sidebar picks up the new avatar without a full page reload.
  revalidatePath("/", "layout");
}

export async function removeAvatarAction(): Promise<
  AvatarActionResult | undefined
> {
  try {
    const response = await authenticatedBackendFetch("auth/me/avatar", {
      method: "delete",
    });
    await unwrapBackendResponse<void>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    throw error;
  }

  revalidatePath("/", "layout");
}
