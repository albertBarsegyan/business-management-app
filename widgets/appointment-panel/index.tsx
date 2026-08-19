"use client";

import { useState } from "react";
import type { PanelMode, VisitStatus } from "./model/types";
import { CartColumn } from "./ui/cart-column";
import { ClientColumn } from "./ui/client-column";
import { ConflictBanner } from "./ui/conflict-banner";
import { DimmedCalendarBackdrop } from "./ui/dimmed-calendar-backdrop";
import { ModeSwitcher } from "./ui/mode-switcher";
import { PanelFooter } from "./ui/panel-footer";
import { PanelHeader } from "./ui/panel-header";
import { SavedToast } from "./ui/saved-toast";
import { TimingColumn } from "./ui/timing-column";

export function AppointmentPanelScreen() {
  const [mode, setMode] = useState<PanelMode>("new");
  const [statusState, setStatusState] = useState<VisitStatus>("Pending");

  const isEdit = mode === "edit";
  const isConflict = mode === "conflict";
  const status: VisitStatus = isEdit ? "Confirmed" : statusState;

  const headerTitle = isEdit ? "Anahit Grigoryan" : "New appointment";
  const headerMeta = isEdit ? "13 August, 14:30 – 15:15 · Karen Sahakyan" : "13 August, Thursday · slot 14:30";
  const footerTitle = isEdit ? "Edit appointment" : "New appointment";
  const footerMeta = isEdit ? "Created 02.07.2026 by Lilit · last edited 2 min ago" : "45 min · 7 500 ֏ · Karen Sahakyan";

  return (
    <div data-screen-label="Appointment panel" style={{ height: "100vh", minHeight: 780, position: "relative", overflow: "hidden", background: "#F5F6F8" }}>
      <DimmedCalendarBackdrop />
      <ModeSwitcher mode={mode} onSelect={setMode} />
      {mode === "new" && <SavedToast />}

      <section
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(1180px, 92%)",
          background: "#F7F8FA",
          borderLeft: "1px solid #E6E8EB",
          boxShadow: "-20px 0 60px rgba(10,10,14,0.22)",
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        <PanelHeader title={headerTitle} meta={headerMeta} isEdit={isEdit} />
        {isConflict && <ConflictBanner />}

        <div className="zhamo-grid-3" style={{ flex: "1 1 auto", overflowY: "auto", padding: "14px 18px 18px", display: "grid", gridTemplateColumns: "1fr 1.15fr 1fr", gap: 14, alignItems: "start" }}>
          <TimingColumn isEdit={isEdit} isConflict={isConflict} />
          <CartColumn status={status} onSelectStatus={setStatusState} />
          <ClientColumn isEdit={isEdit} />
        </div>

        <PanelFooter title={footerTitle} meta={footerMeta} isEdit={isEdit} isConflict={isConflict} />
      </section>
    </div>
  );
}
