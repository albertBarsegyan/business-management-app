"use client";

import { useState } from "react";
import type { ScreenKey } from "./model/nav";
import { AddClientPanel } from "./ui/add-client-panel";
import { ClientTable } from "./ui/client-table";
import { EmptyState } from "./ui/empty-state";
import { SidebarNav } from "./ui/sidebar-nav";
import { TeamTable } from "./ui/team-table";
import { TopBar } from "./ui/top-bar";

export function TeamAndClientsScreen() {
  const [screen, setScreen] = useState<ScreenKey>("team");
  const [groupOpen, setGroupOpen] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: 820, overflow: "hidden", position: "relative", background: "#F5F6F8", color: "#16161A" }}>
      <SidebarNav screen={screen} />
      <main style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", background: "#F5F6F8" }}>
        <TopBar
          screen={screen}
          onSelectScreen={(next) => {
            setScreen(next);
            setPanelOpen(false);
          }}
        />
        <div style={{ flex: "1 1 auto", overflow: "auto", padding: "20px 22px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          {screen === "team" ? <TeamTable groupOpen={groupOpen} onToggleGroup={() => setGroupOpen((v) => !v)} /> : null}
          {screen === "clients" ? <ClientTable onOpenPanel={() => setPanelOpen(true)} /> : null}
          {screen === "empty" ? <EmptyState onOpenPanel={() => setPanelOpen(true)} /> : null}
        </div>
      </main>
      <AddClientPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}
