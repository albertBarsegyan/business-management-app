/**
 * Hand-written types for the catalog endpoints (service categories,
 * services, service variants), standing in until the backend's OpenAPI spec
 * is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3).
 */

export type ServiceCategoryStatus = "active" | "archived";
export type ServiceDeliveryMode = "private" | "group" | "either";
export type ServicePricingDisplay = "fixed" | "from" | "varies" | "hidden";
export type ServiceStatus = "draft" | "active" | "archived";

export interface ServiceCategory {
  id: string;
  parentId: string | null;
  name: string;
  description: string | null;
  position: number;
  status: ServiceCategoryStatus;
}

export interface Service {
  id: string;
  categoryId: string | null;
  name: string;
  slug: string;
  description: string | null;
  deliveryMode: ServiceDeliveryMode;
  pricingDisplay: ServicePricingDisplay;
  onlineBookable: boolean;
  requiresStaff: boolean;
  status: ServiceStatus;
  createdAt: string;
}

export interface ServiceVariant {
  id: string;
  serviceId: string;
  name: string | null;
  durationMinutes: number;
  priceMinor: string;
  currencyCode: string;
  status: ServiceStatus;
}

export interface CreateServiceCategoryRequest {
  name: string;
  parentId?: string;
  description?: string;
}

export interface CreateServiceRequest {
  name: string;
  slug: string;
  categoryId?: string;
  onlineBookable?: boolean;
  requiresStaff?: boolean;
}

export interface CreateServiceVariantRequest {
  durationMinutes: number;
  priceMinor: string;
  currencyCode: string;
}

export interface UpdateServiceStatusRequest {
  status: ServiceStatus;
}

export interface TeamServiceAssignment {
  id: string;
  teamMemberId: string;
  serviceVariantId: string;
  enabled: boolean;
  onlineBookable: boolean;
  skillLevel: string | null;
  priceMinorOverride: string | null;
  durationMinutesOverride: number | null;
  commissionRuleId: string | null;
}

export interface UpsertTeamServiceAssignmentRequest {
  enabled?: boolean;
}

export type StaffOccupancy = "required" | "optional" | "none";

export interface ServiceStep {
  id: string;
  serviceVariantId: string;
  position: number;
  name: string;
  durationMinutes: number;
  staffOccupancy: StaffOccupancy;
}

export interface CreateServiceStepRequest {
  name: string;
  durationMinutes: number;
  staffOccupancy?: StaffOccupancy;
  position?: number;
}

export interface ServiceLocationSetting {
  id: string;
  serviceVariantId: string;
  locationId: string;
  enabled: boolean;
  onlineBookable: boolean;
  priceMinorOverride: string | null;
  currencyCodeOverride: string | null;
  durationMinutesOverride: number | null;
}

export interface UpsertServiceLocationSettingRequest {
  enabled?: boolean;
  onlineBookable?: boolean;
}
