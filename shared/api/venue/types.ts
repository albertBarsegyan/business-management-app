/**
 * Hand-written types for the venues endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3).
 */

export type VerticalCode =
  | "beauty"
  | "healthcare_admin"
  | "fitness"
  | "education"
  | "consumer_services"
  | "automotive"
  | "other";

export interface Venue {
  id: string;
  name: string;
  slug: string;
  verticalCode: string;
  countryCode: string;
  baseCurrencyCode: string;
  defaultTimezone: string;
  defaultLocale: string;
  status: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  currencyCode: string;
  isPrimary: boolean;
  status: string;
}

export interface CompleteOnboardingRequest {
  venue: {
    name: string;
    slug: string;
    verticalCode: VerticalCode;
    countryCode: string;
    baseCurrencyCode: string;
    defaultTimezone: string;
    defaultLocale: string;
  };
  primaryLocation: {
    name: string;
    timezone?: string;
    currencyCode?: string;
  };
}

export interface CompleteOnboardingResponse {
  venue: Venue;
  location: VenueLocation;
  membershipId: string;
}
