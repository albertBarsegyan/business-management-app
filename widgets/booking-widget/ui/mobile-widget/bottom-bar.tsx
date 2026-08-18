import type { BookingFlow } from "../../lib/use-booking-flow";

export function BottomBar({ flow }: { flow: BookingFlow }) {
  if (!flow.showBar) return null;
  return (
    <div style={{ flex: "0 0 auto", borderTop: "1px solid #E6E8EB", background: "#FFFFFF", padding: "11px 16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em" }}>{flow.cartTotal}</span>
        <span style={{ fontSize: 11.5, color: "#8A9099" }}>{flow.cartMeta}</span>
      </span>
      <button
        onClick={flow.next}
        style={{ marginLeft: "auto", height: 48, padding: "0 22px", border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
      >
        {flow.ctaLabel}
      </button>
    </div>
  );
}
