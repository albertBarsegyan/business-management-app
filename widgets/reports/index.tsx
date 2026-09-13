"use client";

import { useMemo, useState } from "react";
import type { ReportsGroupBy } from "@/shared/api/reports/types";
import type { RevenuePeriod, TopService } from "@/shared/api/reports/types";
import {
  useRevenueSeriesQuery,
  useReportsOverviewQuery,
  useTopServicesQuery,
} from "@/shared/api/reports/queries";
import {
  DataTable,
  PageHeader,
  PageShell,
  StatGrid,
} from "@/widgets/day-calendar";
import type { DataTableColumn, Stat } from "@/widgets/day-calendar";

type PresetKey = "7d" | "30d" | "90d";

const PRESETS: {
  key: PresetKey;
  label: string;
  days: number;
  groupBy: ReportsGroupBy;
}[] = [
  { key: "7d", label: "7 days", days: 7, groupBy: "day" },
  { key: "30d", label: "30 days", days: 30, groupBy: "week" },
  { key: "90d", label: "90 days", days: 90, groupBy: "month" },
];

function formatMoney(minor: string, currencyCode: string): string {
  const amount = Number(minor) / 100;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toFixed(0)} ${currencyCode}`;
  }
}

const revenueColumns: DataTableColumn<RevenuePeriod>[] = [
  {
    label: "Period",
    render: (row) => new Date(row.periodStart).toLocaleDateString(),
  },
  {
    label: "Revenue",
    align: "right",
    render: (row) => row.revenueMinor,
  },
];

const topServiceColumns: DataTableColumn<TopService>[] = [
  { label: "Service", render: (row) => row.serviceName },
  { label: "Bookings", align: "right", render: (row) => row.bookingCount },
  { label: "Revenue", align: "right", render: (row) => row.revenueMinor },
];

export function ReportsScreen() {
  const [preset, setPreset] = useState<PresetKey>("30d");
  const active = PRESETS.find((p) => p.key === preset) ?? PRESETS[1];

  const range = useMemo(() => {
    const to = new Date();
    const from = new Date(to.getTime() - active.days * 24 * 60 * 60 * 1000);
    return { from: from.toISOString(), to: to.toISOString() };
  }, [active.days]);

  const overviewQuery = useReportsOverviewQuery(range);
  const revenueQuery = useRevenueSeriesQuery(range, active.groupBy);
  const topServicesQuery = useTopServicesQuery(range);

  const isPending =
    overviewQuery.isPending ||
    revenueQuery.isPending ||
    topServicesQuery.isPending;
  const error =
    overviewQuery.error ?? revenueQuery.error ?? topServicesQuery.error;

  const currencyCode = overviewQuery.data?.currencyCode ?? "USD";
  const revenueRows = (revenueQuery.data ?? []).map((row) => ({
    ...row,
    revenueMinor: formatMoney(row.revenueMinor, currencyCode),
  }));
  const topServiceRows = (topServicesQuery.data ?? []).map((row) => ({
    ...row,
    revenueMinor: formatMoney(row.revenueMinor, currencyCode),
  }));

  const stats: Stat[] = overviewQuery.data
    ? [
        {
          label: "Revenue",
          value: formatMoney(overviewQuery.data.revenueMinor, currencyCode),
        },
        {
          label: "Completed appointments",
          value: String(overviewQuery.data.completedAppointmentsCount),
        },
        {
          label: "New clients",
          value: String(overviewQuery.data.newClientsCount),
        },
        {
          label: "Occupancy",
          value: `${Math.round(overviewQuery.data.occupancyRate * 100)}%`,
        },
      ]
    : [];

  return (
    <PageShell>
      <PageHeader
        title="Reports"
        subtitle="Track revenue, appointments, and team performance over time."
        action={
          <div style={{ display: "flex", gap: 4 }}>
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPreset(p.key)}
                style={{
                  height: 32,
                  padding: "0 13px",
                  border:
                    p.key === preset
                      ? "1px solid #16161A"
                      : "1px solid #D5D9DE",
                  borderRadius: 6,
                  background: p.key === preset ? "#16161A" : "#FFFFFF",
                  color: p.key === preset ? "#FFFFFF" : "#16161A",
                  fontFamily: "inherit",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />

      {isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Loading reports…
        </p>
      ) : error ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {error.message}
        </p>
      ) : (
        <>
          <StatGrid stats={stats} />

          <DataTable<(typeof revenueRows)[number]>
            caption="Revenue by period"
            rowKey={(row) => row.periodStart}
            columns={revenueColumns}
            rows={revenueRows}
          />

          <DataTable<(typeof topServiceRows)[number]>
            caption="Top services"
            rowKey={(row) => row.serviceName}
            columns={topServiceColumns}
            rows={topServiceRows}
          />
        </>
      )}
    </PageShell>
  );
}
