import { ZhamoSectionTag } from "@/shared/ui/zhamo/section-tag";
import { positions } from "../model/onboarding-data";

export function StepPositionSelect() {
  return (
    <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <ZhamoSectionTag>Screen 1 — select open</ZhamoSectionTag>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, padding: "40px 56px", display: "flex", gap: 40 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, width: 273 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Your position</span>
          <div style={{ position: "relative" }}>
            <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #2C6CF6", borderRadius: 6, fontSize: 13, boxShadow: "0 0 0 3px rgba(44,108,246,0.14)" }}>
              <span>Owner</span>
              <span style={{ fontSize: 9, color: "#2C6CF6" }}>▴</span>
            </div>
            <div style={{ position: "absolute", top: 38, left: 0, right: 0, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, boxShadow: "0 12px 32px rgba(20,20,26,0.14)", padding: 4, display: "flex", flexDirection: "column", zIndex: 2 }}>
              {positions.map((p) => (
                <span
                  key={p.label}
                  className="zhamo-onboard-option"
                  style={{ height: 32, padding: "0 9px", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, cursor: "pointer", background: p.bg, fontWeight: p.weight }}
                >
                  {p.label}
                  <span style={{ color: "#FFC935", fontSize: 11 }}>{p.check}</span>
                </span>
              ))}
            </div>
          </div>
        </label>
        <p style={{ margin: 0, maxWidth: "40ch", fontSize: 13, lineHeight: 1.6, color: "#8A9099" }}>
          Position drives default permissions: a receptionist lands on the calendar with money
          screens hidden, an accountant lands on Finance.
        </p>
      </div>
      <style>{`.zhamo-onboard-option:hover { background: #F5F6F8; }`}</style>
    </div>
  );
}
