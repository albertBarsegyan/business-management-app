"use client";

import { PageHeader, PageShell, Pill } from "@/widgets/day-calendar";
import { integrations } from "./model/data";

export function IntegrationsScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Integrations"
        subtitle="Connect calendars, payments, and other tools to your business."
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {integrations.map((item) => (
          <div
            key={item.name}
            style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    flex: "0 0 auto",
                    borderRadius: 7,
                    background: "#F1F2F4",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#5B6069",
                  }}
                >
                  {item.mono}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
              </div>
              {item.connected ? (
                <Pill bg="rgba(30,142,90,0.12)" color="#1E8E5A">Connected</Pill>
              ) : (
                <Pill bg="#EEF0F2" color="#8A9099">Not connected</Pill>
              )}
            </div>

            <p style={{ margin: 0, fontSize: 12.5, color: "#7C818B", lineHeight: 1.5, flex: 1 }}>{item.description}</p>

            <button
              style={{
                alignSelf: "flex-start",
                height: 30,
                padding: "0 12px",
                borderRadius: 6,
                fontFamily: "inherit",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                border: item.connected ? "1px solid #D5D9DE" : "0",
                background: item.connected ? "#FFFFFF" : "#FFC935",
                color: item.connected ? "#16161A" : "#17170F",
              }}
            >
              {item.connected ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
