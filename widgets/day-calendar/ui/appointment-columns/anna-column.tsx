import type { TimeSlot } from "../../model/slots";

export function AnnaColumn({ slots }: { slots: TimeSlot[] }) {
  return (
    <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fill }} />
      ))}

      <div style={{ position: "absolute", left: 4, right: 4, top: 0, height: 66, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "6px 9px", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>09:00 – 10:00</span>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Gayane Sargsyan</div>
        <div style={{ fontSize: 11.5, color: "#5B6069" }}>Gel manicure · 9 000 ֏</div>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 204, height: 134, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "6px 9px", display: "flex", flexDirection: "column", gap: 3, cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>12:00 – 14:00</span>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>Nune Baghdasaryan</span>
        <span style={{ fontSize: 11.5, color: "#5B6069" }}>
          Nail extension + design
          <br />
          120 min · 16 000 ֏
        </span>
        <span style={{ marginTop: "auto", height: 19, width: "fit-content", padding: "0 7px", borderRadius: 5, background: "#FEF6E0", color: "#8A6A05", fontSize: 10.5, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
          Pending
        </span>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 442, height: 66, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "6px 9px", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>15:30 – 16:30</span>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Arpine Ghazaryan</div>
        <div style={{ fontSize: 11.5, color: "#5B6069" }}>Classic pedicure · 11 000 ֏</div>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 748, height: 32, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "0 8px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)", flex: "0 0 auto" }}>20:00</span>
        <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>Lusine Petrosyan</span>
        <span style={{ fontSize: 11.5, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>· Express manicure</span>
      </div>
    </div>
  );
}
