"use client";

import { useMemo, useState } from "react";
import { buildNavItems, dayCalendarAccent, SidebarNav } from "@/widgets/day-calendar";
import { AddClientPanel } from "./ui/add-client-panel";
import { ClientTable } from "./ui/client-table";
import { EmptyState } from "./ui/empty-state";
import { TopBar } from "./ui/top-bar";

export function ClientsScreen() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [empty, setEmpty] = useState(false);

  const expanded = !collapsed;
  const navItems = useMemo(() => buildNavItems(), []);

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: 820, overflow: "hidden", position: "relative", background: "#F5F6F8", color: "#16161A" }}>
      <SidebarNav
        expanded={expanded}
        accent={dayCalendarAccent}
        adminLabel={expanded ? "Administration" : "⚙"}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", background: "#F5F6F8" }}>
        <TopBar empty={empty} onToggleEmpty={() => setEmpty((v) => !v)} />
        <div className="zhamo-main-pad" style={{ flex: "1 1 auto", overflow: "auto", padding: "20px 22px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          {empty ? <EmptyState onOpenPanel={() => setPanelOpen(true)} /> : <ClientTable onOpenPanel={() => setPanelOpen(true)} />}
        </div>
      </main>
      <AddClientPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
