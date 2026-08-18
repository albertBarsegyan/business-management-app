"use client";

import { DataTable, PageHeader, PageShell, Pill, StatGrid } from "@/widgets/day-calendar";
import { financeStats, transactions, type TransactionRow } from "./model/data";

const statusStyle: Record<TransactionRow["status"], { bg: string; color: string }> = {
  Paid: { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
  Pending: { bg: "rgba(230,163,29,0.15)", color: "#B4780F" },
  Refunded: { bg: "#EEF0F2", color: "#8A9099" },
};

export function FinanceScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Finance"
        subtitle="Review payouts, expenses, and financial summaries for your business."
      />

      <StatGrid stats={financeStats} />

      <DataTable<TransactionRow>
        caption="Recent transactions"
        rowKey={(row) => `${row.date}-${row.client}-${row.amount}`}
        columns={[
          { label: "Date", render: (row) => row.date, width: "0.7fr" },
          { label: "Client", render: (row) => <span style={{ fontWeight: 600 }}>{row.client}</span>, width: "1.6fr" },
          { label: "Type", render: (row) => row.type, width: "1fr" },
          { label: "Amount", render: (row) => row.amount, align: "right", width: "0.9fr" },
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
        rows={transactions}
      />
    </PageShell>
  );
}
