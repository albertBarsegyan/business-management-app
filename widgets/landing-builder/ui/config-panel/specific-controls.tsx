import type { LandingBuilderState } from "../../model/use-landing-builder";
import { ChipRow } from "./chip-row";

export function SpecificControls({ state }: { state: LandingBuilderState }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{state.specificTitle}</span>
      {state.specificControls.map((c) => (
        <div key={c.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#5B6069" }}>{c.label}</span>
          {c.kind === "chips" && <ChipRow options={c.options} wide />}
          {c.kind === "switch" && (
            <div onClick={c.onToggle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: "pointer" }}>
              <span style={{ fontSize: 12.5, color: "#16161A" }}>{c.switchLabel}</span>
              <span style={{ width: 32, height: 19, flex: "0 0 auto", borderRadius: 10, background: c.on ? "#22C55E" : "#D5D9DE", position: "relative", display: "inline-block" }}>
                <span style={{ position: "absolute", top: 2, left: c.on ? 15 : 2, width: 15, height: 15, borderRadius: "50%", background: "#FFFFFF" }} />
              </span>
            </div>
          )}
          {c.kind === "text" && (
            <input
              value={c.value}
              onChange={(e) => c.onChange(e.target.value)}
              style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }}
            />
          )}
          {c.hint && <span style={{ fontSize: 11, color: "#A9AEB6", lineHeight: 1.45 }}>{c.hint}</span>}
        </div>
      ))}
    </div>
  );
}
