export function InstagramGrid({
  items,
  inkMuted,
}: {
  items: { bg: string; label: string }[];
  inkMuted: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <span style={{ fontSize: 12.5, color: inkMuted }}>
        No Instagram account connected yet
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 5,
        }}
      >
        {items.map((g, i) => (
          <span
            key={i}
            style={{ aspectRatio: "1 / 1", borderRadius: 6, background: g.bg }}
          />
        ))}
      </div>
    </div>
  );
}
