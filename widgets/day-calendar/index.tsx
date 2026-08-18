"use client";

import { useMemo, useState } from "react";
import { buildMonthDays } from "./model/month-days";
import { buildNavItems } from "./model/nav-items";
import { buildSlots } from "./model/slots";
import { dayCalendarAccent } from "./model/team";
import { CalendarGrid } from "./ui/calendar-grid";
import { CalendarToolbar } from "./ui/calendar-toolbar";
import { MiniCalendarRail } from "./ui/mini-calendar-rail";
import { SidebarNav } from "./ui/sidebar-nav";

export function DayCalendarScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(true);

  const expanded = !collapsed;
  const accent = dayCalendarAccent;
  const navItems = useMemo(() => buildNavItems(accent), [accent]);
  const monthDays = useMemo(() => buildMonthDays(accent), [accent]);
  const slots = useMemo(() => buildSlots(), []);

  return (
    <div data-screen-label="Day calendar" style={{ display: "flex", height: "100vh", minHeight: 820, overflow: "hidden" }}>
      <SidebarNav
        expanded={expanded}
        accent={accent}
        adminLabel={expanded ? "Administration" : "⚙"}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />

      <MiniCalendarRail monthDays={monthDays} favoritesOpen={favoritesOpen} onToggleFavorites={() => setFavoritesOpen((v) => !v)} />

      <main style={{ flex: "1 1 auto", display: "flex", flexDirection: "column", minWidth: 0, background: "#F5F6F8" }}>
        <CalendarToolbar switcherLabel={empty ? "Show a busy day" : "Show day one"} onToggleDay={() => setEmpty((v) => !v)} />
        <CalendarGrid slots={slots} showAppointments={!empty} showEmpty={empty} />
      </main>
    </div>
  );
}
