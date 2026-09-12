/**
 * Hand-written types for the team-members endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3). Migrating the existing hand-written interfaces below is a separate
 * cleanup; the two new sub-resources added in Phase 3a (location
 * assignments, availability exceptions) use the generated schema directly
 * rather than adding more hand-written duplicates.
 */
import type { components } from "@/shared/api/generated/schema";

export type TeamLocationAssignment =
  components["schemas"]["TeamLocationAssignmentResponseDto"];
export type AssignTeamLocationRequest =
  components["schemas"]["AssignTeamLocationDto"];
export type TeamAvailabilityException =
  components["schemas"]["TeamAvailabilityExceptionResponseDto"];
export type CreateTeamAvailabilityExceptionRequest =
  components["schemas"]["CreateTeamAvailabilityExceptionDto"];

export type EmploymentType = "employee" | "contractor" | "owner" | "other";
export type EmploymentStatus =
  "invited" | "active" | "leave" | "inactive" | "terminated";

export interface TeamMember {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phoneE164: string | null;
  email: string | null;
  positionTitle: string;
  bio: string | null;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  onlineBookable: boolean;
  publicProfileVisible: boolean;
  hireDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberRequest {
  firstName: string;
  lastName: string;
  displayName: string;
  positionTitle: string;
  phoneE164?: string;
  email?: string;
  bio?: string;
  employmentType?: EmploymentType;
  onlineBookable?: boolean;
}

export interface TeamWorkingHours {
  id: string;
  teamMemberId: string;
  locationId: string;
  weekday: number;
  startsAtLocal: string;
  endsAtLocal: string;
  validFrom: string | null;
  validUntil: string | null;
}

export interface CreateTeamWorkingHoursRequest {
  locationId: string;
  weekday: number;
  startsAtLocal: string;
  endsAtLocal: string;
  validFrom?: string;
  validUntil?: string;
}
