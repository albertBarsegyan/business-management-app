"use client";

import { DataTable, PageHeader, PageShell, Toggle } from "@/widgets/day-calendar";
import { clientNotifications, teamNotifications, type NotificationRow } from "./model/data";

const channelColumns = [
  {
    label: "Notification",
    render: (row: NotificationRow) => (
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontWeight: 600 }}>{row.label}</span>
        <span style={{ fontSize: 12, color: "#8A9099" }}>{row.description}</span>
      </span>
    ),
    width: "2.2fr",
  },
  { label: "SMS", render: (row: NotificationRow) => <Toggle on={row.sms} />, width: "0.6fr" },
  { label: "Email", render: (row: NotificationRow) => <Toggle on={row.email} />, width: "0.6fr" },
  { label: "Push", render: (row: NotificationRow) => <Toggle on={row.push} />, width: "0.6fr" },
];

export function NotificationsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Notifications"
        subtitle="Configure reminders and alerts sent to your team and clients."
      />

      <DataTable<NotificationRow>
        caption="Client notifications"
        rowKey={(row) => row.label}
        columns={channelColumns}
        rows={clientNotifications}
      />

      <DataTable<NotificationRow>
        caption="Team notifications"
        rowKey={(row) => row.label}
        columns={channelColumns}
        rows={teamNotifications}
      />
    </PageShell>
  );
}
