import type { HoursRow } from "../../../model/types";

export function HoursBlock({
  cols,
  rows,
  showMap,
  ink,
  inkMuted,
  ghost,
  hairline,
  mapBg,
}: {
  cols: string;
  rows: HoursRow[];
  showMap: boolean;
  ink: string;
  inkMuted: string;
  ghost: string;
  hairline: string;
  mapBg: string;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: cols, gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {rows.length === 0 && (
          <span style={{ fontSize: 12.5, color: inkMuted }}>
            No hours set yet
          </span>
        )}
        {rows.map((h) => (
          <span
            key={h.d}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 12.5,
            }}
          >
            <span style={{ color: inkMuted }}>{h.d}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", color: ink }}>
              {h.t}
            </span>
          </span>
        ))}
        <span
          style={{
            height: 34,
            width: "fit-content",
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
          Get directions
        </span>
      </div>
      {showMap && (
        <span
          style={{
            minHeight: 150,
            borderRadius: 9,
            background: mapBg,
            border: `1px solid ${hairline}`,
            display: "flex",
            alignItems: "flex-end",
            padding: 9,
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 9.5,
            color: inkMuted,
          }}
        >
          MAP · pinned location
        </span>
      )}
    </div>
  );
}
