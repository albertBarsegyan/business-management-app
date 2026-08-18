import { matches } from "../model/appointment-panel-data";

export function ClientColumn({ isEdit }: { isEdit: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Client
        </span>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Name</span>
          <input readOnly defaultValue="Anahit Grigoryan" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Phone</span>
          <span style={{ display: "flex", height: 32, border: "1px solid #D5D9DE", borderRadius: 6, overflow: "hidden" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "0 9px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 13, cursor: "pointer" }}>
              +374 <span style={{ fontSize: 8, color: "#8A9099" }}>▾</span>
            </span>
            <input readOnly defaultValue="77 214 508" style={{ flex: 1, minWidth: 0, border: 0, padding: "0 10px", fontFamily: "var(--font-zhamo-mono)", fontSize: 13, outline: "none" }} />
          </span>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Email</span>
          <input readOnly defaultValue={isEdit ? "anahit.g@mail.am" : ""} placeholder="optional" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
        </label>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, cursor: "pointer" }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid #C9CDD3", background: "#FFFFFF", flex: "0 0 auto" }} />
          Client is booking for another visitor
        </label>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "13px 16px 11px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
            Previous clients
          </span>
          <span style={{ fontSize: 11.5, color: "#8A9099" }}>{isEdit ? "linked" : "2 matches for 77 21…"}</span>
        </div>
        {matches.map((m) => (
          <div key={m.name} className="zhamo-apptpanel-match" style={{ padding: "9px 16px", borderTop: "1px solid #EEF0F2", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: m.linked ? "#FFFDF6" : "#FFFFFF" }}>
            <span style={{ width: 28, height: 28, flex: "0 0 auto", borderRadius: "50%", background: m.avatar, color: "#FFFFFF", fontSize: 10, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {m.initials}
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>{m.name}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099" }}>{m.phone}</span>
            </span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 11.5, color: "#5B6069" }}>{m.visits}</span>
              <span style={{ fontSize: 11, color: "#A9AEB6" }}>{m.last}</span>
            </span>
          </div>
        ))}
        {isEdit && (
          <div style={{ padding: "11px 16px", borderTop: "1px solid #EEF0F2", background: "#FAFBFC", display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, color: "#5B6069" }}>Anahit&apos;s card is linked. 14 visits · 96 000 ֏ lifetime.</span>
            <span style={{ fontSize: 12, color: "#2C6CF6", cursor: "pointer" }}>Open client card</span>
          </div>
        )}
      </div>
      <style>{`.zhamo-apptpanel-match:hover { background: #FAFBFC; }`}</style>
    </div>
  );
}
