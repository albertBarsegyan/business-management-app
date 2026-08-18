import type { reviews } from "../../../model/data";

export function ReviewQuote({ ink, inkMuted, quoteBg, accent }: { ink: string; inkMuted: string; quoteBg: string; accent: string }) {
  return (
    <div style={{ padding: 16, borderRadius: 9, background: quoteBg, borderLeft: `3px solid ${accent}`, display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 21, lineHeight: 1.25, letterSpacing: "-0.018em", fontWeight: 700, color: ink }}>
        &ldquo;Best fade in Kentron, and they always run on time.&rdquo;
      </span>
      <span style={{ fontSize: 11.5, color: inkMuted }}>Gor H. · verified visit, 29 July 2026</span>
    </div>
  );
}

export function ReviewCards({ items, ink, inkMuted, hairline, cardBg, ratingColor }: { items: typeof reviews; ink: string; inkMuted: string; hairline: string; cardBg: string; ratingColor: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
      {items.map((r) => (
        <div key={r.who} style={{ border: `1px solid ${hairline}`, borderRadius: 9, padding: 13, display: "flex", flexDirection: "column", gap: 8, background: cardBg }}>
          <span style={{ fontSize: 12, color: ratingColor, fontWeight: 600 }}>{r.stars}</span>
          <span style={{ fontSize: 12.5, lineHeight: 1.5, color: ink }}>{r.text}</span>
          <span style={{ fontSize: 11, color: inkMuted }}>{r.who}</span>
        </div>
      ))}
    </div>
  );
}
