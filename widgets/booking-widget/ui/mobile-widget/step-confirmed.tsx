import { bookingSummary, recoveryOptions } from "../../model/misc-data";
import type { BookingFlow } from "../../lib/use-booking-flow";

export function StepConfirmed({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
      {flow.taken && (
        <div style={{ borderRadius: 10, border: "1px solid #F3C7C7", background: "#FFF5F5", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#C7302F" }}>15:00 was just taken</span>
          <span style={{ fontSize: 12.5, color: "#8A6A6A", lineHeight: 1.45 }}>
            Someone booked it 20 seconds before you. Your services and details are still here — pick another time and
            you&apos;re done.
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {recoveryOptions.map((r) => (
              <span
                key={r.time}
                style={{
                  height: 52,
                  borderRadius: 8,
                  border: `1px solid ${r.featured ? "oklch(0.64 0.16 350)" : "#D5D9DE"}`,
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 13.5, fontWeight: 500 }}>{r.time}</span>
                <span style={{ fontSize: 10.5, color: "#8A9099" }}>{r.who}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {flow.confirmed && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              ✓
            </span>
            <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
              You&apos;re booked
            </span>
          </div>
          <div style={{ borderRadius: 10, border: "1px solid #E6E8EB", background: "#FFFFFF", overflow: "hidden" }}>
            {bookingSummary.map((row) => (
              <div key={row.k} style={{ padding: "11px 14px", borderBottom: "1px solid #F4F5F7", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: 12.5, color: "#8A9099" }}>{row.k}</span>
                <span style={{ fontSize: 13.5, fontWeight: row.weight, textAlign: "right" }}>{row.v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <button style={{ height: 48, border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, cursor: "pointer" }}>
              Add to calendar
            </button>
            <button style={{ height: 44, border: "1px solid #D5D9DE", borderRadius: 8, background: "#FFFFFF", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Get directions
            </button>
            <button style={{ height: 44, border: 0, borderRadius: 8, background: "transparent", color: "#C7302F", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Cancel booking
            </button>
          </div>
          <span style={{ fontSize: 11.5, color: "#A9AEB6", lineHeight: 1.5 }}>
            Free to cancel until 12:30 on 13 August — two hours before. After that, call the salon.
          </span>
        </div>
      )}
    </div>
  );
}
