import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  label: string;
  width?: string;
  align?: "left" | "right";
  render: (row: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
}) {
  const template = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
      {caption && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #EEF0F2", fontSize: 13, fontWeight: 600 }}>
          {caption}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: template,
          height: 34,
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
          background: "#FAFBFC",
          borderBottom: "1px solid #E6E8EB",
          fontFamily: "var(--font-zhamo-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8A9099",
        }}
      >
        {columns.map((c) => (
          <span key={c.label} style={{ textAlign: c.align ?? "left" }}>
            {c.label}
          </span>
        ))}
      </div>

      {rows.map((row) => (
        <div
          key={rowKey(row)}
          style={{
            display: "grid",
            gridTemplateColumns: template,
            minHeight: 46,
            alignItems: "center",
            padding: "6px 16px",
            gap: 12,
            borderBottom: "1px solid #EEF0F2",
            fontSize: 13,
          }}
        >
          {columns.map((c) => (
            <span key={c.label} style={{ textAlign: c.align ?? "left", minWidth: 0 }}>
              {c.render(row)}
            </span>
          ))}
        </div>
      ))}

      {rows.length === 0 && (
        <div style={{ padding: "24px 16px", textAlign: "center", fontSize: 13, color: "#8A9099" }}>
          Nothing here yet.
        </div>
      )}
    </div>
  );
}
