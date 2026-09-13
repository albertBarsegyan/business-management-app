import { COVER_A, COVER_B, type BookingFlow } from "../../lib/use-booking-flow";

export function WidgetHeader({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ flex: "0 0 auto", background: "#FFFFFF" }}>
      <div
        style={{
          height: 96,
          background: `repeating-linear-gradient(135deg, ${COVER_A} 0 8px, ${COVER_B} 8px 16px)`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "10px 14px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 9.5,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.9)",
            textTransform: "uppercase",
          }}
        >
          cover photo · 1200×400
        </span>
      </div>
      <div
        style={{
          padding: "12px 16px 10px",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            width: 46,
            height: 46,
            flex: "0 0 auto",
            marginTop: -26,
            borderRadius: 12,
            background: "#FFFFFF",
            border: "1px solid #E6E8EB",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 18,
            fontWeight: 700,
            color: "oklch(0.64 0.16 350)",
          }}
        >
          {flow.biz.initial}
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: "-0.018em",
              lineHeight: 1.1,
            }}
          >
            {flow.biz.name}
          </span>
          {flow.biz.address && (
            <span style={{ fontSize: 12, color: "#5B6069" }}>
              {flow.biz.address}
            </span>
          )}
          {flow.trustLine && (
            <span style={{ fontSize: 12, color: "#8A6A05", fontWeight: 600 }}>
              {flow.trustLine}
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          padding: "0 16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          {flow.indicator.map((s) => (
            <span
              key={s.n}
              style={{ flex: 1, height: 3, borderRadius: 2, background: s.bg }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>
            {flow.stepTitle}
          </span>
          <span
            style={{
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 10.5,
              color: "#8A9099",
            }}
          >
            STEP {flow.stepNum}/5
          </span>
        </div>
      </div>
    </div>
  );
}
