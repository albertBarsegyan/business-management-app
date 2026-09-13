"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type { InviteMembershipRequest, Membership } from "./types";

export const membershipKeys = {
  all: ["venues", "memberships"] as const,
};

export function useMembershipsQuery() {
  return useQuery({
    queryKey: membershipKeys.all,
    queryFn: () => unwrap<Membership[]>(apiClient.get("venues/memberships")),
  });
}

export function useInviteMembershipMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: InviteMembershipRequest) =>
      unwrap<Membership>(apiClient.post("venues/memberships", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: membershipKeys.all });
    },
  });
}
