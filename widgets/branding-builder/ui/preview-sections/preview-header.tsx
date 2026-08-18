import type { BrandingViewModel } from "../../lib/build-view-model";

export function PreviewHeader({ vals }: { vals: BrandingViewModel }) {
  return (
    <>
      <div style={{ height: vals.coverHeight, background: vals.coverBg, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "12px 16px" }}>
        {vals.hasCover && (
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
            cover · 1600×900
          </span>
        )}
        {vals.isEditorial && (
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 40, lineHeight: 1, letterSpacing: "-0.03em", fontWeight: 700, color: "#FFFFFF", maxWidth: "60%" }}>
            Studio Aram
          </span>
        )}
      </div>

      <div style={{ padding: vals.headerPad, display: "flex", gap: 14, alignItems: "flex-start", background: vals.pageBg }}>
        <span
          style={{
            width: 48,
            height: 48,
            flex: "0 0 auto",
            marginTop: vals.logoLift,
            borderRadius: 12,
            background: vals.logoBg,
            border: `1px solid ${vals.logoBorder}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 19,
            fontWeight: 700,
            color: vals.accent,
          }}
        >
          A
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
          {vals.showHeroName && (
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: vals.heroSize, lineHeight: 1.04, letterSpacing: "-0.026em", fontWeight: 700, color: vals.inkStrong }}>
              Studio Aram
            </span>
          )}
          <span style={{ fontSize: 12.5, color: vals.inkMuted }}>Barbershop · 12 Abovyan St, Kentron, Yerevan</span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: 9, fontSize: 12 }}>
            <span style={{ color: vals.ratingColor, fontWeight: 600 }}>★ 4.9</span>
            <span style={{ color: vals.inkMuted }}>218 reviews</span>
            <span style={{ color: vals.openColor, fontWeight: 600 }}>Open till 22:00</span>
          </span>
        </div>
        <button style={{ marginLeft: "auto", flex: "0 0 auto", height: 40, padding: "0 18px", border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Book now
        </button>
      </div>

      {vals.showTrustRow && (
        <div style={{ margin: "0 16px 14px", padding: "12px 14px", borderRadius: 8, background: vals.trustBg, border: `1px solid ${vals.trustBorder}`, display: "flex", flexWrap: "wrap", gap: 18 }}>
          {vals.trustItems.map((t) => (
            <span key={t.k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: vals.inkStrong }}>{t.k}</span>
              <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{t.v}</span>
            </span>
          ))}
        </div>
      )}
    </>
  );
}
