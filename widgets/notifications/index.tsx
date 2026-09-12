"use client";

import { useState } from "react";
import { DataTable, PageHeader, PageShell } from "@/widgets/day-calendar";
import type { DataTableColumn } from "@/widgets/day-calendar";
import {
  useCreateNotificationRuleMutation,
  useCreateNotificationTemplateMutation,
  useInAppNotificationsQuery,
  useMarkNotificationReadMutation,
  useNotificationRulesQuery,
  useNotificationTemplatesQuery,
  useUpdateNotificationRuleMutation,
} from "@/shared/api/notifications/queries";
import type {
  InAppNotification,
  NotificationChannel,
  NotificationRule,
  NotificationTemplate,
} from "@/shared/api/notifications/types";
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_LOCALE,
  clientNotificationRows,
  teamNotificationRows,
  type NotificationRuleRow,
} from "./model/data";

function Toggle({
  on,
  disabled,
  onClick,
}: {
  on: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <span
      role="switch"
      aria-checked={on}
      onClick={disabled ? undefined : onClick}
      style={{
        width: 34,
        height: 20,
        borderRadius: 10,
        background: on ? "#16161A" : "#E1E4E8",
        position: "relative",
        display: "inline-block",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 0.15s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 16 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#FFFFFF",
          transition: "left 0.15s ease",
        }}
      />
    </span>
  );
}

function cellKey(row: NotificationRuleRow, channel: NotificationChannel) {
  return `${row.eventKey}:${channel}`;
}

function findRule(
  rules: NotificationRule[],
  row: NotificationRuleRow,
  channel: NotificationChannel,
) {
  return rules.find(
    (rule) =>
      rule.eventKey === row.eventKey &&
      rule.channel === channel &&
      rule.audience === row.audience,
  );
}

function findTemplate(
  templates: NotificationTemplate[],
  row: NotificationRuleRow,
  channel: NotificationChannel,
) {
  return templates.find(
    (template) =>
      template.eventKey === row.eventKey &&
      template.channel === channel &&
      template.locale === NOTIFICATION_LOCALE,
  );
}

function NotificationMatrix({
  caption,
  rows,
  rules,
  pendingCell,
  onToggle,
}: {
  caption: string;
  rows: NotificationRuleRow[];
  rules: NotificationRule[];
  pendingCell: string | null;
  onToggle: (row: NotificationRuleRow, channel: NotificationChannel) => void;
}) {
  const columns: DataTableColumn<NotificationRuleRow>[] = [
    {
      label: "Notification",
      render: (row) => (
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontWeight: 600 }}>{row.label}</span>
          <span style={{ fontSize: 12, color: "#8A9099" }}>
            {row.description}
          </span>
        </span>
      ),
      width: "2.2fr",
    },
    ...NOTIFICATION_CHANNELS.map(({ channel, label }) => ({
      label,
      width: "0.6fr",
      render: (row: NotificationRuleRow) => {
        const rule = findRule(rules, row, channel);
        return (
          <Toggle
            on={rule?.enabled ?? false}
            disabled={pendingCell === cellKey(row, channel)}
            onClick={() => onToggle(row, channel)}
          />
        );
      },
    })),
  ];

  return (
    <DataTable<NotificationRuleRow>
      caption={caption}
      rowKey={(row) => row.eventKey}
      columns={columns}
      rows={rows}
    />
  );
}

function InboxSection() {
  const inboxQuery = useInAppNotificationsQuery();
  const markRead = useMarkNotificationReadMutation();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const handleMarkRead = async (notification: InAppNotification) => {
    setPendingId(notification.id);
    try {
      await markRead.mutateAsync(notification.id);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        border: "1px solid #E1E4E8",
        borderRadius: 8,
        padding: 14,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Inbox</h2>

      {inboxQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Loading notifications…
        </p>
      ) : inboxQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {inboxQuery.error.message}
        </p>
      ) : inboxQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          You have no notifications.
        </p>
      ) : (
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {inboxQuery.data.map((notification) => (
            <li
              key={notification.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                padding: "8px 0",
                borderTop: "1px solid #F0F1F3",
              }}
            >
              <span
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: notification.readAt ? 400 : 600,
                  }}
                >
                  {notification.title}
                </span>
                <span style={{ fontSize: 12, color: "#8A9099" }}>
                  {notification.body}
                </span>
              </span>
              {!notification.readAt && (
                <button
                  type="button"
                  disabled={pendingId === notification.id}
                  onClick={() => handleMarkRead(notification)}
                  style={{
                    flex: "0 0 auto",
                    border: "1px solid #E1E4E8",
                    borderRadius: 6,
                    background: "#FFFFFF",
                    padding: "4px 8px",
                    fontSize: 11.5,
                    cursor: "pointer",
                    opacity: pendingId === notification.id ? 0.5 : 1,
                  }}
                >
                  Mark read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function NotificationsScreen() {
  const rulesQuery = useNotificationRulesQuery();
  const templatesQuery = useNotificationTemplatesQuery();
  const updateRule = useUpdateNotificationRuleMutation();
  const createRule = useCreateNotificationRuleMutation();
  const createTemplate = useCreateNotificationTemplateMutation();
  const [pendingCell, setPendingCell] = useState<string | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);

  const handleToggle = async (
    row: NotificationRuleRow,
    channel: NotificationChannel,
  ) => {
    if (!rulesQuery.data || !templatesQuery.data) return;
    setPendingCell(cellKey(row, channel));
    setToggleError(null);
    try {
      const existingRule = findRule(rulesQuery.data, row, channel);
      if (existingRule) {
        await updateRule.mutateAsync({
          ruleId: existingRule.id,
          body: { enabled: !existingRule.enabled },
        });
        return;
      }

      let template = findTemplate(templatesQuery.data, row, channel);
      if (!template) {
        template = await createTemplate.mutateAsync({
          eventKey: row.eventKey,
          channel,
          locale: NOTIFICATION_LOCALE,
        });
      }
      await createRule.mutateAsync({
        eventKey: row.eventKey,
        channel,
        templateId: template.id,
        audience: row.audience,
        enabled: true,
      });
    } catch (error) {
      setToggleError(
        error instanceof Error
          ? error.message
          : "Couldn't update this notification.",
      );
    } finally {
      setPendingCell(null);
    }
  };

  return (
    <PageShell>
      <PageHeader
        title="Notifications"
        subtitle="Configure reminders and alerts sent to your team and clients."
      />

      <InboxSection />

      {toggleError && (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {toggleError}
        </p>
      )}

      {rulesQuery.isPending || templatesQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Loading notifications…
        </p>
      ) : rulesQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {rulesQuery.error.message}
        </p>
      ) : templatesQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {templatesQuery.error.message}
        </p>
      ) : (
        <>
          <NotificationMatrix
            caption="Client notifications"
            rows={clientNotificationRows}
            rules={rulesQuery.data}
            pendingCell={pendingCell}
            onToggle={handleToggle}
          />
          <NotificationMatrix
            caption="Team notifications"
            rows={teamNotificationRows}
            rules={rulesQuery.data}
            pendingCell={pendingCell}
            onToggle={handleToggle}
          />
        </>
      )}
    </PageShell>
  );
}
