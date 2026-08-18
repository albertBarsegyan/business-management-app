import { bookingRules } from "../../model/static-content";
import type { BrandingViewModel } from "../../lib/build-view-model";

export function BookingRulesAndChecks({ vals }: { vals: BrandingViewModel }) {
  return (
    <>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>Booking rules on this page</span>
        {bookingRules.map((r) => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 32, height: 19, flex: "0 0 auto", borderRadius: 10, background: r.on ? "#22C55E" : "#D5D9DE", position: "relative", display: "inline-block", cursor: "pointer" }}>
              <span style={{ position: "absolute", top: 2, left: r.on ? 15 : 2, width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF" }} />
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ fontSize: 12.5 }}>{r.label}</span>
              <span style={{ fontSize: 11, color: "#A9AEB6" }}>{r.meta}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>Before you publish</span>
        {vals.checks.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <span style={{ width: 16, height: 16, flex: "0 0 auto", marginTop: 1, borderRadius: "50%", background: c.bg, color: "#FFFFFF", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {c.glyph}
            </span>
            <span style={{ fontSize: 12, lineHeight: 1.45, color: c.color }}>{c.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
