import { teamMembers } from "../../model/static-content";
import type { BrandingViewModel } from "../../lib/build-view-model";

export function PreviewTeamAndReview({ vals }: { vals: BrandingViewModel }) {
  return (
    <>
      {vals.sections.team && (
        <div style={{ padding: "0 16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: vals.sectionSize, letterSpacing: "-0.02em", fontWeight: 700, color: vals.inkStrong, paddingTop: 12, borderTop: `1px solid ${vals.hairline}` }}>
            {vals.teamHeading}
          </span>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${vals.teamCols}, 1fr)`, gap: 8 }}>
            {teamMembers.map((m) => (
              <div key={m.name} style={{ border: `1px solid ${vals.hairline}`, borderRadius: 9, padding: 12, display: "flex", flexDirection: "column", gap: 7, background: vals.cardBg }}>
                <span style={{ width: 40, height: 40, borderRadius: "50%", background: m.photo, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-mono)", fontSize: 8.5, color: "rgba(255,255,255,0.85)" }}>
                  PHOTO
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: vals.inkStrong }}>{m.name}</span>
                  <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{m.role}</span>
                  <span style={{ fontSize: 11.5, color: vals.ratingColor, fontWeight: 600 }}>★ {m.rating}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {vals.showReview && (
        <div style={{ padding: "0 16px 18px" }}>
          <div style={{ padding: 16, borderRadius: 9, background: vals.quoteBg, borderLeft: `3px solid ${vals.accent}`, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: vals.quoteSize, lineHeight: 1.25, letterSpacing: "-0.018em", fontWeight: 700, color: vals.inkStrong }}>
              &ldquo;Best fade in Kentron, and they always run on time.&rdquo;
            </span>
            <span style={{ fontSize: 11.5, color: vals.inkMuted }}>Gor H. · verified visit, 29 July 2026</span>
          </div>
        </div>
      )}
    </>
  );
}
