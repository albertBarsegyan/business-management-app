import { backdropCols } from "../model/appointment-panel-data";

export function DimmedCalendarBackdrop() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "14px 16px",
          display: "grid",
          gridTemplateColumns: "56px repeat(4, 1fr)",
          gap: 0,
          background: "#FFFFFF",
        }}
      >
        <div style={{ borderRight: "1px solid #E6E8EB" }} />
        {backdropCols.map((c, i) => (
          <div key={i} style={{ borderRight: "1px solid #E6E8EB", padding: "0 4px", display: "flex", flexDirection: "column", gap: 4 }}>
            {c.blocks.map((b, j) => (
              <span
                key={j}
                style={{ height: b.h, marginTop: b.gap, borderRadius: 6, background: "#F3F4F6", borderLeft: "3px solid #E1E4E8" }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,26,0.42)" }} />
    </>
  );
}
