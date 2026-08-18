import type { TimeSlot } from "../../model/slots";

export function DavitColumn({ slots }: { slots: TimeSlot[] }) {
  return (
    <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fillMorning }} />
      ))}

      <div style={{ position: "absolute", left: 4, right: 4, top: 238, height: 32, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "0 8px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)", flex: "0 0 auto" }}>12:30</span>
        <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>Aram Jr.</span>
        <span style={{ fontSize: 11.5, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>· Kids cut</span>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 272, height: 49, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "5px 8px", overflow: "hidden", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>13:00</span>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Hayk Barseghyan</div>
        <div style={{ fontSize: 11.5, color: "#5B6069" }}>Beard sculpt · 45 min · 5 000 ֏</div>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 612, height: 66, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "6px 9px", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>18:00 – 19:00</span>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>Suren Ghukasyan</div>
        <div style={{ fontSize: 11.5, color: "#5B6069" }}>Cut &amp; beard · 60 min · 9 500 ֏</div>
      </div>
    </div>
  );
}
