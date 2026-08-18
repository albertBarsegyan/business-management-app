import type { team } from "../../../model/data";

export function TeamGrid({
  items,
  cols,
  ratings,
  ink,
  inkMuted,
  hairline,
  ghost,
  cardBg,
  ratingColor,
}: {
  items: typeof team;
  cols: string;
  ratings: boolean;
  ink: string;
  inkMuted: string;
  hairline: string;
  ghost: string;
  cardBg: string;
  ratingColor: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      {items.map((m) => (
        <div key={m.name} style={{ border: `1px solid ${hairline}`, borderRadius: 9, padding: 12, display: "flex", flexDirection: "column", gap: 8, background: cardBg }}>
          <span style={{ width: 44, height: 44, borderRadius: "50%", background: m.photo, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-mono)", fontSize: 8.5, color: "rgba(255,255,255,0.85)" }}>
            PHOTO
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: ink }}>{m.name}</span>
            <span style={{ fontSize: 11.5, color: inkMuted }}>{m.role}</span>
            {ratings && <span style={{ fontSize: 11.5, fontWeight: 600, color: ratingColor }}>★ {m.rating}</span>}
          </span>
          <span style={{ height: 32, border: `1px solid ${ghost}`, borderRadius: 7, fontSize: 12, fontWeight: 600, color: ink, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            Book with {m.first}
          </span>
        </div>
      ))}
    </div>
  );
}
