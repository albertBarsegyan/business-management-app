/**
 * Hand-written types for the locations endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3). Only the fields currently consumed (a location picker for team
 * working hours) are included.
 */

export interface Location {
  id: string;
  name: string;
  timezone: string;
  isPrimary: boolean;
}
