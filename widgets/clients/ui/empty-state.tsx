export function EmptyState({ onOpenPanel }: { onOpenPanel: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: "clamp(24px, 5vw, 34px)", lineHeight: 1.05, letterSpacing: "-0.022em", fontWeight: 700 }}>
        Client base
      </h1>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: "clamp(32px, 8vw, 72px) clamp(16px, 5vw, 40px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <span style={{ width: 46, height: 46, borderRadius: 12, background: "#FEF6E0", color: "#8A6A05", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-display)", fontSize: 22, fontWeight: 700 }}>
          +
        </span>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: "clamp(24px, 5.5vw, 38px)", lineHeight: 1.04, letterSpacing: "-0.026em", fontWeight: 700, maxWidth: "22ch" }}>
          Everyone who walks in lands here
        </span>
        <span style={{ fontSize: 14, color: "#5B6069", lineHeight: 1.55, maxWidth: "52ch" }}>
          Add the regulars you already know, or import last year&apos;s book from Excel. Clients who use your booking link add themselves.
        </span>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <button onClick={onOpenPanel} style={{ height: 38, padding: "0 18px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
            Add first client
          </button>
          <button className="zhamo-teamclients-outline-btn" style={{ height: 38, padding: "0 18px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
            Import from Excel
          </button>
        </div>
      </div>
      <style>{`.zhamo-teamclients-outline-btn:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
