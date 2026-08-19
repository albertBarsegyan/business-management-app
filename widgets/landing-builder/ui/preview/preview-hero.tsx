import { trustItems } from "../../model/data";
import type { LandingBuilderState } from "../../model/use-landing-builder";

export function PreviewHero({ state }: { state: LandingBuilderState }) {
  const { hero, heroHeight, heroTitleSize, coverBg, gutter, ink, inkMuted, ghostBorder, pageBg, heroOutline } = state;

  const trustStrip = (color: string, strongColor: string) =>
    hero.trust && (
      <span style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 4 }}>
        {trustItems.map((t) => (
          <span key={t.k} style={{ fontSize: 12, color }}>
            <span style={{ fontWeight: 700, color: strongColor }}>{t.k}</span> {t.v}
          </span>
        ))}
      </span>
    );

  return (
    <div onClick={state.selectHero} style={{ cursor: state.interactive ? "pointer" : "default", outline: heroOutline, outlineOffset: -2 }}>
      {hero.layout === "fullbleed" && (
        <div style={{ minHeight: heroHeight, background: coverBg, padding: gutter, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: heroTitleSize, lineHeight: 1.02, letterSpacing: "-0.032em", fontWeight: 700, color: "#FFFFFF", maxWidth: "22ch" }}>
            {hero.title}
          </span>
          <span style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", maxWidth: "46ch" }}>{hero.sub}</span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ height: 44, padding: "0 20px", borderRadius: 8, background: "#FFC935", color: "#17170F", fontSize: 14.5, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
              {hero.cta}
            </span>
            {hero.second && (
              <span style={{ height: 44, padding: "0 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.5)", color: "#FFFFFF", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                Call us
              </span>
            )}
          </span>
          {trustStrip("rgba(255,255,255,0.85)", "#FFFFFF")}
        </div>
      )}

      {hero.layout === "split" && (
        <div className="zhamo-grid-2" style={{ display: "grid", gridTemplateColumns: state.device === "phone" ? "1fr" : "1.1fr 1fr", gap: 20, padding: gutter, minHeight: heroHeight, alignItems: "center", background: pageBg }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: heroTitleSize, lineHeight: 1.03, letterSpacing: "-0.03em", fontWeight: 700, color: ink }}>{hero.title}</span>
            <span style={{ fontSize: 14, lineHeight: 1.55, color: inkMuted, maxWidth: "44ch" }}>{hero.sub}</span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{ height: 44, padding: "0 20px", borderRadius: 8, background: "#FFC935", color: "#17170F", fontSize: 14.5, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                {hero.cta}
              </span>
              {hero.second && (
                <span style={{ height: 44, padding: "0 18px", borderRadius: 8, border: `1px solid ${ghostBorder}`, color: ink, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                  Call us
                </span>
              )}
            </span>
            {trustStrip(inkMuted, ink)}
          </div>
          <span style={{ minHeight: 190, borderRadius: 10, background: coverBg, display: "flex", alignItems: "flex-end", padding: 10, fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, color: "rgba(255,255,255,0.85)" }}>
            cover · 1600×1200
          </span>
        </div>
      )}

      {hero.layout === "centered" && (
        <div style={{ minHeight: heroHeight, padding: gutter, background: pageBg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 13, textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: heroTitleSize, lineHeight: 1.02, letterSpacing: "-0.032em", fontWeight: 700, color: ink, maxWidth: "24ch" }}>{hero.title}</span>
          <span style={{ fontSize: 14, lineHeight: 1.55, color: inkMuted, maxWidth: "48ch" }}>{hero.sub}</span>
          <span style={{ display: "flex", gap: 8 }}>
            <span style={{ height: 44, padding: "0 20px", borderRadius: 8, background: "#FFC935", color: "#17170F", fontSize: 14.5, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
              {hero.cta}
            </span>
            {hero.second && (
              <span style={{ height: 44, padding: "0 18px", borderRadius: 8, border: `1px solid ${ghostBorder}`, color: ink, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                Call us
              </span>
            )}
          </span>
          {trustStrip(inkMuted, ink)}
        </div>
      )}
    </div>
  );
}
