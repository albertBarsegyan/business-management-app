import type { ReviewItem } from "../../../model/types";

export function ReviewQuote({
  items,
  ink,
  inkMuted,
  quoteBg,
  accent,
}: {
  items: ReviewItem[];
  ink: string;
  inkMuted: string;
  quoteBg: string;
  accent: string;
}) {
  const quote = items[0];
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 9,
        background: quoteBg,
        borderLeft: `3px solid ${accent}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {quote ? (
        <>
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 21,
              lineHeight: 1.25,
              letterSpacing: "-0.018em",
              fontWeight: 700,
              color: ink,
            }}
          >
            &ldquo;{quote.text}&rdquo;
          </span>
          <span style={{ fontSize: 11.5, color: inkMuted }}>{quote.who}</span>
        </>
      ) : (
        <span style={{ fontSize: 12.5, color: inkMuted }}>No reviews yet</span>
      )}
    </div>
  );
}

export function ReviewCards({
  items,
  ink,
  inkMuted,
  hairline,
  cardBg,
  ratingColor,
}: {
  items: ReviewItem[];
  ink: string;
  inkMuted: string;
  hairline: string;
  cardBg: string;
  ratingColor: string;
}) {
  if (items.length === 0) {
    return (
      <span style={{ fontSize: 12.5, color: inkMuted }}>No reviews yet</span>
    );
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}
    >
      {items.map((r) => (
        <div
          key={r.who}
          style={{
            border: `1px solid ${hairline}`,
            borderRadius: 9,
            padding: 13,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: cardBg,
          }}
        >
          <span style={{ fontSize: 12, color: ratingColor, fontWeight: 600 }}>
            {r.stars}
          </span>
          <span style={{ fontSize: 12.5, lineHeight: 1.5, color: ink }}>
            {r.text}
          </span>
          <span style={{ fontSize: 11, color: inkMuted }}>{r.who}</span>
        </div>
      ))}
    </div>
  );
}
