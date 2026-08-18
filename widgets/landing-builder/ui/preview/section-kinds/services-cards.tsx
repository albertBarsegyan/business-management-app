import type { services } from "../../../model/data";

export function ServicesCards({ items, cols, ink, inkMuted, hairline, cardBg }: { items: typeof services; cols: string; ink: string; inkMuted: string; hairline: string; cardBg: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {items.map((s) => (
        <div key={s.name} style={{ border: `1px solid ${hairline}`, borderRadius: 9, overflow: "hidden", background: cardBg }}>
          <span style={{ display: "block", height: 74, background: s.thumb }} />
          <span style={{ display: "flex", flexDirection: "column", gap: 3, padding: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: ink }}>{s.name}</span>
            <span style={{ fontSize: 11.5, color: inkMuted }}>{s.meta}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, color: ink }}>{s.price}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
