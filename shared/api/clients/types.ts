/**
 * Hand-written types for the clients endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3).
 */

export type ClientStatus = "active" | "blocked_online" | "archived" | "merged";
export type ClientImportance = "regular" | "vip";
export type ClientContactType = "phone" | "email";
export type ClientNoteVisibility = "all_staff" | "managers" | "author_only";

export interface Client {
  id: string;
  displayName: string;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  pronouns: string | null;
  status: ClientStatus;
  importance: ClientImportance;
  onlineBookingDisabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientContact {
  id: string;
  clientId: string;
  type: ClientContactType;
  valueDisplay: string;
  valueNormalized: string;
  isPrimary: boolean;
}

export interface ClientNote {
  id: string;
  clientId: string;
  authorTeamMemberId: string | null;
  body: string;
  visibility: ClientNoteVisibility;
  pinnedAt: string | null;
  createdAt: string;
}

export interface CreateClientRequest {
  displayName: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  importance?: ClientImportance;
  onlineBookingDisabled?: boolean;
}

export interface CreateClientContactRequest {
  type: ClientContactType;
  valueDisplay: string;
  valueNormalized: string;
  isPrimary?: boolean;
}

export interface CreateClientNoteRequest {
  body: string;
}

export interface UpdateClientRequest {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: string;
  pronouns?: string;
  status?: ClientStatus;
  importance?: ClientImportance;
  onlineBookingDisabled?: boolean;
}

export interface ClientAddress {
  id: string;
  clientId: string;
  label: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string | null;
  region: string | null;
  postalCode: string | null;
  countryCode: string | null;
  isPrimary: boolean;
}

export interface CreateClientAddressRequest {
  label: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  countryCode?: string;
  isPrimary?: boolean;
}

export type ClientConsentStatus = "granted" | "denied" | "withdrawn";

export interface ClientConsent {
  id: string;
  clientId: string;
  purpose: string;
  status: ClientConsentStatus;
  policyVersion: number;
  capturedVia: string;
  capturedAt: string;
}

export interface CreateClientConsentRequest {
  purpose: string;
  status: ClientConsentStatus;
  policyVersion: number;
  capturedVia: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string | null;
}

export interface CreateTagRequest {
  name: string;
  color?: string;
}

export interface AssignClientTagRequest {
  tagId: string;
}
