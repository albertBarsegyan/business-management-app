import { ACCENT, ACCENT_TINT, type BookingFlow } from "../../lib/use-booking-flow";

export function StepSpecialist({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        onClick={flow.pickAny}
        style={{ borderRadius: 10, border: `1.5px solid ${ACCENT}`, background: ACCENT_TINT, padding: 14, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      >
        <span style={{ width: 44, height: 44, flex: "0 0 auto", borderRadius: "50%", background: ACCENT, color: "#FFFFFF", fontSize: 15, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          ★
        </span>
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 14.5, fontWeight: 700 }}>Any specialist</span>
          <span style={{ fontSize: 12, color: "#5B6069" }}>Fastest — 9 free times today</span>
        </span>
        <span style={{ marginLeft: "auto", fontSize: 14, color: ACCENT }}>{flow.anyCheck}</span>
      </div>
      {flow.specialists.map((p) => (
        <div
          key={p.name}
          onClick={p.pick}
          style={{ borderRadius: 10, border: `1px solid ${p.border}`, background: "#FFFFFF", padding: 12, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <span
            style={{
              width: 44,
              height: 44,
              flex: "0 0 auto",
              borderRadius: "50%",
              background: "repeating-linear-gradient(135deg, #EDEFF2 0 4px, #E4E7EB 4px 8px)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 9,
              color: "#8A9099",
            }}
          >
            {p.initials}
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
            <span style={{ fontSize: 12, color: "#8A9099" }}>{p.role}</span>
          </span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <span style={{ fontSize: 12.5, color: "#8A6A05", fontWeight: 600 }}>★ {p.rating}</span>
            <span style={{ fontSize: 11, color: "#8A9099" }}>{p.free}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
