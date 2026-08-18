import type { TimeSlot } from "../../model/slots";

export function MariamColumn({ slots }: { slots: TimeSlot[] }) {
  return (
    <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fillLate }} />
      ))}

      <div style={{ position: "absolute", left: 4, right: 4, top: 68, height: 202, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "7px 9px", display: "flex", flexDirection: "column", gap: 4, cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>10:00 – 13:00</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Sona Avagyan</span>
        <span style={{ fontSize: 11.5, color: "#5B6069", lineHeight: 1.4 }}>
          Balayage + toning + blow-dry
          <br />
          180 min · 42 000 ֏
        </span>
        <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ height: 19, padding: "0 7px", borderRadius: 5, background: "#E7F8EE", color: "#17753C", fontSize: 10.5, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>Arrived</span>
          <span style={{ height: 19, padding: "0 7px", borderRadius: 5, background: "#FFFFFF", border: "1px solid #E6E8EB", color: "#5B6069", fontSize: 10.5, display: "inline-flex", alignItems: "center" }}>Prepaid 15 000 ֏</span>
        </span>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 340, height: 100, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "6px 9px", display: "flex", flexDirection: "column", gap: 3, cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>14:00 – 15:30</span>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>Mane Hovhannisyan</span>
        <span style={{ fontSize: 11.5, color: "#5B6069" }}>Root touch-up · 90 min · 18 000 ֏</span>
      </div>

      <div style={{ position: "absolute", left: 4, width: "52%", top: 476, height: 66, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.88 0.06 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "5px 7px", overflow: "hidden", zIndex: 1, cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, color: "oklch(0.5 0.13 350)" }}>16:00</span>
        <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Elen Karapetyan</div>
        <div style={{ fontSize: 11, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Toning · 60 min</div>
      </div>

      <div style={{ position: "absolute", right: 4, width: "52%", top: 510, height: 49, borderRadius: 6, background: "#FFFFFF", border: "1px solid oklch(0.82 0.09 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", boxShadow: "-3px 0 0 rgba(255,255,255,0.9)", padding: "5px 7px", overflow: "hidden", zIndex: 2, cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, color: "oklch(0.5 0.13 350)" }}>16:30</span>
        <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Ani Melkonyan</div>
        <div style={{ fontSize: 11, color: "#C7302F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Overlaps · 45 min</div>
      </div>
    </div>
  );
}
