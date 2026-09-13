import type { BookingFlow } from "../../lib/use-booking-flow";

export function StepDatetime({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          gap: 6,
          overflowX: "auto",
          background: "#FFFFFF",
          borderBottom: "1px solid #EEF0F2",
        }}
      >
        {flow.dates.map((d) => (
          <span
            key={d.day}
            onClick={d.pick}
            style={{
              minWidth: 52,
              flex: "0 0 auto",
              padding: "8px 0",
              borderRadius: 9,
              border: `1px solid ${d.border}`,
              background: d.bg,
              color: d.color,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 10.5, opacity: 0.7 }}>{d.dow}</span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-zhamo-display)",
              }}
            >
              {d.day}
            </span>
            <span style={{ fontSize: 9.5, opacity: 0.75 }}>{d.free}</span>
          </span>
        ))}
      </div>

      {flow.dayFull && (
        <div
          style={{
            padding: "26px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
            background: "#FFFFFF",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "-0.018em",
            }}
          >
            Saturday is fully booked
          </span>
          <span
            style={{
              fontSize: 13,
              color: "#5B6069",
              lineHeight: 1.5,
              maxWidth: "30ch",
            }}
          >
            Sunday 16 August has 6 free times, and Karen has a 19:30 tonight.
          </span>
          <button
            onClick={flow.pickSunday}
            style={{
              height: 44,
              padding: "0 20px",
              border: 0,
              borderRadius: 8,
              background: "#FFC935",
              color: "#17170F",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            See Sunday
          </button>
          <span style={{ fontSize: 12.5, color: "#2C6CF6", cursor: "pointer" }}>
            Join the waiting list for Saturday
          </span>
        </div>
      )}

      {flow.dayOpen && (
        <div
          style={{
            padding: "14px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {flow.timeGroups.map((g) => (
            <div
              key={g.label}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#8A9099",
                  }}
                >
                  {g.label}
                </span>
                <span style={{ fontSize: 11.5, color: "#A9AEB6" }}>
                  {g.meta}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 6,
                }}
              >
                {g.slots.map((t) => (
                  <span
                    key={t.label}
                    onClick={t.pick}
                    style={{
                      height: 44,
                      borderRadius: 8,
                      border: `1px solid ${t.border}`,
                      background: t.bg,
                      color: t.color,
                      fontFamily: "var(--font-zhamo-mono)",
                      fontSize: 13,
                      fontWeight: t.weight,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: t.cursor,
                      textDecoration: t.strike,
                    }}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
