import type { FaqEntry } from "../../../model/types";

export function FaqAccordion({
  items,
  ink,
  inkMuted,
  hairline,
  cardBg,
}: {
  items: FaqEntry[];
  ink: string;
  inkMuted: string;
  hairline: string;
  cardBg: string;
}) {
  return (
    <div
      style={{
        border: `1px solid ${hairline}`,
        borderRadius: 9,
        overflow: "hidden",
      }}
    >
      {items.length === 0 && (
        <div style={{ padding: "13px 14px", fontSize: 12.5, color: inkMuted }}>
          No questions added yet
        </div>
      )}
      {items.map((f) => (
        <div
          key={f.q}
          style={{
            padding: "13px 14px",
            borderBottom: `1px solid ${hairline}`,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            background: cardBg,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{ fontSize: 13, fontWeight: 600, color: ink, flex: 1 }}
            >
              {f.q}
            </span>
            <span style={{ fontSize: 11, color: inkMuted }}>{f.glyph}</span>
          </span>
          {f.open && (
            <span style={{ fontSize: 12.5, lineHeight: 1.55, color: inkMuted }}>
              {f.a}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
