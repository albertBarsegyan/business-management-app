import type { LandingBuilderState } from "../../model/use-landing-builder";
import { ChipRow } from "./chip-row";

export function UniversalControls({ state }: { state: LandingBuilderState }) {
  if (!state.isBody) return null;
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600 }}>This section</span>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Heading</span>
        <input
          value={state.panelHeading}
          onChange={(e) => state.setPanelHeading(e.target.value)}
          style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }}
        />
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Vertical space</span>
        <ChipRow options={state.spacingOptions} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Background</span>
        <ChipRow options={state.bgOptions} />
      </div>
      <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: "pointer" }}>
        <span style={{ fontSize: 12.5 }}>Full-bleed width</span>
        <span
          onClick={state.toggleBleed}
          style={{ width: 32, height: 19, flex: "0 0 auto", borderRadius: 10, background: state.bleedOn ? "#22C55E" : "#D5D9DE", position: "relative", display: "inline-block" }}
        >
          <span style={{ position: "absolute", top: 2, left: state.bleedOn ? 15 : 2, width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF" }} />
        </span>
      </label>
    </div>
  );
}
