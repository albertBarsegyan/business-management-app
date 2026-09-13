import type { LandingBuilderState } from "../../model/use-landing-builder";
import { ChipRow } from "./chip-row";

export function ThemeControls({ state }: { state: LandingBuilderState }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid #EEF0F2",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <span style={{ fontSize: 12.5, fontWeight: 600 }}>
        Theme — applies to the whole page
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Accent</span>
        <div style={{ display: "flex", gap: 6 }}>
          {state.accentSwatches.map((a) => (
            <span
              key={a.hex}
              onClick={a.onPick}
              style={{
                width: 30,
                height: 30,
                borderRadius: 7,
                background: a.hex,
                border: `2px solid ${a.border}`,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Surface</span>
        <ChipRow options={state.surfaceOptions} />
      </div>
      <span style={{ fontSize: 11, color: "#A9AEB6", lineHeight: 1.45 }}>
        Yellow stays the booking action on every surface and every section —
        that one isn&apos;t configurable.
      </span>
    </div>
  );
}
