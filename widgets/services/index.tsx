"use client";

import { useMemo, useState } from "react";
import { DataTable, PageHeader, PageHeaderButton, PageShell, Pill } from "@/widgets/day-calendar";
import { categories, services, type ServiceRow } from "./model/data";

export function ServicesScreen() {
  const [category, setCategory] = useState("All");

  const rows = useMemo(
    () => (category === "All" ? services : services.filter((s) => s.category === category)),
    [category]
  );

  return (
    <PageShell>
      <PageHeader
        title="Services"
        subtitle="Manage the services your business offers, along with pricing and duration."
        action={<PageHeaderButton>Add service</PageHeaderButton>}
      />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              height: 30,
              padding: "0 12px",
              border: `1px solid ${category === c ? "#16161A" : "#D5D9DE"}`,
              borderRadius: 6,
              background: category === c ? "#16161A" : "#FFFFFF",
              color: category === c ? "#FFFFFF" : "#16161A",
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <DataTable<ServiceRow>
        rowKey={(row) => row.name}
        columns={[
          { label: "Service", render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>, width: "1.6fr" },
          { label: "Category", render: (row) => row.category, width: "0.9fr" },
          { label: "Duration", render: (row) => row.duration, width: "1fr" },
          { label: "Price", render: (row) => row.price, align: "right", width: "0.9fr" },
          { label: "Staff", render: (row) => <span style={{ color: "#5B6069" }}>{row.staff}</span>, width: "1.3fr" },
          {
            label: "Online booking",
            render: (row) =>
              row.online ? (
                <Pill bg="rgba(30,142,90,0.12)" color="#1E8E5A">On</Pill>
              ) : (
                <Pill bg="#EEF0F2" color="#8A9099">Off</Pill>
              ),
            width: "1fr",
          },
        ]}
        rows={rows}
      />
    </PageShell>
  );
}
