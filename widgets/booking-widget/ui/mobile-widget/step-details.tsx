import { codeBoxes } from "../../model/misc-data";
import type { BookingFlow } from "../../lib/use-booking-flow";

export function StepDetails({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
      {flow.smsStep && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center", paddingTop: 18 }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Enter the code we sent
          </span>
          <span style={{ fontSize: 13, color: "#5B6069" }}>
            4-digit code to <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>+374 77 214 508</span>
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {codeBoxes.map((b, i) => (
              <span
                key={i}
                style={{
                  width: 52,
                  height: 60,
                  borderRadius: 10,
                  border: `1.5px solid ${b.filled ? "#D5D9DE" : "#2C6CF6"}`,
                  background: "#FFFFFF",
                  fontFamily: "var(--font-zhamo-mono)",
                  fontSize: 22,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {b.v}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 12.5, color: "#8A9099" }}>Resend in 0:24</span>
          <button
            onClick={flow.next}
            style={{ height: 48, width: "100%", border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            Confirm booking
          </button>
        </div>
      )}
      {flow.contactStep && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#5B6069" }}>Your name</span>
            <input readOnly defaultValue="Anahit" style={{ height: 48, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 8, fontFamily: "inherit", fontSize: 15 }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#5B6069" }}>Phone</span>
            <span style={{ display: "flex", height: 48, border: "1px solid #D5D9DE", borderRadius: 8, overflow: "hidden" }}>
              <span style={{ padding: "0 12px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontSize: 15, display: "inline-flex", alignItems: "center", gap: 6 }}>
                +374 <span style={{ fontSize: 8, color: "#8A9099" }}>▾</span>
              </span>
              <input readOnly defaultValue="77 214 508" style={{ flex: 1, minWidth: 0, border: 0, padding: "0 12px", fontFamily: "var(--font-zhamo-mono)", fontSize: 15, outline: "none" }} />
            </span>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: "#5B6069" }}>
              Comment <span style={{ color: "#A9AEB6" }}>— optional</span>
            </span>
            <textarea
              readOnly
              placeholder="Anything the master should know"
              style={{ minHeight: 74, padding: "10px 12px", border: "1px solid #D5D9DE", borderRadius: 8, fontFamily: "inherit", fontSize: 14, resize: "vertical" }}
            />
          </label>
          <span style={{ fontSize: 12, color: "#A9AEB6", lineHeight: 1.5 }}>
            No account, no password. We text you the confirmation and a reminder two hours before.
          </span>
        </div>
      )}
    </div>
  );
}
