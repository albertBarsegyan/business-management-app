import type { LandingBuilderState } from "../../model/use-landing-builder";
import { PublishChecklist } from "./publish-checklist";
import { SpecificControls } from "./specific-controls";
import { ThemeControls } from "./theme-controls";
import { UniversalControls } from "./universal-controls";

export function ConfigPanel({ state }: { state: LandingBuilderState }) {
  return (
    <div style={{ borderLeft: "1px solid #E6E8EB", background: "#FFFFFF", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "13px 16px 11px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 3, position: "sticky", top: 0, background: "#FFFFFF", zIndex: 2 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>{state.panel.kicker}</span>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 19, fontWeight: 700, letterSpacing: "-0.016em" }}>{state.panel.title}</span>
        <span style={{ fontSize: 11.5, color: "#8A9099", lineHeight: 1.45 }}>{state.panel.hint}</span>
      </div>

      <UniversalControls state={state} />
      <SpecificControls state={state} />
      <ThemeControls state={state} />
      <PublishChecklist state={state} />
    </div>
  );
}
