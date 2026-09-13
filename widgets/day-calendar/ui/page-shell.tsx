"use client";

import { useMemo, useState } from "react";
import { buildNavItems } from "../model/nav-items";
import { dayCalendarAccent } from "../model/team";
import { SidebarNav } from "./sidebar-nav";

export function PageShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [collapsed, setCollapsed] = useState(false);
  const expanded = !collapsed;
  const accent = dayCalendarAccent;
  const navItems = useMemo(() => buildNavItems(), []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: 820,
        overflow: "hidden",
      }}
    >
      <SidebarNav
        expanded={expanded}
        accent={accent}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          overflow: "auto",
          background: "#F5F6F8",
          color: "#16161A",
        }}
      >
        <div
          className="zhamo-main-pad"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "24px 28px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
