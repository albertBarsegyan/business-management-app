import { hours } from "../../model/static-content";
import type { BrandingViewModel } from "../../lib/build-view-model";

export function PreviewHoursAndFooter({ vals }: { vals: BrandingViewModel }) {
  return (
    <>
      {vals.sections.hours && (
        <div style={{ padding: "0 16px 20px", display: "grid", gridTemplateColumns: vals.hoursCols, gap: 10 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, paddingTop: 12, borderTop: `1px solid ${vals.hairline}` }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: vals.sectionSize, letterSpacing: "-0.02em", fontWeight: 700, color: vals.inkStrong }}>Hours &amp; address</span>
            {hours.map((h) => (
              <span key={h.d} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, fontSize: 12.5 }}>
                <span style={{ color: vals.inkMuted }}>{h.d}</span>
                <span style={{ fontFamily: "var(--font-zhamo-mono)", color: vals.inkStrong }}>{h.t}</span>
              </span>
            ))}
            <span style={{ fontSize: 12.5, color: vals.inkMuted, lineHeight: 1.5 }}>
              12 Abovyan St, Kentron
              <br />
              +374 10 543 220
            </span>
          </div>
          <span style={{ minHeight: 120, borderRadius: 9, background: vals.mapBg, border: `1px solid ${vals.hairline}`, marginTop: 12, display: "flex", alignItems: "flex-end", padding: 9, fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, color: vals.inkMuted }}>
            MAP · pinned location
          </span>
        </div>
      )}

      <div style={{ padding: "12px 16px", background: vals.footerBg, borderTop: `1px solid ${vals.hairline}`, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11.5, color: vals.inkMuted }}>Powered by Zhamo</span>
        <span style={{ marginLeft: "auto", height: 36, padding: "0 16px", borderRadius: 8, background: "#FFC935", color: "#17170F", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
          Book now
        </span>
      </div>
    </>
  );
}
