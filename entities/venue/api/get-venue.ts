import "server-only";
import { cache } from "react";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import { unwrapBackendResponse } from "@/shared/api/server/errors";
import type { components } from "@/shared/api/generated/schema";

export type VenueDetails = components["schemas"]["VenueResponseDto"];

/**
 * GET /venues/me — memoized per request like `entities/session`'s
 * `getCurrentUser`. `refreshOnExpiry: false` for the same reason as there:
 * this runs from Server Components, which can't persist a cookie mutation.
 */
export const getVenue = cache(async (): Promise<VenueDetails> => {
  const response = await authenticatedBackendFetch(
    "venues/me",
    {},
    { refreshOnExpiry: false },
  );
  return unwrapBackendResponse<VenueDetails>(response);
});
