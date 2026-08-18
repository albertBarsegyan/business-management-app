import type { services } from "../../../model/data";

export function ServicesTable({ items, ink, inkMuted, hairline, ghost, cardBg }: { items: typeof services; ink: string; inkMuted: string; hairline: string; ghost: string; cardBg: string }) {
  return (
    <div style={{ border: `1px solid ${hairline}`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 88px 104px 76px", height: 32, alignItems: "center", padding: "0 12px", gap: 8, background: cardBg, fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: inkMuted }}>
        <span>Service</span>
        <span>Duration</span>
        <span>Price</span>
        <span />
      </div>
      {items.map((s) => (
        <div key={s.name} style={{ display: "grid", gridTemplateColumns: "1fr 88px 104px 76px", minHeight: 42, alignItems: "center", padding: "0 12px", gap: 8, borderTop: `1px solid ${hairline}`, fontSize: 12.5, color: ink }}>
          <span>{s.name}</span>
          <span style={{ color: inkMuted }}>{s.duration}</span>
          <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>{s.price}</span>
          <span style={{ justifySelf: "end", height: 28, padding: "0 11px", border: `1px solid ${ghost}`, borderRadius: 6, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>Book</span>
        </div>
      ))}
    </div>
  );
}
