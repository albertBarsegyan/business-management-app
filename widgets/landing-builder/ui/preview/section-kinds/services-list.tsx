import type { ServiceListItem } from "../../../model/types";

export function ServicesList({
  items,
  ink,
  inkMuted,
  hairline,
  ghost,
}: {
  items: ServiceListItem[];
  ink: string;
  inkMuted: string;
  hairline: string;
  ghost: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((s) => (
        <div
          key={s.id}
          style={{
            minHeight: 52,
            padding: "11px 0",
            display: "flex",
            alignItems: "center",
            gap: 12,
            borderBottom: `1px solid ${hairline}`,
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 0,
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 500, color: ink }}>
              {s.name}
            </span>
            <span style={{ fontSize: 11.5, color: inkMuted }}>{s.meta}</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 13,
              color: ink,
            }}
          >
            {s.price}
          </span>
          <span
            style={{
              height: 34,
              padding: "0 13px",
              border: `1px solid ${ghost}`,
              borderRadius: 7,
              fontSize: 12.5,
              fontWeight: 600,
              color: ink,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Book
          </span>
        </div>
      ))}
    </div>
  );
}
