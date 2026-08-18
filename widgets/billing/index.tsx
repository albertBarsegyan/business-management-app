"use client";

import { DataTable, PageHeader, PageShell, Pill } from "@/widgets/day-calendar";
import { currentPlan, invoices, paymentMethod, type InvoiceRow } from "./model/data";

export function BillingScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Billing"
        subtitle="Manage your subscription, invoices, and payment method."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A9099" }}>
            Current plan
          </span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700 }}>{currentPlan.name}</span>
            <span style={{ fontSize: 13, color: "#7C818B" }}>{currentPlan.price}</span>
          </div>
          <span style={{ fontSize: 12.5, color: "#7C818B" }}>Renews {currentPlan.renewsOn} · {currentPlan.seats}</span>
          <button
            style={{ alignSelf: "flex-start", height: 30, padding: "0 12px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
          >
            Change plan
          </button>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A9099" }}>
            Payment method
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 36, height: 24, borderRadius: 4, background: "#F1F2F4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#5B6069" }}>
              {paymentMethod.brand}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>•••• {paymentMethod.last4}</span>
          </div>
          <span style={{ fontSize: 12.5, color: "#7C818B" }}>Expires {paymentMethod.expires}</span>
          <button
            style={{ alignSelf: "flex-start", height: 30, padding: "0 12px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
          >
            Update card
          </button>
        </div>
      </div>

      <DataTable<InvoiceRow>
        caption="Invoice history"
        rowKey={(row) => row.invoiceNo}
        columns={[
          { label: "Invoice", render: (row) => <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#8A9099" }}>{row.invoiceNo}</span>, width: "1.2fr" },
          { label: "Date", render: (row) => row.date, width: "1fr" },
          { label: "Amount", render: (row) => row.amount, align: "right", width: "0.9fr" },
          {
            label: "Status",
            render: (row) =>
              row.status === "Paid" ? (
                <Pill bg="rgba(30,142,90,0.12)" color="#1E8E5A">Paid</Pill>
              ) : (
                <Pill bg="rgba(230,163,29,0.15)" color="#B4780F">Due</Pill>
              ),
            width: "0.8fr",
          },
        ]}
        rows={invoices}
      />
    </PageShell>
  );
}
