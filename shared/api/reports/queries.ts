"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  ReportsGroupBy,
  ReportsOverview,
  RevenuePeriod,
  TopService,
} from "./types";

export interface ReportsRange {
  from: string;
  to: string;
  [key: string]: string;
}

export const reportsKeys = {
  overview: (range: ReportsRange) =>
    ["reports", "overview", range.from, range.to] as const,
  revenue: (range: ReportsRange, groupBy: ReportsGroupBy) =>
    ["reports", "revenue", range.from, range.to, groupBy] as const,
  topServices: (range: ReportsRange, limit: number) =>
    ["reports", "top-services", range.from, range.to, limit] as const,
};

export function useReportsOverviewQuery(range: ReportsRange) {
  return useQuery({
    queryKey: reportsKeys.overview(range),
    queryFn: () =>
      unwrap<ReportsOverview>(
        apiClient.get("reports/overview", { searchParams: range }),
      ),
  });
}

export function useRevenueSeriesQuery(
  range: ReportsRange,
  groupBy: ReportsGroupBy,
) {
  return useQuery({
    queryKey: reportsKeys.revenue(range, groupBy),
    queryFn: () =>
      unwrap<RevenuePeriod[]>(
        apiClient.get("reports/revenue", {
          searchParams: { ...range, groupBy },
        }),
      ),
  });
}

export function useTopServicesQuery(range: ReportsRange, limit = 10) {
  return useQuery({
    queryKey: reportsKeys.topServices(range, limit),
    queryFn: () =>
      unwrap<TopService[]>(
        apiClient.get("reports/top-services", {
          searchParams: { ...range, limit },
        }),
      ),
  });
}
