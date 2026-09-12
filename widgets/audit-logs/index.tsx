"use client";

import { useAuditLogsQuery } from "@/shared/api/audit-logs/queries";
import type { AuditLog } from "@/shared/api/audit-logs/types";
import { DataTable, PageHeader, PageShell } from "@/widgets/day-calendar";
import type { DataTableColumn } from "@/widgets/day-calendar";

const columns: DataTableColumn<AuditLog>[] = [
  {
    label: "When",
    width: "1.1fr",
    render: (row) => new Date(row.occurredAt).toLocaleString(),
  },
  {
    label: "Action",
    render: (row) => <span style={{ fontWeight: 600 }}>{row.action}</span>,
  },
  {
    label: "Entity",
    render: (row) =>
      `${row.entityType}${row.entityId ? ` (${row.entityId.slice(0, 8)})` : ""}`,
  },
  {
    label: "Actor",
    render: (row) =>
      row.actorId
        ? `${row.actorType} ${row.actorId.slice(0, 8)}`
        : row.actorType,
  },
  {
    label: "Reason",
    render: (row) => row.reason ?? "—",
  },
];

export function AuditLogsScreen() {
  const auditLogsQuery = useAuditLogsQuery();

  return (
    <PageShell>
      <PageHeader
        title="Audit log"
        subtitle="A record of security- and business-relevant actions taken on your venue."
      />

      {auditLogsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Loading audit log…
        </p>
      ) : auditLogsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {auditLogsQuery.error.message}
        </p>
      ) : (
        <DataTable<AuditLog>
          caption="Recent activity"
          rowKey={(row) => row.id}
          columns={columns}
          rows={auditLogsQuery.data}
        />
      )}
    </PageShell>
  );
}
