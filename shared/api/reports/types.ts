/**
 * Hand-written types for the reports endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts for this domain (see
 * business-management-infra CLAUDE.md §3). Mirrors the backend's response
 * DTOs (src/modules/reports/dto/*.ts).
 */

export interface ReportsOverview {
  from: string;
  to: string;
  currencyCode: string;
  revenueMinor: string;
  completedAppointmentsCount: number;
  newClientsCount: number;
  occupancyRate: number;
}

export interface RevenuePeriod {
  periodStart: string;
  revenueMinor: string;
}

export interface TopService {
  serviceName: string;
  bookingCount: number;
  revenueMinor: string;
}

export type ReportsGroupBy = "day" | "week" | "month";
