import { ZhamoSectionTag } from "@/shared/ui/zhamo/section-tag";
import { OnboardingRail } from "./onboarding-rail";

export function StepAboutYou() {
  return (
    <div data-screen-label="Onboarding step 1" style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <ZhamoSectionTag>Screen 1 — select closed</ZhamoSectionTag>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", height: 660, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden" }}>
        <OnboardingRail
          railBg="#14141A"
          stepNumber="01"
          fillHeight={32}
          fillColor="#FFC935"
          countdownLabel="~22 SEC LEFT"
          countdownColor="#FFC935"
          items={[
            { label: "About you", state: "active" },
            { label: "Your business", state: "upcoming" },
            { label: "Where you are", state: "upcoming" },
          ]}
        />

        <div style={{ padding: "52px 56px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-zhamo-display)", fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700 }}>
            Let&apos;s get acquainted!
          </h2>
          <p style={{ margin: "0 0 32px", fontSize: 14, color: "#5B6069" }}>
            Tell us about yourself and your business. It&apos;ll take less than 30 seconds.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 560 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>First name</span>
              <input readOnly defaultValue="Lilit" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Last name</span>
              <input readOnly defaultValue="Sargsyan" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
            </label>
          </div>

          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>How many locations does your business have?</span>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ height: 32, padding: "0 14px", borderRadius: 6, border: "1px solid #16161A", background: "#16161A", color: "#FFFFFF", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                One
              </span>
              <span className="zhamo-onboard-chip" style={{ height: 32, padding: "0 14px", borderRadius: 6, border: "1px solid #D5D9DE", background: "#FFFFFF", fontSize: 13, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                Multiple
              </span>
              <span className="zhamo-onboard-chip" style={{ height: 32, padding: "0 14px", borderRadius: 6, border: "1px solid #D5D9DE", background: "#FFFFFF", fontSize: 13, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                I&apos;m self-employed
              </span>
            </div>
          </div>

          <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 560 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Brand name</span>
              <input readOnly defaultValue="Studio Aram" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Your position</span>
              <div className="zhamo-onboard-select" style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
                <span>Owner</span>
                <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
              </div>
            </label>
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 14 }}>
            <button className="zhamo-onboard-primary" style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Continue
            </button>
            <span style={{ fontSize: 12, color: "#8A9099" }}>
              Press <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>⏎</span> to continue
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .zhamo-onboard-chip:hover { border-color: #16161A; }
        .zhamo-onboard-select:hover { border-color: #16161A; }
        .zhamo-onboard-primary:hover { background: #F0B81F; }
      `}</style>
    </div>
  );
}
