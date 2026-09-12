"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type { AuditLog } from "./types";

export const auditLogKeys = {
  list: (limit: number) => ["audit-logs", limit] as const,
};

export function useAuditLogsQuery(limit = 100) {
  return useQuery({
    queryKey: auditLogKeys.list(limit),
    queryFn: () =>
      unwrap<AuditLog[]>(
        apiClient.get("audit-logs", { searchParams: { limit } }),
      ),
  });
}
