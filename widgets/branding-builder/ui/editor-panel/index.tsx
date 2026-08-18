import type { BrandingSections, BrandingViewModel } from "../../lib/build-view-model";
import { BookingRulesAndChecks } from "./booking-rules-and-checks";
import { BrandEditor } from "./brand-editor";
import { SectionsEditor } from "./sections-editor";

export function EditorPanel({
  vals,
  onPickAccent,
  onToggleSection,
}: {
  vals: BrandingViewModel;
  onPickAccent: (hex: string) => void;
  onToggleSection: (key: keyof BrandingSections) => void;
}) {
  return (
    <div style={{ borderLeft: "1px solid #E6E8EB", background: "#FFFFFF", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 3, position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Editing — {vals.templateName}
        </span>
        <span style={{ fontSize: 11.5, color: "#8A9099" }}>{vals.templateHero}</span>
      </div>

      <BrandEditor coverBg={vals.coverBg} accent={vals.accent} onPickAccent={onPickAccent} />
      <SectionsEditor sections={vals.sections} onToggle={onToggleSection} />
      <BookingRulesAndChecks vals={vals} />
    </div>
  );
}
