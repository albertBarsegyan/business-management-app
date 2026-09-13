"use client";

import { useMemo, useState } from "react";
import { AppointmentSidebar } from "@/widgets/appointment-panel";
import { buildNavItems } from "./model/nav-items";
import { buildSlots } from "./model/slots";
import { dayCalendarAccent } from "./model/team";
import { CalendarGrid } from "./ui/calendar-grid";
import { CalendarToolbar } from "./ui/calendar-toolbar";
import { MiniCalendarRail } from "./ui/mini-calendar-rail";
import { SidebarNav } from "./ui/sidebar-nav";

export { PageShell } from "./ui/page-shell";
export { PageHeader, PageHeaderButton } from "./ui/page-header";
export { StatGrid, type Stat } from "./ui/stat-grid";
export { DataTable, type DataTableColumn } from "./ui/data-table";
export { NotAvailableNotice } from "./ui/not-available-notice";
export { Pill, Toggle } from "./ui/pill";
export { SidebarNav } from "./ui/sidebar-nav";
export { buildNavItems, type NavItem } from "./model/nav-items";
export { dayCalendarAccent } from "./model/team";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + delta);
}

export function DayCalendarScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    startOfDay(new Date()),
  );
  // undefined = closed, null = new appointment, string = editing that id
  const [sidebarAppointmentId, setSidebarAppointmentId] = useState<
    string | null | undefined
  >(undefined);

  const expanded = !collapsed;
  const accent = dayCalendarAccent;
  const navItems = useMemo(() => buildNavItems(), []);
  const slots = useMemo(() => buildSlots(), []);

  return (
    <div
      data-screen-label="Day calendar"
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

      <MiniCalendarRail
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <main
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          background: "#F5F6F8",
        }}
      >
        <CalendarToolbar
          date={selectedDate}
          onToday={() => setSelectedDate(startOfDay(new Date()))}
          onPrevDay={() => setSelectedDate((d) => addDays(d, -1))}
          onNextDay={() => setSelectedDate((d) => addDays(d, 1))}
        />
        <CalendarGrid
          slots={slots}
          date={selectedDate}
          onOpenNewAppointment={() => setSidebarAppointmentId(null)}
          onOpenAppointment={(id) => setSidebarAppointmentId(id)}
        />
      </main>

      {sidebarAppointmentId !== undefined && (
        <AppointmentSidebar
          appointmentId={sidebarAppointmentId}
          onClose={() => setSidebarAppointmentId(undefined)}
          onAppointmentSaved={(id) => setSidebarAppointmentId(id)}
        />
      )}
    </div>
  );
}
