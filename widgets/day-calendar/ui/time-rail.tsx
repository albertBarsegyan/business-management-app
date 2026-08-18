import type { TimeSlot } from "../model/slots";

export function TimeRail({ slots, side }: { slots: TimeSlot[]; side: "left" | "right" }) {
  return (
    <div style={side === "left" ? { borderRight: "1px solid #E6E8EB", background: "#FAFBFC" } : { background: "#FAFBFC", borderLeft: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div
          key={i}
          style={{
            height: 34,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: side === "left" ? "flex-end" : "flex-start",
            padding: side === "left" ? "2px 8px 0 0" : "2px 0 0 8px",
            borderBottom: `1px solid ${s.line}`,
          }}
        >
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: s.labelColor }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
