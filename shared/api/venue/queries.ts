"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  Venue,
} from "./types";

export const venueKeys = {
  me: ["venue", "me"] as const,
};

export function useVenueQuery() {
  return useQuery({
    queryKey: venueKeys.me,
    queryFn: () => unwrap<Venue>(apiClient.get("venue/me")),
  });
}

export function useCompleteOnboardingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CompleteOnboardingRequest) =>
      unwrap<CompleteOnboardingResponse>(
        apiClient.post("venue/onboarding", { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: venueKeys.me });
    },
  });
}
