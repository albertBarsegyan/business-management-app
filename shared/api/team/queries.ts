"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  AssignTeamLocationRequest,
  CreateTeamAvailabilityExceptionRequest,
  CreateTeamMemberRequest,
  CreateTeamWorkingHoursRequest,
  TeamAvailabilityException,
  TeamLocationAssignment,
  TeamMember,
  TeamWorkingHours,
} from "./types";

export const teamKeys = {
  all: ["team-members"] as const,
  workingHours: (teamMemberId: string) =>
    ["team-members", teamMemberId, "working-hours"] as const,
  locationAssignments: (teamMemberId: string) =>
    ["team-members", teamMemberId, "location-assignments"] as const,
  availabilityExceptions: (teamMemberId: string) =>
    ["team-members", teamMemberId, "availability-exceptions"] as const,
};

export function useTeamMembersQuery() {
  return useQuery({
    queryKey: teamKeys.all,
    queryFn: () => unwrap<TeamMember[]>(apiClient.get("team-members")),
  });
}

export function useCreateTeamMemberMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTeamMemberRequest) =>
      unwrap<TeamMember>(apiClient.post("team-members", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

export function useTeamWorkingHoursQuery(teamMemberId: string) {
  return useQuery({
    queryKey: teamKeys.workingHours(teamMemberId),
    queryFn: () =>
      unwrap<TeamWorkingHours[]>(
        apiClient.get(`team-members/${teamMemberId}/working-hours`),
      ),
  });
}

export function useCreateTeamWorkingHoursMutation(teamMemberId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTeamWorkingHoursRequest) =>
      unwrap<TeamWorkingHours>(
        apiClient.post(`team-members/${teamMemberId}/working-hours`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.workingHours(teamMemberId),
      });
    },
  });
}

export function useTeamLocationAssignmentsQuery(teamMemberId: string) {
  return useQuery({
    queryKey: teamKeys.locationAssignments(teamMemberId),
    queryFn: () =>
      unwrap<TeamLocationAssignment[]>(
        apiClient.get(`team-members/${teamMemberId}/location-assignments`),
      ),
  });
}

export function useAssignTeamLocationMutation(teamMemberId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AssignTeamLocationRequest) =>
      unwrap<TeamLocationAssignment>(
        apiClient.post(`team-members/${teamMemberId}/location-assignments`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.locationAssignments(teamMemberId),
      });
    },
  });
}

export function useTeamAvailabilityExceptionsQuery(teamMemberId: string) {
  return useQuery({
    queryKey: teamKeys.availabilityExceptions(teamMemberId),
    queryFn: () =>
      unwrap<TeamAvailabilityException[]>(
        apiClient.get(`team-members/${teamMemberId}/availability-exceptions`),
      ),
  });
}

export function useCreateTeamAvailabilityExceptionMutation(
  teamMemberId: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTeamAvailabilityExceptionRequest) =>
      unwrap<TeamAvailabilityException>(
        apiClient.post(`team-members/${teamMemberId}/availability-exceptions`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.availabilityExceptions(teamMemberId),
      });
    },
  });
}
