import type { OfferCard } from "../../../model/rendered-section";

export function OffersGrid({ items, cols }: { items: OfferCard[]; cols: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: 10 }}>
      {items.map((o) => (
        <div key={o.title} style={{ borderRadius: 9, padding: 15, background: o.bg, border: `1px solid ${o.border}`, display: "flex", flexDirection: "column", gap: 7 }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 19, letterSpacing: "-0.018em", fontWeight: 700, color: o.ink }}>{o.title}</span>
          <span style={{ fontSize: 12.5, lineHeight: 1.45, color: o.sub }}>{o.body}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 2 }}>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12, padding: "4px 8px", borderRadius: 5, background: o.codeBg, color: o.ink }}>{o.code}</span>
            <span style={{ fontSize: 11, color: o.sub }}>{o.until}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
