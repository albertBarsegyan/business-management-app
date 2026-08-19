"use client";

import { useMemo, useState } from "react";
import { buildNavItems, dayCalendarAccent, SidebarNav } from "@/widgets/day-calendar";
import { useLandingBuilder } from "./model/use-landing-builder";
import { BuilderTopbar } from "./ui/builder-topbar";
import { ConfigPanel } from "./ui/config-panel";
import { LibraryModal } from "./ui/library-modal";
import { LivePreview } from "./ui/preview";
import { StructurePanel } from "./ui/structure-panel";

export { PublicLandingPage } from "./ui/preview/public-page";

export function LandingBuilder() {
  const state = useLandingBuilder();
  const [collapsed, setCollapsed] = useState(false);

  const expanded = !collapsed;
  const navItems = useMemo(() => buildNavItems(), []);

  return (
    <div style={{ display: "flex", height: "100vh", minHeight: 860, overflow: "hidden", position: "relative" }}>
      <SidebarNav
        expanded={expanded}
        accent={dayCalendarAccent}
        adminLabel={expanded ? "Administration" : "⚙"}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <main style={{ flex: "1 1 auto", minWidth: 0, overflowX: "auto", display: "flex", flexDirection: "column", background: "#F5F6F8" }}>
        <BuilderTopbar state={state} />
        <div style={{ flex: "1 1 auto", minHeight: 0, minWidth: 1060, display: "grid", gridTemplateColumns: "262px minmax(440px, 1fr) 330px" }}>
          <StructurePanel state={state} />
          <LivePreview state={state} />
          <ConfigPanel state={state} />
        </div>
      </main>

      <LibraryModal state={state} />
    </div>
  );
}
