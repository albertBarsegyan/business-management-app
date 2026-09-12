/**
 * Hand-written types for the audit-logs endpoint, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3). Mirrors AuditLogResponseDto in the backend
 * (src/modules/platform/dto/audit-log-response.dto.ts).
 */

export type AuditActorType =
  "membership" | "client_token" | "system" | "integration";

export interface AuditLog {
  id: string;
  createdAt: string;
  venueId: string;
  occurredAt: string;
  actorType: AuditActorType;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  beforeJson: Record<string, unknown> | null;
  afterJson: Record<string, unknown> | null;
  reason: string | null;
  correlationId: string;
  ipHash: string | null;
  userAgentSummary: string | null;
}
