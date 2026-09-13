"use client";

import { useMemo, useState } from "react";
import {
  buildNavItems,
  dayCalendarAccent,
  SidebarNav,
} from "@/widgets/day-calendar";
import { useLandingBuilder } from "./model/use-landing-builder";
import { BuilderTopbar } from "./ui/builder-topbar";
import { ConfigPanel } from "./ui/config-panel";
import { LibraryModal } from "./ui/library-modal";
import { LivePreview } from "./ui/preview";
import { StructurePanel } from "./ui/structure-panel";

export { PublicLandingPage } from "./ui/preview/public-page";
export { LandingBuilderScreen } from "./ui/landing-builder-screen";

/**
 * Superseded by `LandingBuilderScreen` (Phase 5's registry-based rewrite)
 * for the staff-facing `/landing-builder` page — kept, not deleted,
 * because `PublicLandingPage` re-exported above still backs the live
 * `/customer` booking flow (`widgets/booking-widget/ui/customer-booking-
 * screen.tsx`), and this whole model/ui tree is what that component
 * depends on. Migrating `/customer`'s public rendering to the new
 * registry needs it restructured into a Server Component shell + client
 * booking island (to fetch real site data server-side the way
 * `app/s/[slug]/page.tsx` does) — flagged as follow-up work, not done in
 * this phase to avoid destabilizing the live booking flow.
 */
export function LandingBuilder() {
  const state = useLandingBuilder();
  const [collapsed, setCollapsed] = useState(false);

  const expanded = !collapsed;
  const navItems = useMemo(() => buildNavItems(), []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: 860,
        overflow: "hidden",
        position: "relative",
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
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
          background: "#F5F6F8",
        }}
      >
        {state.isLoading ? (
          <div
            style={{
              flex: "1 1 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#8A9099",
            }}
          >
            Loading your landing page…
          </div>
        ) : (
          <>
            <BuilderTopbar state={state} />
            <div
              style={{
                flex: "1 1 auto",
                minHeight: 0,
                minWidth: 1060,
                display: "grid",
                gridTemplateColumns: "262px minmax(440px, 1fr) 330px",
              }}
            >
              <StructurePanel state={state} />
              <LivePreview state={state} />
              <ConfigPanel state={state} />
            </div>
          </>
        )}
      </main>

      {!state.isLoading && <LibraryModal state={state} />}
    </div>
  );
}
