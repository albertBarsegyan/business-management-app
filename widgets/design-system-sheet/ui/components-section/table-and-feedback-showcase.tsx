const tableRows = [
  { name: "Karen Sahakyan", role: "· Barber", initials: "KS", avatarBg: "oklch(0.64 0.16 350)", schedule: "until 06.09.2026", schedColor: "#17753C", services: "12", bg: "#FFFFFF" },
  { name: "Mariam Petrosyan", role: "· Colourist", initials: "MP", avatarBg: "oklch(0.64 0.16 285)", schedule: "until 06.09.2026", schedColor: "#17753C", services: "9", bg: "#FAFBFC" },
  { name: "Tigran Avetisyan", role: "· No position", initials: "TA", avatarBg: "#8A9099", schedule: "Add to schedule", schedColor: "#2C6CF6", services: "0", bg: "#FFFFFF" },
];

export function TableAndFeedbackShowcase() {
  return (
    <div className="zhamo-grid-2" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, alignItems: "start" }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
            Table rows — 40px
          </span>
          <span style={{ fontSize: 12, color: "#8A9099" }}>Found: 3</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr", padding: "0 16px", height: 34, alignItems: "center", background: "#FAFBFC", borderBottom: "1px solid #E6E8EB", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#8A9099" }}>
          <span>Team member</span>
          <span>Schedule</span>
          <span>Services</span>
        </div>
        {tableRows.map((r) => (
          <div key={r.name} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr", padding: "0 16px", height: 40, alignItems: "center", borderBottom: "1px solid #EEF0F2", fontSize: 13, background: r.bg }}>
            <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: r.avatarBg, color: "#FFFFFF", fontSize: 10, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {r.initials}
              </span>
              {r.name}
              <span style={{ color: "#8A9099", fontSize: 12 }}>{r.role}</span>
            </span>
            <span style={{ color: r.schedColor, fontSize: 12 }}>{r.schedule}</span>
            <span style={{ color: "#5B6069" }}>{r.services}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ borderRadius: 8, border: "1px solid #BBF0CE", background: "#F1FCF5", padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            ✓
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#17753C" }}>Appointment saved</span>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#8A9099", cursor: "pointer" }}>Undo</span>
        </div>
        <div style={{ borderRadius: 8, border: "1px solid #F3C7C7", background: "#FFF5F5", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#C7302F" }}>Couldn&apos;t save — the slot was taken</span>
          <span style={{ fontSize: 12, color: "#8A6A6A" }}>Karen Sahakyan took 14:30. Nearest free: 15:00.</span>
        </div>
        <div style={{ border: "1px dashed #D5D9DE", borderRadius: 8, background: "#FFFFFF", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, background: "#FEF6E0", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, color: "#8A6A05" }}>
            +
          </span>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, letterSpacing: "-0.015em", fontWeight: 700 }}>
            Your first client goes here
          </span>
          <span style={{ fontSize: 12.5, color: "#5B6069", maxWidth: "30ch", lineHeight: 1.5 }}>
            Click any free slot in the calendar, or add someone from the waiting list.
          </span>
          <button style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Schedule first client
          </button>
        </div>
      </div>
    </div>
  );
}
