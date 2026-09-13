import type { AppointmentPanelState } from "../model/use-appointment-panel";

export function PanelHeader({ state }: { state: AppointmentPanelState }) {
  return (
    <header
      style={{
        height: 52,
        flex: "0 0 auto",
        background: "#FFFFFF",
        borderBottom: "1px solid #E6E8EB",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 18px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-zhamo-display)",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.018em",
        }}
      >
        {state.headerTitle}
      </span>
      <span style={{ fontSize: 12.5, color: "#8A9099" }}>
        {state.headerMeta}
      </span>
      {state.recordLabel && (
        <span
          style={{
            height: 22,
            padding: "0 9px",
            borderRadius: 6,
            background: "#EEF3FE",
            color: "#1B4FCB",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {state.recordLabel}
        </span>
      )}
      <span
        onClick={state.onClose}
        style={{
          marginLeft: "auto",
          width: 28,
          height: 28,
          borderRadius: 6,
          border: "1px solid #E6E8EB",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "#5B6069",
          cursor: "pointer",
        }}
      >
        ✕
      </span>
    </header>
  );
}
