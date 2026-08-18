export type Stat = {
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}
        >
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A9099" }}>
            {stat.label}
          </span>
          <span style={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.01em" }}>{stat.value}</span>
          {stat.sub && (
            <span style={{ fontSize: 12, color: stat.subColor ?? "#8A9099" }}>{stat.sub}</span>
          )}
        </div>
      ))}
    </div>
  );
}
