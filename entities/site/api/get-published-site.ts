import "server-only";
import { cache } from "react";
import { backendClient } from "@/shared/api/server/backend-client";
import { ApiError, unwrapBackendResponse } from "@/shared/api/server/errors";
import type { PublicSite } from "@/shared/api/site/types";

/**
 * `GET /public/sites/:slug` (Decision I.1) — unauthenticated, so this uses
 * the plain `backendClient` directly rather than `authenticatedBackendFetch`
 * (there is no session on a public site visit). Memoized per request like
 * every other `entities/*` read.
 */
export const getPublishedSite = cache(
  async (slug: string): Promise<PublicSite | null> => {
    try {
      const response = await backendClient.get(`public/sites/${slug}`);
      return await unwrapBackendResponse<PublicSite>(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },
);
