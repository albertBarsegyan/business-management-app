"use client";

import type { ReactNode } from "react";
import { useLandingBuilder } from "../../model/use-landing-builder";
import { PreviewFooter } from "./preview-footer";
import { PreviewHero } from "./preview-hero";
import { PreviewNavbar } from "./preview-navbar";
import { PreviewSection } from "./preview-section";

export function PublicLandingPage({ bookingSlot }: { bookingSlot: ReactNode }) {
  const state = useLandingBuilder({ interactive: false });
  const {
    pageBg,
    ink,
    inkMuted,
    hairline,
    gutter,
    accent,
    coverBg,
    dark,
    nav,
  } = state;
  const bookingBg = dark ? "#1A1A21" : "oklch(0.985 0.008 350)";

  if (state.isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "#8A9099",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: pageBg, color: ink }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", background: pageBg }}>
        <div
          style={{
            position: nav.sticky ? "sticky" : "static",
            top: 0,
            zIndex: 20,
          }}
        >
          <PreviewNavbar state={state} />
        </div>

        <PreviewHero state={state} />

        {state.renderedSections.map((sec) => (
          <PreviewSection
            key={sec.key}
            sec={sec}
            accent={accent}
            coverBg={coverBg}
          />
        ))}

        <div
          style={{
            padding: `26px ${gutter}`,
            background: bookingBg,
            borderTop: `1px solid ${hairline}`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: "clamp(22px, 4vw, 24px)",
                lineHeight: 1.06,
                letterSpacing: "-0.022em",
                fontWeight: 700,
                color: ink,
              }}
            >
              Book an appointment
            </span>
            <span
              style={{ fontSize: 11.5, color: inkMuted, whiteSpace: "nowrap" }}
            >
              No account needed
            </span>
          </div>
          {bookingSlot}
        </div>

        <PreviewFooter state={state} />
      </div>
    </div>
  );
}
