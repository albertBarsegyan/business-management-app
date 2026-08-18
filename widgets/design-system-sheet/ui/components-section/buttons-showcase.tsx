export function ButtonsShowcase() {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
        Buttons — 32px default, 40px on primary page actions
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button className="zhamo-btn-primary" style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Save changes
        </button>
        <button className="zhamo-btn-outline" style={{ height: 32, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", color: "#16161A", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Cancel
        </button>
        <button className="zhamo-btn-ghost" style={{ height: 32, padding: "0 12px", border: 0, borderRadius: 6, background: "transparent", color: "#2C6CF6", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Add break
        </button>
        <button className="zhamo-btn-danger" style={{ height: 32, padding: "0 14px", border: "1px solid #F3C7C7", borderRadius: 6, background: "#FFF5F5", color: "#C7302F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Delete appointment
        </button>
        <button disabled style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#EDEFF2", color: "#A9AEB6", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
          Save changes
        </button>
        <button style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, outline: "2px solid #2C6CF6", outlineOffset: 2 }}>
          Focus visible
        </button>
      </div>
      <style>{`
        .zhamo-btn-primary:hover { background: #F0B81F; }
        .zhamo-btn-primary:active { background: #E0A912; }
        .zhamo-btn-outline:hover { border-color: #16161A; }
        .zhamo-btn-ghost:hover { background: #EEF3FE; }
        .zhamo-btn-danger:hover { background: #FFEAEA; }
      `}</style>
    </div>
  );
}
