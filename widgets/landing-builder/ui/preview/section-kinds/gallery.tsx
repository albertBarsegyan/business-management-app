export function GalleryGrid({ items, cols }: { items: { bg: string; label: string }[]; cols: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 6 }}>
      {items.map((g, i) => (
        <span key={i} style={{ aspectRatio: "1 / 1", borderRadius: 7, background: g.bg, display: "flex", alignItems: "flex-end", padding: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 8.5, color: "rgba(255,255,255,0.8)" }}>
          {g.label}
        </span>
      ))}
    </div>
  );
}

export function GalleryStrip({ items }: { items: { bg: string; label: string }[] }) {
  return (
    <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
      {items.map((g, i) => (
        <span key={i} style={{ width: 128, height: 96, flex: "0 0 auto", borderRadius: 7, background: g.bg }} />
      ))}
    </div>
  );
}
