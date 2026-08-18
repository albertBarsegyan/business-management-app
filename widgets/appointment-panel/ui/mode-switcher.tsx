import type { PanelMode } from "../model/types";

const modeOptions: { key: PanelMode; label: string }[] = [
  { key: "new", label: "New appointment" },
  { key: "edit", label: "Edit mode" },
  { key: "conflict", label: "Conflict" },
];

export function ModeSwitcher({
  mode,
  onSelect,
}: {
  mode: PanelMode;
  onSelect: (mode: PanelMode) => void;
}) {
  return (
    <div style={{ position: "absolute", top: 18, left: 20, display: "flex", gap: 6, zIndex: 5 }}>
      {modeOptions.map((m) => {
        const on = mode === m.key;
        return (
          <button
            key={m.key}
            onClick={() => onSelect(m.key)}
            style={{
              height: 30,
              padding: "0 12px",
              border: `1px solid ${on ? "#FFC935" : "rgba(255,255,255,0.3)"}`,
              borderRadius: 6,
              background: on ? "#FFC935" : "rgba(255,255,255,0.12)",
              color: on ? "#17170F" : "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
