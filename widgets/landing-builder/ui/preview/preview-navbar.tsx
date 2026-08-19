import type { LandingBuilderState } from "../../model/use-landing-builder";

export function PreviewNavbar({ state }: { state: LandingBuilderState }) {
  return (
    <div
      onClick={state.selectNavbar}
      style={{
        height: 56,
        padding: `0 ${state.gutter}`,
        background: state.navBg,
        borderBottom: `1px solid ${state.hairline}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: state.interactive ? "pointer" : "default",
        outline: state.navOutline,
        outlineOffset: -2,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: state.dark ? "#22222A" : "#FFFFFF",
            border: `1px solid ${state.dark ? "rgba(255,255,255,0.14)" : "#E6E8EB"}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 14,
            fontWeight: 700,
            color: state.accent,
          }}
        >
          A
        </span>
        {state.nav.showName && (
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 16, fontWeight: 700, letterSpacing: "-0.018em", color: state.ink }}>Studio Aram</span>
        )}
      </span>
      {state.navShowLinks && (
        <span className="zhamo-navlinks" style={{ display: "flex", gap: 14, marginLeft: 10 }}>
          {state.navLinks.map((l) => (
            <span key={l} style={{ fontSize: 12.5, color: state.inkMuted }}>
              {l}
            </span>
          ))}
        </span>
      )}
      {state.navShowBurger && (
        <span
          style={{
            marginLeft: "auto",
            width: 30,
            height: 30,
            borderRadius: 7,
            border: `1px solid ${state.ghostBorder}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: state.ink,
          }}
        >
          ☰
        </span>
      )}
      {state.navShowCta && (
        <span style={{ marginLeft: "auto", height: 34, padding: "0 14px", borderRadius: 7, background: "#FFC935", color: "#17170F", fontSize: 13, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
          {state.nav.cta}
        </span>
      )}
    </div>
  );
}
