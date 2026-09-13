import { weekHeads } from "../model/setup-data";

type WeekCell = { label: string; bg: string; border: string; color: string };

export function ScheduleSkeleton({ weekCells }: { weekCells: WeekCell[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {weekHeads.map((d, i) => (
          <span
            key={i}
            style={{
              textAlign: "center",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 9.5,
              color: "#A9AEB6",
            }}
          >
            {d}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
        }}
      >
        {weekCells.map((c, i) => (
          <span
            key={i}
            style={{
              height: 30,
              borderRadius: 5,
              background: c.bg,
              border: `1px solid ${c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 9,
              color: c.color,
            }}
          >
            {c.label}
          </span>
        ))}
      </div>
      <span
        style={{
          marginTop: 6,
          fontSize: 11.5,
          color: "#8A9099",
          lineHeight: 1.45,
        }}
      >
        Four weeks generated ahead. Grey days are closed.
      </span>
    </div>
  );
}
