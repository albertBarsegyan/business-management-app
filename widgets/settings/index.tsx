"use client";

import { DataTable, PageHeader, PageHeaderButton, PageShell, Pill, Toggle } from "@/widgets/day-calendar";
import { businessProfile, bookingPreferences, workingHours, type HoursRow, type PreferenceRow } from "./model/data";

export function SettingsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Settings"
        subtitle="Manage your business profile, working hours and booking preferences."
        action={<PageHeaderButton>Save changes</PageHeaderButton>}
      />

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A9099" }}>
          Business profile
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Business name</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{businessProfile.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Address</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{businessProfile.address}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Timezone</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{businessProfile.timezone}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Currency</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{businessProfile.currency}</span>
          </div>
        </div>
      </div>

      <DataTable<HoursRow>
        caption="Working hours"
        rowKey={(row) => row.day}
        columns={[
          { label: "Day", render: (row) => row.day, width: "1fr" },
          {
            label: "Status",
            render: (row) =>
              row.open ? (
                <Pill bg="rgba(30,142,90,0.12)" color="#1E8E5A">Open</Pill>
              ) : (
                <Pill bg="rgba(139,145,154,0.14)" color="#6B717A">Closed</Pill>
              ),
            width: "0.8fr",
          },
          { label: "Hours", render: (row) => row.hours, align: "right", width: "1fr" },
        ]}
        rows={workingHours}
      />

      <DataTable<PreferenceRow>
        caption="Booking preferences"
        rowKey={(row) => row.label}
        columns={[
          {
            label: "Preference",
            render: (row) => (
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontWeight: 600 }}>{row.label}</span>
                <span style={{ fontSize: 12, color: "#8A9099" }}>{row.description}</span>
              </span>
            ),
            width: "2.4fr",
          },
          { label: "Enabled", render: (row) => <Toggle on={row.on} />, align: "right", width: "0.6fr" },
        ]}
        rows={bookingPreferences}
      />
    </PageShell>
  );
}
