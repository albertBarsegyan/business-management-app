"use client";

import { DataTable, PageHeader, PageHeaderButton, PageShell, Pill, StatGrid } from "@/widgets/day-calendar";
import { payroll, payrollStats, type PayrollRow } from "./model/data";

const statusStyle: Record<PayrollRow["status"], { bg: string; color: string }> = {
  Paid: { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
  Scheduled: { bg: "rgba(230,163,29,0.15)", color: "#B4780F" },
};

export function PayrollScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Payroll"
        subtitle="Manage staff pay, commissions, and payout schedules."
        action={<PageHeaderButton>Run payroll</PageHeaderButton>}
      />

      <StatGrid stats={payrollStats} />

      <DataTable<PayrollRow>
        caption="August 2026"
        rowKey={(row) => row.name}
        columns={[
          { label: "Team member", render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>, width: "1.5fr" },
          { label: "Role", render: (row) => row.role, width: "1.1fr" },
          { label: "Base", render: (row) => row.base, align: "right", width: "0.9fr" },
          { label: "Commission", render: (row) => row.commission, align: "right", width: "1fr" },
          { label: "Total", render: (row) => <span style={{ fontWeight: 600 }}>{row.total}</span>, align: "right", width: "0.9fr" },
          {
            label: "Status",
            render: (row) => (
              <Pill bg={statusStyle[row.status].bg} color={statusStyle[row.status].color}>
                {row.status}
              </Pill>
            ),
            width: "0.8fr",
          },
        ]}
        rows={payroll}
      />
    </PageShell>
  );
}
