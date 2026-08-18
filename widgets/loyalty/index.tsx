"use client";

import { DataTable, PageHeader, PageShell, Pill, StatGrid } from "@/widgets/day-calendar";
import { loyaltyStats, tiers, topMembers, type MemberRow, type TierRow } from "./model/data";

const tierStyle: Record<MemberRow["tier"], { bg: string; color: string }> = {
  Bronze: { bg: "rgba(180,120,15,0.12)", color: "#B4780F" },
  Silver: { bg: "#EEF0F2", color: "#5B6069" },
  Gold: { bg: "rgba(255,201,53,0.22)", color: "#8A6300" },
};

export function LoyaltyScreen() {
  return (
    <PageShell>
      <PageHeader
        title="Loyalty"
        subtitle="Set up loyalty rewards and repeat-visit perks for your clients."
      />

      <StatGrid stats={loyaltyStats} />

      <DataTable<TierRow>
        caption="Reward tiers"
        rowKey={(row) => row.tier}
        columns={[
          { label: "Tier", render: (row) => <span style={{ fontWeight: 600 }}>{row.tier}</span>, width: "0.8fr" },
          { label: "Threshold", render: (row) => row.threshold, width: "1fr" },
          { label: "Perk", render: (row) => row.perk, width: "2fr" },
        ]}
        rows={tiers}
      />

      <DataTable<MemberRow>
        caption="Top members"
        rowKey={(row) => row.name}
        columns={[
          { label: "Member", render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>, width: "1.6fr" },
          {
            label: "Tier",
            render: (row) => (
              <Pill bg={tierStyle[row.tier].bg} color={tierStyle[row.tier].color}>
                {row.tier}
              </Pill>
            ),
            width: "0.9fr",
          },
          { label: "Points", render: (row) => row.points, align: "right", width: "0.8fr" },
          { label: "Last visit", render: (row) => row.lastVisit, align: "right", width: "0.9fr" },
        ]}
        rows={topMembers}
      />
    </PageShell>
  );
}
