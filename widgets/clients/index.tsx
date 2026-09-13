"use client";

import { useMemo, useState } from "react";
import {
  buildNavItems,
  dayCalendarAccent,
  SidebarNav,
} from "@/widgets/day-calendar";
import { useClientsQuery } from "@/shared/api/clients/queries";
import type { Client } from "@/shared/api/clients/types";
import { AddClientPanel } from "./ui/add-client-panel";
import { ClientDetailPanel } from "./ui/client-detail-panel";
import { ClientTable } from "./ui/client-table";
import { EmptyState } from "./ui/empty-state";
import { TopBar } from "./ui/top-bar";

export function ClientsScreen() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [forceEmpty, setForceEmpty] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const expanded = !collapsed;
  const navItems = useMemo(() => buildNavItems(), []);
  const clientsQuery = useClientsQuery();

  const showEmpty =
    forceEmpty || (clientsQuery.isSuccess && clientsQuery.data.length === 0);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: 820,
        overflow: "hidden",
        position: "relative",
        background: "#F5F6F8",
        color: "#16161A",
      }}
    >
      <SidebarNav
        expanded={expanded}
        accent={dayCalendarAccent}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          background: "#F5F6F8",
        }}
      >
        <TopBar
          empty={forceEmpty}
          onToggleEmpty={() => setForceEmpty((v) => !v)}
        />
        <div
          className="zhamo-main-pad"
          style={{
            flex: "1 1 auto",
            overflow: "auto",
            padding: "20px 22px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {clientsQuery.isPending ? (
            <p style={{ padding: 24, color: "#8A9099", fontSize: 13.5 }}>
              Loading clients…
            </p>
          ) : clientsQuery.isError ? (
            <p style={{ padding: 24, color: "#C7302F", fontSize: 13.5 }}>
              Couldn&apos;t load clients: {clientsQuery.error.message}
            </p>
          ) : showEmpty ? (
            <EmptyState onOpenPanel={() => setPanelOpen(true)} />
          ) : (
            <ClientTable
              clients={clientsQuery.data}
              onOpenPanel={() => setPanelOpen(true)}
              onSelectClient={setSelectedClient}
            />
          )}
        </div>
      </main>
      <AddClientPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
      <ClientDetailPanel
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  );
}
