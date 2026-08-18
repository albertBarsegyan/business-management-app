import { backdropCols } from "../model/setup-data";

export function SetupBackdrop() {
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.16, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, padding: 12 }}>
      {backdropCols.map((c, i) => (
        <span key={i} style={{ borderLeft: "1px solid #FFFFFF", display: "flex", flexDirection: "column", gap: 1, paddingLeft: 3 }}>
          {c.cells.map((cell, j) => (
            <span key={j} style={{ height: 22, borderRadius: 3, background: cell }} />
          ))}
        </span>
      ))}
    </div>
  );
}
