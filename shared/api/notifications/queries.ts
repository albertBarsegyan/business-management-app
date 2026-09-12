"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  CreateInAppNotificationRequest,
  CreateNotificationRuleRequest,
  CreateNotificationTemplateRequest,
  CreateNotificationTemplateVersionRequest,
  InAppNotification,
  NotificationRule,
  NotificationTemplate,
  NotificationTemplateVersion,
  UpdateNotificationRuleRequest,
} from "./types";

export const notificationKeys = {
  rules: ["notification-rules"] as const,
  templates: ["notification-templates"] as const,
  templateVersions: (templateId: string) =>
    ["notification-templates", templateId, "versions"] as const,
  inApp: ["in-app-notifications"] as const,
};

export function useNotificationRulesQuery() {
  return useQuery({
    queryKey: notificationKeys.rules,
    queryFn: () =>
      unwrap<NotificationRule[]>(apiClient.get("notification-rules")),
  });
}

export function useCreateNotificationRuleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateNotificationRuleRequest) =>
      unwrap<NotificationRule>(
        apiClient.post("notification-rules", { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.rules });
    },
  });
}

export function useUpdateNotificationRuleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      ruleId,
      body,
    }: {
      ruleId: string;
      body: UpdateNotificationRuleRequest;
    }) =>
      unwrap<NotificationRule>(
        apiClient.patch(`notification-rules/${ruleId}`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.rules });
    },
  });
}

export function useNotificationTemplatesQuery() {
  return useQuery({
    queryKey: notificationKeys.templates,
    queryFn: () =>
      unwrap<NotificationTemplate[]>(apiClient.get("notification-templates")),
  });
}

export function useCreateNotificationTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateNotificationTemplateRequest) =>
      unwrap<NotificationTemplate>(
        apiClient.post("notification-templates", { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.templates });
    },
  });
}

export function useNotificationTemplateVersionsQuery(templateId: string) {
  return useQuery({
    queryKey: notificationKeys.templateVersions(templateId),
    queryFn: () =>
      unwrap<NotificationTemplateVersion[]>(
        apiClient.get(`notification-templates/${templateId}/versions`),
      ),
  });
}

export function useCreateNotificationTemplateVersionMutation(
  templateId: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateNotificationTemplateVersionRequest) =>
      unwrap<NotificationTemplateVersion>(
        apiClient.post(`notification-templates/${templateId}/versions`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.templateVersions(templateId),
      });
      queryClient.invalidateQueries({ queryKey: notificationKeys.templates });
    },
  });
}

/** GET /in-app-notifications — the current user's own notifications (JWT only, no venue-wide list). */
export function useInAppNotificationsQuery() {
  return useQuery({
    queryKey: notificationKeys.inApp,
    queryFn: () =>
      unwrap<InAppNotification[]>(apiClient.get("in-app-notifications")),
  });
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      unwrap<InAppNotification>(
        apiClient.patch(`in-app-notifications/${notificationId}/read`),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.inApp });
    },
  });
}

/** notifications.manage only — for a staff member to notify another (e.g. a manager pinging a teammate). */
export function useCreateInAppNotificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateInAppNotificationRequest) =>
      unwrap<InAppNotification>(
        apiClient.post("in-app-notifications", { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.inApp });
    },
  });
}
