/**
 * Hand-written types for the notifications endpoints, standing in until the
 * backend's OpenAPI spec is exported and openapi-typescript generates
 * shared/api/generated/schema.d.ts (see business-management-infra CLAUDE.md
 * §3).
 */

export type NotificationChannel = "sms" | "email" | "push" | "in_app";
export type NotificationAudience =
  "client" | "assigned_team" | "role" | "explicit";

export interface NotificationRule {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  locationId: string | null;
  eventKey: string;
  channel: NotificationChannel;
  enabled: boolean;
  offsetMinutes: number;
  templateId: string;
  audience: NotificationAudience;
  audienceRoleCode: string | null;
  conditionsJson: Record<string, unknown> | null;
}

export interface NotificationTemplate {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  eventKey: string;
  channel: NotificationChannel;
  locale: string;
  activeVersionId: string | null;
}

export interface NotificationTemplateVersion {
  id: string;
  createdAt: string;
  venueId: string;
  templateId: string;
  subject: string | null;
  body: string;
  schemaVersion: number;
  variablesSchema: Record<string, unknown>;
  createdByMembershipId: string | null;
}

export interface CreateNotificationRuleRequest {
  locationId?: string;
  eventKey: string;
  channel: NotificationChannel;
  enabled?: boolean;
  offsetMinutes?: number;
  templateId: string;
  audience: NotificationAudience;
  audienceRoleCode?: string;
  conditionsJson?: Record<string, unknown>;
}

export interface UpdateNotificationRuleRequest {
  enabled?: boolean;
  offsetMinutes?: number;
  conditionsJson?: Record<string, unknown>;
}

export interface CreateNotificationTemplateRequest {
  eventKey: string;
  channel: NotificationChannel;
  locale: string;
}

export interface CreateNotificationTemplateVersionRequest {
  subject?: string;
  body: string;
  variablesSchema?: Record<string, unknown>;
  setActive?: boolean;
}

export interface InAppNotification {
  id: string;
  membershipId: string;
  type: string;
  title: string;
  body: string;
  actionUrl: string | null;
  readAt: string | null;
  createdAt: string;
}

export interface CreateInAppNotificationRequest {
  membershipId: string;
  type: string;
  title: string;
  body: string;
  actionUrl?: string;
}
