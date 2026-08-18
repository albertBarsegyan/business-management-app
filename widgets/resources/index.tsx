"use client";

import { DataTable, PageHeader, PageHeaderButton, PageShell, Pill } from "@/widgets/day-calendar";
import { resources, type ResourceRow } from "./model/data";

const statusStyle: Record<ResourceRow["status"], { bg: string; color: string }> = {
  Available: { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
  "In use": { bg: "rgba(44,108,246,0.12)", color: "#2C6CF6" },
  Maintenance: { bg: "rgba(214,69,69,0.12)", color: "#D64545" },
};

export function ResourcesScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Resources"
        subtitle="Manage rooms, equipment, and other bookable resources."
        action={<PageHeaderButton>Add resource</PageHeaderButton>}
      />

      <DataTable<ResourceRow>
        rowKey={(row) => row.name}
        columns={[
          { label: "Resource", render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>, width: "1.4fr" },
          { label: "Type", render: (row) => row.type, width: "1fr" },
          { label: "Assigned to", render: (row) => <span style={{ color: "#5B6069" }}>{row.assignedTo}</span>, width: "1.4fr" },
          {
            label: "Status",
            render: (row) => (
              <Pill bg={statusStyle[row.status].bg} color={statusStyle[row.status].color}>
                {row.status}
              </Pill>
            ),
            width: "0.9fr",
          },
        ]}
        rows={resources}
      />
    </PageShell>
  );
}
