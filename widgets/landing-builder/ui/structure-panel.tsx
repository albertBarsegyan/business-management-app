import type { LandingBuilderState } from "../model/use-landing-builder";

export function StructurePanel({ state }: { state: LandingBuilderState }) {
  return (
    <div style={{ borderRight: "1px solid #E6E8EB", background: "#FFFFFF", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "13px 14px 11px", borderBottom: "1px solid #EEF0F2", display: "flex", alignItems: "center", gap: 8, position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>Page structure</span>
        <button
          onClick={state.applyRecommended}
          className="zhamo-landing-ghost-btn"
          style={{ marginLeft: "auto", height: 26, padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}
        >
          Recommended
        </button>
      </div>

      {state.structure.map((row) => (
        <div
          key={row.key}
          onClick={row.onSelect}
          className="zhamo-landing-structrow"
          style={{
            padding: "9px 12px",
            borderBottom: "1px solid #F4F5F7",
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            background: row.selected ? "#FFFDF6" : row.locked ? "#FAFBFC" : "#FFFFFF",
            borderLeft: `3px solid ${row.selected ? "#FFC935" : "transparent"}`,
          }}
        >
          <span style={{ color: "#C9CDD3", fontSize: 12, cursor: "grab" }}>{row.grip}</span>
          <span style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: 12.5, fontWeight: row.selected ? 600 : row.locked ? 500 : 400, color: row.locked || row.on ? "#16161A" : "#A9AEB6", whiteSpace: "nowrap" }}>{row.label}</span>
            <span style={{ fontSize: 10.5, color: "#A9AEB6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.meta}</span>
          </span>
          {row.movable && (
            <span style={{ display: "flex", flexDirection: "column", gap: 1, flex: "0 0 auto" }}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  row.onMoveUp?.();
                }}
                title="Move up"
                style={{ width: 18, height: 13, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#8A9099", background: "#F4F5F7", cursor: "pointer" }}
              >
                ▲
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  row.onMoveDown?.();
                }}
                title="Move down"
                style={{ width: 18, height: 13, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#8A9099", background: "#F4F5F7", cursor: "pointer" }}
              >
                ▼
              </span>
            </span>
          )}
          {row.locked && <span style={{ fontSize: 10, color: "#A9AEB6", flex: "0 0 auto" }}>fixed</span>}
          {row.movable && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                row.onToggle?.();
              }}
              style={{ width: 32, height: 19, flex: "0 0 auto", borderRadius: 10, background: row.on ? "#22C55E" : "#D5D9DE", position: "relative", display: "inline-block", cursor: "pointer" }}
            >
              <span style={{ position: "absolute", top: 2, left: row.on ? 15 : 2, width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF" }} />
            </span>
          )}
        </div>
      ))}

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={state.openLibrary}
          className="zhamo-landing-add-section"
          style={{ height: 36, border: "1px dashed #C9CDD3", borderRadius: 7, background: "#FAFBFC", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
        >
          + Add section
        </button>
        <span style={{ fontSize: 11, color: "#A9AEB6", lineHeight: 1.45 }}>{state.sectionBudget}</span>
      </div>
      <style>{`
        .zhamo-landing-ghost-btn:hover { border-color: #16161A; }
        .zhamo-landing-structrow:hover { background: #FAFBFC; }
        .zhamo-landing-add-section:hover { border-color: #16161A; background: #FFFFFF; }
      `}</style>
    </div>
  );
}
