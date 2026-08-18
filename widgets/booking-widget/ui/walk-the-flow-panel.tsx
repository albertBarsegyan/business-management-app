import type { BookingFlow } from "../lib/use-booking-flow";

export function WalkTheFlowPanel({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        Walk the flow
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {flow.jumps.map((j) => (
          <button
            key={j.key}
            onClick={j.go}
            style={{ height: 30, padding: "0 11px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", color: "#16161A", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            {j.label}
          </button>
        ))}
      </div>
      <span style={{ fontSize: 12.5, color: "#5B6069", lineHeight: 1.55 }}>
        Every state in the brief is reachable here: limited availability on Friday, a fully-booked Saturday, the SMS
        code, and the slot-stolen recovery that offers three nearby times instead of restarting.
      </span>
    </div>
  );
}
