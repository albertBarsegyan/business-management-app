"use client";

import { DataTable, PageHeader, PageShell, StatGrid } from "@/widgets/day-calendar";
import { revenueByWeek, reportStats, topServices, type ServiceRow, type WeekRow } from "./model/data";

export function ReportsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle="Track revenue, appointments, and team performance over time."
      />

      <StatGrid stats={reportStats} />

      <DataTable<WeekRow>
        caption="Revenue by week"
        rowKey={(row) => row.week}
        columns={[
          { label: "Week", render: (row) => row.week },
          { label: "Appointments", render: (row) => row.appointments, align: "right", width: "0.8fr" },
          { label: "Revenue", render: (row) => row.revenue, align: "right", width: "0.9fr" },
          { label: "Avg. ticket", render: (row) => row.avgTicket, align: "right", width: "0.8fr" },
        ]}
        rows={revenueByWeek}
      />

      <DataTable<ServiceRow>
        caption="Top services"
        rowKey={(row) => row.service}
        columns={[
          { label: "Service", render: (row) => row.service },
          { label: "Bookings", render: (row) => row.bookings, align: "right", width: "0.7fr" },
          { label: "Revenue", render: (row) => row.revenue, align: "right", width: "0.9fr" },
          { label: "Share", render: (row) => row.share, align: "right", width: "0.6fr" },
        ]}
        rows={topServices}
      />
    </PageShell>
  );
}
