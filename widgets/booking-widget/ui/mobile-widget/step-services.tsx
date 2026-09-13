import type { BookingFlow } from "../../lib/use-booking-flow";

export function StepServices({ flow }: { flow: BookingFlow }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {flow.categories.map((c) => (
        <div
          key={c.name}
          style={{ borderBottom: "1px solid #EEF0F2", background: "#FFFFFF" }}
        >
          <div
            style={{
              minHeight: 52,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>
              {c.name}
            </span>
            <span style={{ fontSize: 12, color: "#8A9099" }}>{c.count}</span>
            <span style={{ fontSize: 10, color: "#8A9099" }}>{c.glyph}</span>
          </div>
          {c.open && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {c.services.map((s) => (
                <div
                  key={s.name}
                  onClick={s.toggle}
                  style={{
                    minHeight: 62,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderTop: "1px solid #F4F5F7",
                    background: s.bg,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      flex: "0 0 auto",
                      borderRadius: 6,
                      border: `1.5px solid ${s.boxBorder}`,
                      background: s.boxBg,
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.check}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <span style={{ fontSize: 13.5, fontWeight: 500 }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: 12, color: "#8A9099" }}>
                      {s.duration}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-zhamo-mono)",
                      fontSize: 13,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
