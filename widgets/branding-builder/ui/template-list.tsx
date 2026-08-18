import { TEMPLATE_IDS, specByTemplate, templateMeta, type TemplateId } from "../model/template-catalog";
import { buildTemplateThumb } from "../lib/template-thumbnail";

export function TemplateList({
  selectedTemplate,
  accent,
  onPick,
}: {
  selectedTemplate: TemplateId;
  accent: string;
  onPick: (id: TemplateId) => void;
}) {
  return (
    <div style={{ borderRight: "1px solid #E6E8EB", background: "#FFFFFF", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 12px", display: "flex", flexDirection: "column", gap: 4, borderBottom: "1px solid #EEF0F2", position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>Templates — 7</span>
        <span style={{ fontSize: 11.5, color: "#8A9099", lineHeight: 1.45 }}>Layout only. Your accent, logo and content carry across every switch.</span>
      </div>
      {TEMPLATE_IDS.map((id) => {
        const t = buildTemplateThumb(id, { selectedTemplate, accent });
        return (
          <div
            key={id}
            onClick={() => onPick(id)}
            className="zhamo-branding-template-row"
            style={{ padding: "12px 14px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 9, cursor: "pointer", background: t.rowBg }}
          >
            <div style={{ height: 92, borderRadius: 7, border: `1.5px solid ${t.thumbBorder}`, background: t.thumbBg, overflow: "hidden", display: "flex", flexDirection: "column", padding: 7, gap: 5 }}>
              <span style={{ height: t.thumbCover, borderRadius: 4, background: t.thumbCoverBg, flex: "0 0 auto" }} />
              <span style={{ height: 9, width: t.thumbTitleW, borderRadius: 3, background: t.thumbInk, flex: "0 0 auto" }} />
              <span style={{ display: "flex", gap: 4, flex: "1 1 auto", minHeight: 0 }}>
                {t.thumbCols.map((col, ci) => (
                  <span key={ci} style={{ flex: col.flex, display: "flex", flexDirection: "column", gap: 3 }}>
                    {col.bars.map((b, bi) => (
                      <span key={bi} style={{ height: b.h, width: b.w, borderRadius: 3, background: b.bg }} />
                    ))}
                  </span>
                ))}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{specByTemplate[id].name}</span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>{templateMeta[id].kicker}</span>
              {t.selected && (
                <span style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: "#FFC935", color: "#17170F", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  ✓
                </span>
              )}
            </div>
            <span style={{ fontSize: 11.5, color: "#5B6069", lineHeight: 1.45 }}>{templateMeta[id].bestFor}</span>
            <span style={{ fontSize: 11, color: "#A9AEB6" }}>Needs: {templateMeta[id].needs}</span>
          </div>
        );
      })}
      <style>{`.zhamo-branding-template-row:hover { background: #FAFBFC; }`}</style>
    </div>
  );
}
