import "server-only";
import { cache } from "react";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import { unwrapBackendResponse } from "@/shared/api/server/errors";
import type { components } from "@/shared/api/generated/schema";

export type LocationDetails = components["schemas"]["LocationResponseDto"];

/** GET /locations — memoized per request; see `entities/venue`'s `getVenue` for why `refreshOnExpiry: false`. */
export const getLocations = cache(async (): Promise<LocationDetails[]> => {
  const response = await authenticatedBackendFetch(
    "locations",
    {},
    { refreshOnExpiry: false },
  );
  return unwrapBackendResponse<LocationDetails[]>(response);
});
