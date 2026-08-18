export function BeforeAfter({ pairs, hairline }: { pairs: { before: string; after: string }[]; hairline: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
      {pairs.map((p, i) => (
        <div key={i} style={{ borderRadius: 9, overflow: "hidden", border: `1px solid ${hairline}`, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <span style={{ height: 120, background: p.before, display: "flex", alignItems: "flex-end", padding: 7, fontFamily: "var(--font-zhamo-mono)", fontSize: 9, color: "rgba(255,255,255,0.85)" }}>BEFORE</span>
          <span style={{ height: 120, background: p.after, display: "flex", alignItems: "flex-end", padding: 7, fontFamily: "var(--font-zhamo-mono)", fontSize: 9, color: "rgba(255,255,255,0.85)" }}>AFTER</span>
        </div>
      ))}
    </div>
  );
}
