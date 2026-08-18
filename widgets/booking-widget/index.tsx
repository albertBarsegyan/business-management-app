"use client";

import { useBookingFlow } from "./lib/use-booking-flow";
import { DesktopEmbed } from "./ui/desktop-embed";
import { MobileWidget } from "./ui/mobile-widget";
import { PageHeader } from "./ui/page-header";
import { RulesPanel } from "./ui/rules-panel";
import { VerticalComparison } from "./ui/vertical-comparison";
import { WalkTheFlowPanel } from "./ui/walk-the-flow-panel";

export function BookingWidgetScreen() {
  const flow = useBookingFlow();

  return (
    <div style={{ padding: "48px 40px 96px", display: "flex", flexDirection: "column", alignItems: "center", gap: 48, background: "#E9EBEE", color: "#16161A" }}>
      <PageHeader />

      <div style={{ width: "100%", maxWidth: 1180, display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
        <MobileWidget flow={flow} />
        <div style={{ flex: "1 1 340px", minWidth: 300, display: "flex", flexDirection: "column", gap: 14 }}>
          <WalkTheFlowPanel flow={flow} />
          <RulesPanel />
        </div>
      </div>

      <DesktopEmbed />
      <VerticalComparison />
    </div>
  );
}
