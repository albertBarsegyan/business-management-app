"use client";

import { useState } from "react";
import { ZhamoSectionTag } from "@/shared/ui/zhamo/section-tag";
import { beautyAccent, businessTypeChips, teamSizeChips } from "../model/onboarding-data";
import { OnboardingRail } from "./onboarding-rail";

export function StepYourBusiness() {
  const [beauty, setBeauty] = useState(true);

  const railBg = beauty ? "oklch(0.22 0.03 350)" : "#14141A";
  const pageTint = beauty ? "oklch(0.995 0.004 350)" : "#FFFFFF";
  const fillColor = beauty ? beautyAccent : "#FFC935";
  const industryValue = beauty ? "Hair salon / barbershop" : "Pick a business type first";
  const industryHint = beauty ? "Seeds 24 hair and colour services you can edit." : "Unlocks once a business type is chosen.";
  const industryLabelColor = beauty ? "#5B6069" : "#A9AEB6";
  const industryBorder = beauty ? "#D5D9DE" : "#E6E8EB";
  const industryBg = beauty ? "#FFFFFF" : "#F7F8FA";
  const industryColor = beauty ? "#16161A" : "#A9AEB6";
  const industryCursor = beauty ? "pointer" : "not-allowed";
  const yesBorder = beauty ? "#16161A" : "#D5D9DE";
  const yesBg = beauty ? "#16161A" : "#FFFFFF";
  const yesColor = beauty ? "#FFFFFF" : "#16161A";
  const yesWeight = beauty ? 600 : 400;
  const continueBg = beauty ? "#FFC935" : "#EDEFF2";
  const continueColor = beauty ? "#17170F" : "#A9AEB6";
  const continueCursor = beauty ? "pointer" : "not-allowed";

  return (
    <div data-screen-label="Onboarding step 2" style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <ZhamoSectionTag>Screen 2 — nothing selected → Beauty selected</ZhamoSectionTag>
        <button
          onClick={() => setBeauty((v) => !v)}
          style={{ height: 28, padding: "0 11px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
        >
          {beauty ? "Show nothing selected" : "Select Beauty"}
        </button>
      </div>

      <div className="zhamo-onboard-card" style={{ display: "grid", gridTemplateColumns: "300px 1fr", height: 700, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden" }}>
        <OnboardingRail
          railBg={railBg}
          stepNumber="02"
          totalColor="rgba(255,255,255,0.35)"
          fillHeight={62}
          fillColor={fillColor}
          countdownLabel="~14 SEC LEFT"
          countdownColor={fillColor}
          upcomingColor="rgba(255,255,255,0.5)"
          items={[
            { label: "About you", state: "done" },
            { label: "Your business", state: "active" },
            { label: "Where you are", state: "upcoming" },
          ]}
          badge={
            beauty ? (
              <div style={{ marginTop: 26, padding: 14, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                  Your workspace
                </span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#FFFFFF" }}>Beauty · salon floor</span>
                <span style={{ fontSize: 11.5, lineHeight: 1.45, color: "rgba(255,255,255,0.6)" }}>
                  Colour-service durations, master columns and a tip field are on by default.
                </span>
              </div>
            ) : undefined
          }
        />

        <div style={{ padding: "52px 56px", display: "flex", flexDirection: "column", overflow: "hidden", background: pageTint }}>
          <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-zhamo-display)", fontSize: "clamp(26px, 5.5vw, 48px)", lineHeight: 1.03, letterSpacing: "-0.028em", fontWeight: 700, maxWidth: "22ch" }}>
            A couple of questions about your business
          </h2>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: "#5B6069" }}>
            This decides which fields, durations and reports you get on day one.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Business type</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 620 }}>
              {businessTypeChips(beauty).map((t) => (
                <span
                  key={t.label}
                  className="zhamo-onboard-chip"
                  style={{ height: 32, padding: "0 14px", borderRadius: 6, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", border: `1px solid ${t.border}`, background: t.bg, color: t.color, fontWeight: t.weight }}
                >
                  {t.label}
                  <span style={{ fontSize: 10 }}>{t.check}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="zhamo-onboard-2col" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "273px 273px", gap: 14, maxWidth: 560 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: industryLabelColor }}>Industry</span>
              <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: `1px solid ${industryBorder}`, borderRadius: 6, background: industryBg, fontSize: 13, color: industryColor, cursor: industryCursor }}>
                <span>{industryValue}</span>
                <span style={{ fontSize: 9 }}>▾</span>
              </div>
              <span style={{ fontSize: 11, color: "#A9AEB6" }}>{industryHint}</span>
            </label>
          </div>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>How big is the team?</span>
            <div style={{ display: "flex", gap: 6 }}>
              {teamSizeChips(beauty).map((t) => (
                <span
                  key={t.label}
                  className="zhamo-onboard-chip"
                  style={{ height: 32, minWidth: 52, padding: "0 13px", borderRadius: 6, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: `1px solid ${t.border}`, background: t.bg, color: t.color, fontWeight: t.weight }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Do you provide services yourself?</span>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ height: 32, padding: "0 18px", borderRadius: 6, fontSize: 13, display: "inline-flex", alignItems: "center", cursor: "pointer", border: `1px solid ${yesBorder}`, background: yesBg, color: yesColor, fontWeight: yesWeight }}>
                Yes
              </span>
              <span className="zhamo-onboard-chip" style={{ height: 32, padding: "0 18px", borderRadius: 6, fontSize: 13, display: "inline-flex", alignItems: "center", cursor: "pointer", border: "1px solid #D5D9DE", background: "#FFFFFF" }}>
                No
              </span>
            </div>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <button className="zhamo-onboard-back" style={{ height: 40, padding: "0 16px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Back
            </button>
            <button style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 6, background: continueBg, color: continueColor, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: continueCursor }}>
              Continue
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .zhamo-onboard-chip:hover { border-color: #16161A; }
        .zhamo-onboard-back:hover { border-color: #16161A; }
      `}</style>
    </div>
  );
}
