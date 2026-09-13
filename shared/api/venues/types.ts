/**
 * Hand-written types for the venue-memberships endpoints, standing in
 * until the backend's OpenAPI spec is exported and openapi-typescript
 * generates shared/api/generated/schema.d.ts for this domain (see
 * business-management-infra CLAUDE.md §3). Mirrors the backend's
 * MembershipResponseDto (src/modules/venues/dto/membership-response.dto.ts).
 */

export type MembershipStatus = "invited" | "active" | "suspended" | "revoked";

export interface MembershipRole {
  code: string;
  name: string;
}

export interface Membership {
  id: string;
  createdAt: string;
  userId: string;
  displayName: string;
  email: string | null;
  avatarAssetId: string | null;
  status: MembershipStatus;
  joinedAt: string | null;
  roles: MembershipRole[];
}

/** Every seed role except `owner` — there is exactly one owner per venue,
 * created at onboarding, never through an invite. Mirrors the backend's
 * InviteMembershipDto (derived there from seed-roles.constant.ts). */
export const INVITABLE_ROLES: { code: string; name: string }[] = [
  { code: "manager", name: "Manager" },
  { code: "receptionist", name: "Receptionist" },
  { code: "professional", name: "Professional" },
  { code: "marketer", name: "Marketer" },
  { code: "accountant", name: "Accountant" },
];

export interface InviteMembershipRequest {
  email: string;
  roleCode: string;
}
