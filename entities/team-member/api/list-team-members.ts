import "server-only";
import { cache } from "react";
import { authenticatedBackendFetch } from "@/shared/api/server/backend-fetch";
import { unwrapBackendResponse } from "@/shared/api/server/errors";
import type { components } from "@/shared/api/generated/schema";

export type TeamMemberDetails = components["schemas"]["TeamMemberResponseDto"];
export type TeamWorkingHoursDetails =
  components["schemas"]["TeamWorkingHoursResponseDto"];

/** GET /team-members — memoized per request; see `entities/venue`'s `getVenue` for why `refreshOnExpiry: false`. */
export const listTeamMembers = cache(async (): Promise<TeamMemberDetails[]> => {
  const response = await authenticatedBackendFetch(
    "team-members",
    {},
    { refreshOnExpiry: false },
  );
  return unwrapBackendResponse<TeamMemberDetails[]>(response);
});

/** GET /team-members/:id/working-hours — memoized per (request, team member). */
export const getTeamMemberWorkingHours = cache(
  async (teamMemberId: string): Promise<TeamWorkingHoursDetails[]> => {
    const response = await authenticatedBackendFetch(
      `team-members/${teamMemberId}/working-hours`,
      {},
      { refreshOnExpiry: false },
    );
    return unwrapBackendResponse<TeamWorkingHoursDetails[]>(response);
  },
);
