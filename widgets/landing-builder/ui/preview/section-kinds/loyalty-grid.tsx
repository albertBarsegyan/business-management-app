import type { LoyaltyPlan } from "../../../model/rendered-section";

export function LoyaltyGrid({
  items,
  cols,
  ink,
  inkMuted,
  cardBg,
}: {
  items: LoyaltyPlan[];
  cols: string;
  ink: string;
  inkMuted: string;
  cardBg: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 10,
      }}
    >
      {items.map((p) => (
        <div
          key={p.name}
          style={{
            border: `1px solid ${p.border}`,
            borderRadius: 10,
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: 9,
            background: cardBg,
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 600, color: inkMuted }}>
            {p.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 25,
              letterSpacing: "-0.022em",
              fontWeight: 700,
              color: ink,
            }}
          >
            {p.price}
          </span>
          {p.perks.map((perk) => (
            <span key={perk} style={{ fontSize: 12, color: inkMuted }}>
              · {perk}
            </span>
          ))}
          <span
            style={{
              marginTop: 4,
              height: 36,
              borderRadius: 7,
              background: p.ctaBg,
              color: p.ctaInk,
              fontSize: 12.5,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Choose
          </span>
        </div>
      ))}
    </div>
  );
}
