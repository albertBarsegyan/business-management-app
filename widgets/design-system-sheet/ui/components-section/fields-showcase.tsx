export function FieldsShowcase() {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
        Fields — 32px height
      </span>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Client name</span>
        <input
          readOnly
          defaultValue="Anahit Grigoryan"
          style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13, color: "#16161A", background: "#FFFFFF" }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Phone</span>
        <div style={{ display: "flex", height: 32, border: "1px solid #2C6CF6", borderRadius: 6, boxShadow: "0 0 0 3px rgba(44,108,246,0.14)", overflow: "hidden" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 9px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 13, color: "#16161A" }}>
            +374
          </span>
          <input readOnly defaultValue="77 214 508" style={{ flex: 1, border: 0, padding: "0 10px", fontFamily: "inherit", fontSize: 13, outline: "none" }} />
        </div>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Price</span>
        <div style={{ display: "flex", height: 32, border: "1px solid #EF4444", borderRadius: 6, overflow: "hidden" }}>
          <input readOnly placeholder="0" style={{ flex: 1, border: 0, padding: "0 10px", fontFamily: "inherit", fontSize: 13, outline: "none" }} />
          <span style={{ display: "inline-flex", alignItems: "center", padding: "0 10px", borderLeft: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 13, color: "#5B6069" }}>֏</span>
        </div>
        <span style={{ fontSize: 11, color: "#C7302F" }}>Enter a price, or mark the service as free.</span>
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#A9AEB6" }}>Industry</span>
        <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #E6E8EB", borderRadius: 6, background: "#F7F8FA", fontSize: 13, color: "#A9AEB6" }}>
          <span>Pick a business type first</span>
          <span>⌄</span>
        </div>
      </label>
    </div>
  );
}
