import { teamSkeleton } from "../model/setup-data";

export function TeamSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {teamSkeleton.map((c, i) => (
        <div
          key={i}
          style={{
            borderRadius: 8,
            border: `1px solid ${c.border}`,
            background: c.bg,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <span style={{ width: 32, height: 32, borderRadius: "50%", background: c.avatar }} />
          <span style={{ height: 8, width: "70%", borderRadius: 3, background: c.bar }} />
          <span style={{ height: 7, width: "48%", borderRadius: 3, background: c.barLight }} />
          {c.live && (
            <span style={{ position: "absolute", top: 10, right: 10, width: 18, height: 18, borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              ✓
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
