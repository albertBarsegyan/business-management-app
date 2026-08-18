import type { TimeSlot } from "../../model/slots";

export function KarenColumn({ slots }: { slots: TimeSlot[] }) {
  return (
    <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fill }} />
      ))}

      <div style={{ position: "absolute", left: 4, right: 4, top: 34, height: 49, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "5px 8px", overflow: "hidden", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>09:30</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Anahit Grigoryan</span>
        </div>
        <div style={{ fontSize: 11.5, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Men&apos;s cut &amp; beard trim · 45 min · 7 500 ֏
        </div>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 136, height: 32, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "0 8px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", cursor: "pointer" }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)", flex: "0 0 auto" }}>11:00</span>
        <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>Gor Hakobyan</span>
        <span style={{ fontSize: 11.5, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>· Fade &amp; wash</span>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 272, height: 66, borderRadius: 6, border: "1px dashed #C9CDD3", background: "repeating-linear-gradient(135deg, #F7F8FA 0 6px, #EFF1F4 6px 12px)", padding: "6px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#5B6069" }}>Technical break</span>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "#8A9099" }}>13:00 – 14:00 · lunch</span>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 374, height: 49, borderRadius: 6, background: "oklch(0.975 0.018 350)", border: "1px solid oklch(0.9 0.05 350)", borderLeft: "3px solid oklch(0.64 0.16 350)", padding: "5px 8px", overflow: "hidden", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "oklch(0.5 0.13 350)" }}>14:30</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Vahe Manukyan</span>
        </div>
        <div style={{ fontSize: 11.5, color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Men&apos;s cut · 45 min · 6 000 ֏</div>
      </div>

      <div style={{ position: "absolute", left: 4, right: 4, top: 544, height: 32, borderRadius: 6, border: "1px dashed #EF4444", background: "#FFF7F7", padding: "0 8px", display: "flex", alignItems: "center", gap: 6, overflow: "hidden", cursor: "pointer" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", flex: "0 0 auto" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#C7302F", textDecoration: "line-through", whiteSpace: "nowrap" }}>Narek Poghosyan</span>
        <span style={{ fontSize: 11, color: "#C7302F", opacity: 0.75, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>· no-show</span>
      </div>
    </div>
  );
}
