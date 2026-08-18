export function AddClientPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,26,0.42)", zIndex: 15 }} />
      <section
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 460,
          background: "#FFFFFF",
          borderLeft: "1px solid #E6E8EB",
          boxShadow: "-20px 0 60px rgba(10,10,14,0.22)",
          zIndex: 16,
          display: "flex",
          flexDirection: "column",
          animation: "zhamo-teamclients-in 0.22s ease both",
        }}
      >
        <header style={{ height: 52, flex: "0 0 auto", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", padding: "0 18px" }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.018em" }}>Add client</span>
          <span onClick={onClose} style={{ marginLeft: "auto", width: 28, height: 28, borderRadius: 6, border: "1px solid #E6E8EB", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#5B6069", cursor: "pointer" }}>
            ✕
          </span>
        </header>
        <div style={{ flex: "1 1 auto", overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Name</span>
            <input readOnly placeholder="Example: Anahit Grigoryan" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Phone</span>
              <span style={{ display: "flex", height: 32, border: "1px solid #D5D9DE", borderRadius: 6, overflow: "hidden" }}>
                <span style={{ padding: "0 8px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                  +374<span style={{ fontSize: 7, color: "#8A9099" }}>▾</span>
                </span>
                <input readOnly placeholder="77 000 000" style={{ flex: 1, minWidth: 0, border: 0, padding: "0 8px", fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, outline: "none" }} />
              </span>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Additional phone</span>
              <span style={{ display: "flex", height: 32, border: "1px solid #D5D9DE", borderRadius: 6, overflow: "hidden" }}>
                <span style={{ padding: "0 8px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                  +374<span style={{ fontSize: 7, color: "#8A9099" }}>▾</span>
                </span>
                <input readOnly placeholder="optional" style={{ flex: 1, minWidth: 0, border: 0, padding: "0 8px", fontFamily: "inherit", fontSize: 12.5, outline: "none" }} />
              </span>
            </label>
          </div>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Email</span>
            <input readOnly placeholder="optional" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Date of birth</span>
              <input readOnly placeholder="dd.mm.yyyy" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Gender</span>
              <div style={{ display: "flex", gap: 5 }}>
                <span className="zhamo-teamclients-outline-btn" style={{ height: 32, flex: 1, borderRadius: 6, border: "1px solid #D5D9DE", fontSize: 12.5, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>Female</span>
                <span className="zhamo-teamclients-outline-btn" style={{ height: 32, flex: 1, borderRadius: 6, border: "1px solid #D5D9DE", fontSize: 12.5, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>Male</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Importance class</span>
              <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 12.5, cursor: "pointer" }}>
                <span>Regular</span><span style={{ fontSize: 8, color: "#8A9099" }}>▾</span>
              </div>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Category</span>
              <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 12.5, cursor: "pointer" }}>
                <span>Colour clients</span><span style={{ fontSize: 8, color: "#8A9099" }}>▾</span>
              </div>
            </label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Card number</span>
              <input readOnly placeholder="optional" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Discount %</span>
              <input readOnly defaultValue="0" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
            </label>
          </div>
          <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 12px", border: "1px solid #E6E8EB", borderRadius: 8, background: "#FAFBFC", cursor: "pointer" }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>Disable online booking</span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>They can still be booked by staff.</span>
            </span>
            <span style={{ width: 34, height: 20, flex: "0 0 auto", borderRadius: 10, background: "#D5D9DE", position: "relative", display: "inline-block" }}>
              <span style={{ position: "absolute", top: 2, left: 2, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} />
            </span>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Note</span>
            <textarea readOnly placeholder="Anything the team should know before she sits down" style={{ minHeight: 68, padding: "8px 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13, resize: "vertical" }} />
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 12, borderTop: "1px solid #EEF0F2" }}>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>Payments</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Sold</span>
                <input readOnly defaultValue="0" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Paid</span>
                <input readOnly defaultValue="0" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
              </label>
            </div>
          </div>
        </div>
        <footer style={{ flex: "0 0 auto", height: 60, borderTop: "1px solid #E6E8EB", background: "#FAFBFC", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
          <span style={{ fontSize: 11.5, color: "#8A9099" }}>Phone is the only required field.</span>
          <button onClick={onClose} style={{ marginLeft: "auto", height: 36, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Cancel
          </button>
          <button className="zhamo-teamclients-primary-btn" style={{ height: 36, padding: "0 18px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
            Save client
          </button>
        </footer>
      </section>
      <style>{`
        @keyframes zhamo-teamclients-in { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
        .zhamo-teamclients-outline-btn:hover { border-color: #16161A; }
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
      `}</style>
    </>
  );
}
