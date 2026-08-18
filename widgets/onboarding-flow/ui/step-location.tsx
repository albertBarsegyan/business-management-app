import { ZhamoSectionTag } from "@/shared/ui/zhamo/section-tag";
import { sources } from "../model/onboarding-data";
import { OnboardingRail } from "./onboarding-rail";

export function StepLocation() {
  return (
    <div data-screen-label="Onboarding step 3" style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <ZhamoSectionTag>Screen 3 — promo code expanded</ZhamoSectionTag>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", height: 620, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden" }}>
        <OnboardingRail
          railBg="oklch(0.22 0.03 350)"
          stepNumber="03"
          totalColor="rgba(255,255,255,0.35)"
          fillHeight={92}
          fillColor="oklch(0.64 0.16 350)"
          countdownLabel="~6 SEC LEFT"
          countdownColor="oklch(0.7 0.14 350)"
          upcomingColor="rgba(255,255,255,0.5)"
          items={[
            { label: "About you", state: "done" },
            { label: "Your business", state: "done" },
            { label: "Where you are", state: "active" },
          ]}
        />

        <div style={{ padding: "52px 56px", display: "flex", flexDirection: "column" }}>
          <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-zhamo-display)", fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700 }}>
            Where are you from?
          </h2>
          <p style={{ margin: "0 0 30px", fontSize: 14, color: "#5B6069" }}>
            Sets your currency, time zone and SMS sender defaults.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "273px 273px", gap: 14 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Country</span>
              <div className="zhamo-onboard-select" style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
                <span>Armenia</span>
                <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>City</span>
              <div className="zhamo-onboard-select" style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
                <span>Yerevan</span>
                <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
              </div>
            </label>
          </div>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>How did you hear about us?</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 620 }}>
              {sources.map((s) => (
                <span
                  key={s.label}
                  className="zhamo-onboard-chip"
                  style={{ height: 32, padding: "0 14px", borderRadius: 6, fontSize: 13, display: "inline-flex", alignItems: "center", cursor: "pointer", border: `1px solid ${s.border}`, background: s.bg, color: s.color, fontWeight: s.weight }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 8, maxWidth: 273 }}>
            <span style={{ fontSize: 12.5, color: "#2C6CF6", cursor: "pointer", width: "fit-content" }}>I have a promo code</span>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                readOnly
                defaultValue="ZHAMO25"
                style={{ height: 32, flex: 1, padding: "0 10px", border: "1px solid #22C55E", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13, letterSpacing: "0.06em" }}
              />
              <button style={{ height: 32, padding: "0 12px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Apply
              </button>
            </div>
            <span style={{ fontSize: 11, color: "#17753C" }}>Applied — 25% off the first three months.</span>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <button className="zhamo-onboard-back" style={{ height: 40, padding: "0 16px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Back
            </button>
            <button className="zhamo-onboard-primary" style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Set up my workspace
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .zhamo-onboard-select:hover { border-color: #16161A; }
        .zhamo-onboard-chip:hover { border-color: #16161A; }
        .zhamo-onboard-back:hover { border-color: #16161A; }
        .zhamo-onboard-primary:hover { background: #F0B81F; }
      `}</style>
    </div>
  );
}
