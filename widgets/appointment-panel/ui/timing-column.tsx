import { tiles } from "../model/appointment-panel-data";

export function TimingColumn({ isEdit, isConflict }: { isEdit: boolean; isConflict: boolean }) {
  const timeBorder = isConflict ? "#EF4444" : "#D5D9DE";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Timing
        </span>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Team member</span>
          <div className="zhamo-apptpanel-hoverline" style={{ height: 32, display: "flex", alignItems: "center", gap: 8, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
            <span style={{ width: 20, height: 20, borderRadius: "50%", background: "oklch(0.64 0.16 350)", color: "#FFFFFF", fontSize: 9, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              KS
            </span>
            Karen Sahakyan
            <span style={{ marginLeft: "auto", fontSize: 9, color: "#8A9099" }}>▾</span>
          </div>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Date</span>
          <div className="zhamo-apptpanel-hoverline" style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
            <span>13.08.2026 · Thursday</span>
            <span style={{ fontSize: 11, color: "#8A9099" }}>▤</span>
          </div>
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr", gap: 8 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Start</span>
            <input readOnly defaultValue="14:30" style={{ height: 32, padding: "0 8px", border: `1px solid ${timeBorder}`, borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>End</span>
            <input readOnly defaultValue="15:15" style={{ height: 32, padding: "0 8px", border: `1px solid ${timeBorder}`, borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Duration</span>
            <div style={{ height: 32, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 13, cursor: "pointer" }}>
              <span>45 min</span>
              <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
            </div>
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4, borderTop: "1px dashed #EEF0F2" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12.5, fontWeight: 500 }}>Technical break</span>
            <button className="zhamo-apptpanel-addbreak" style={{ height: 28, padding: "0 10px", border: 0, borderRadius: 6, background: "transparent", color: "#2C6CF6", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              + Add break
            </button>
          </div>
          {isEdit && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 30, padding: "0 10px", borderRadius: 6, background: "repeating-linear-gradient(135deg, #F7F8FA 0 6px, #EFF1F4 6px 12px)", border: "1px dashed #C9CDD3" }}>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#5B6069" }}>15:15 – 15:30</span>
              <span style={{ fontSize: 11.5, color: "#8A9099" }}>clean-up</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#8A9099", cursor: "pointer" }}>✕</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Pinned fields
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 11.5, color: "#5B6069" }}>Source</span>
            <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 12.5 }}>
              <span>Walk-in</span>
              <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
            </div>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 11.5, color: "#5B6069" }}>Room</span>
            <div style={{ height: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 12.5 }}>
              <span>Chair 2</span>
              <span style={{ fontSize: 9, color: "#8A9099" }}>▾</span>
            </div>
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Appointment comments</span>
          <textarea
            readOnly
            defaultValue={isEdit ? "Prefers scissors over clipper on top. Allergic to the mint shampoo." : ""}
            style={{ minHeight: 70, padding: "8px 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13, resize: "vertical", lineHeight: 1.45 }}
          />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {tiles.map((t) => (
          <div key={t.mono} className="zhamo-apptpanel-tile" style={{ aspectRatio: "1 / 1", background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 11, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: "#F3F4F6", color: "#5B6069", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {t.mono}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.25 }}>{t.label}</span>
              <span style={{ fontSize: 10.5, color: "#A9AEB6" }}>{t.meta}</span>
            </span>
          </div>
        ))}
      </div>
      <style>{`
        .zhamo-apptpanel-hoverline:hover { border-color: #16161A; }
        .zhamo-apptpanel-addbreak:hover { background: #EEF3FE; }
        .zhamo-apptpanel-tile:hover { border-color: #16161A; }
      `}</style>
    </div>
  );
}
