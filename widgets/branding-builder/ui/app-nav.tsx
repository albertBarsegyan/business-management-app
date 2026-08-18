import { buildNavItems } from "../lib/build-nav-items";

export function AppNav({ accent }: { accent: string }) {
  const nav = buildNavItems(accent);

  return (
    <aside style={{ width: 216, flex: "0 0 auto", background: "#14141A", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 56, flex: "0 0 auto", display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#FFC935", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-display)", fontSize: 15, fontWeight: 700, color: "#17170F" }}>
          Z
        </span>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#FFFFFF" }}>Zhamo</span>
      </div>
      <nav style={{ flex: "1 1 auto", overflowY: "auto", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map((n) => (
          <div
            key={n.label}
            className="zhamo-branding-nav-item"
            style={{ display: "flex", alignItems: "center", gap: 10, height: 34, padding: `0 8px 0 ${n.indent}`, borderRadius: 6, cursor: "pointer", position: "relative", background: n.bg, color: n.color, fontSize: n.size, fontWeight: n.weight }}
          >
            <span style={{ position: "absolute", left: -8, top: 7, bottom: 7, width: 3, borderRadius: "0 2px 2px 0", background: n.marker }} />
            {n.showTile && (
              <span style={{ width: 20, height: 20, flex: "0 0 auto", borderRadius: 5, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, background: n.tileBg, color: n.tileColor }}>
                {n.mono}
              </span>
            )}
            <span style={{ whiteSpace: "nowrap" }}>{n.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ flex: "0 0 auto", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "12px 10px 14px", display: "flex", flexDirection: "column", gap: 10, background: "#1A1A21" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ width: 28, height: 28, borderRadius: "50%", background: accent, color: "#FFFFFF", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            LS
          </span>
          <span style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#FFFFFF" }}>Lilit Sargsyan</span>
            <span style={{ fontSize: 11, color: "#7C818B" }}>Owner</span>
          </span>
        </div>
        <button style={{ height: 36, border: 0, borderRadius: 6, background: accent, color: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Administration
        </button>
      </div>
      <style>{`.zhamo-branding-nav-item:hover { background: rgba(255,255,255,0.06); }`}</style>
    </aside>
  );
}
