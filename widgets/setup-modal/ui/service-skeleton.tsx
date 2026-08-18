import { serviceSkeleton } from "../model/setup-data";

export function ServiceSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {serviceSkeleton.map((row, i) => (
        <div
          key={i}
          style={{
            height: 46,
            borderRadius: 7,
            border: `1px solid ${row.border}`,
            background: row.bg,
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ width: 26, height: 26, borderRadius: 6, background: row.tile }} />
          <span style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <span style={{ height: 8, width: row.w1, borderRadius: 3, background: row.bar }} />
            <span style={{ height: 7, width: row.w2, borderRadius: 3, background: row.barLight }} />
          </span>
          {row.live && <span style={{ fontSize: 11.5, fontWeight: 600, color: "#16161A", whiteSpace: "nowrap" }}>{row.text}</span>}
        </div>
      ))}
    </div>
  );
}
