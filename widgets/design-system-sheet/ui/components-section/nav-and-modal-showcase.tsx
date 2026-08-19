export function NavAndModalShowcase() {
  return (
    <div className="zhamo-grid-2" style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14, alignItems: "start" }}>
      <div style={{ background: "#14141A", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B7079", padding: "4px 8px" }}>
          Sidebar nav item
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34, padding: "0 10px", borderRadius: 6, color: "#A7ADB8", fontSize: 13 }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.14)" }} />
          Clients <span style={{ marginLeft: "auto", fontSize: 11, color: "#6B7079" }}>default</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34, padding: "0 10px", borderRadius: 6, background: "rgba(255,255,255,0.07)", color: "#FFFFFF", fontSize: 13 }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.22)" }} />
          Services <span style={{ marginLeft: "auto", fontSize: 11, color: "#6B7079" }}>hover</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 34, padding: "0 10px", borderRadius: 6, background: "rgba(255,255,255,0.1)", color: "#FFFFFF", fontSize: 13, fontWeight: 600, position: "relative" }}>
          <span style={{ position: "absolute", left: 0, top: 7, bottom: 7, width: 3, borderRadius: "0 2px 2px 0", background: "oklch(0.64 0.16 350)" }} />
          <span style={{ width: 16, height: 16, borderRadius: 4, background: "oklch(0.64 0.16 350)" }} />
          Reports <span style={{ marginLeft: "auto", fontSize: 11, color: "#6B7079" }}>active</span>
        </div>
      </div>
      <div style={{ background: "rgba(22,22,26,0.5)", borderRadius: 8, padding: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 420, background: "#FFFFFF", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 22, letterSpacing: "-0.018em", fontWeight: 700 }}>
              Delete this appointment?
            </span>
            <span style={{ fontSize: 13, color: "#5B6069", lineHeight: 1.5 }}>
              Anahit Grigoryan, women&apos;s cut &amp; styling, today at 14:30. She&apos;ll get a cancellation SMS.
            </span>
          </div>
          <div style={{ padding: "14px 20px", borderTop: "1px solid #E6E8EB", background: "#FAFBFC", display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button style={{ height: 32, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Keep it
            </button>
            <button style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#EF4444", color: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Delete appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
