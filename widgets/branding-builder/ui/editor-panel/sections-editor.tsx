import type { BrandingSections } from "../../lib/build-view-model";

const rows: { key: keyof BrandingSections; label: string; locked?: boolean }[] = [
  { key: "about", label: "Cover & name", locked: true },
  { key: "services", label: "Services" },
  { key: "team", label: "Team" },
  { key: "reviews", label: "Reviews" },
  { key: "gallery", label: "Gallery" },
  { key: "hours", label: "Hours, address & map" },
];

export function SectionsEditor({
  sections,
  onToggle,
}: {
  sections: BrandingSections;
  onToggle: (key: keyof BrandingSections) => void;
}) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 9 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12.5, fontWeight: 600 }}>Sections</span>
        <span style={{ fontSize: 11, color: "#A9AEB6" }}>drag to reorder</span>
      </div>
      {rows.map((row) => {
        const on = row.locked ? true : sections[row.key];
        return (
          <div
            key={row.key}
            className="zhamo-branding-section-row"
            style={{ height: 38, padding: "0 10px", border: "1px solid #E6E8EB", borderRadius: 7, display: "flex", alignItems: "center", gap: 9, background: on ? "#FFFFFF" : "#FAFBFC" }}
          >
            <span style={{ color: "#C9CDD3", fontSize: 12, cursor: "grab" }}>⠿</span>
            <span style={{ fontSize: 12.5, color: on ? "#16161A" : "#A9AEB6" }}>{row.label}</span>
            {row.locked && <span style={{ fontSize: 10.5, color: "#A9AEB6" }}>required</span>}
            <span
              onClick={() => !row.locked && onToggle(row.key)}
              style={{ marginLeft: "auto", width: 32, height: 19, flex: "0 0 auto", borderRadius: 10, background: on ? "#22C55E" : "#D5D9DE", position: "relative", display: "inline-block", cursor: "pointer" }}
            >
              <span style={{ position: "absolute", top: 2, left: on ? 15 : 2, width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF" }} />
            </span>
          </div>
        );
      })}
      <style>{`.zhamo-branding-section-row:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
