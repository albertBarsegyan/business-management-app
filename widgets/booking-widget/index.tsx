"use client";

import { PageShell } from "@/widgets/day-calendar";
import { useBookingFlow } from "./lib/use-booking-flow";
import { DesktopEmbed } from "./ui/desktop-embed";
import { MobileWidget } from "./ui/mobile-widget";
import { PageHeader } from "./ui/page-header";
import { RulesPanel } from "./ui/rules-panel";
import { VerticalComparison } from "./ui/vertical-comparison";
import { WalkTheFlowPanel } from "./ui/walk-the-flow-panel";

export { CustomerBookingScreen } from "./ui/customer-booking-screen";

export function BookingWidgetScreen() {
  const flow = useBookingFlow();
  const desktopFlow = useBookingFlow();

  return (
    <PageShell>
      <PageHeader />

      <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
        <MobileWidget flow={flow} />
        <div style={{ flex: "1 1 340px", minWidth: 300, display: "flex", flexDirection: "column", gap: 14 }}>
          <WalkTheFlowPanel flow={flow} />
          <RulesPanel />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
          Embedded widget — as it appears on the salon&apos;s own site
        </span>
        <DesktopEmbed flow={desktopFlow} />
      </div>

      <VerticalComparison />
    </PageShell>
  );
}
