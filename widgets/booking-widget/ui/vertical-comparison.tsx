import { verticalDemos } from "../model/vertical-demos-data";

export function VerticalComparison() {
  return (
    <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
        Same step 1, two verticals — accent, copy and grouping shift; layout doesn&apos;t
      </span>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {verticalDemos.map((v) => (
          <div key={v.name} style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ height: 76, background: `repeating-linear-gradient(135deg, ${v.coverA} 0 8px, ${v.coverB} 8px 16px)` }} />
            <div style={{ padding: "12px 16px 14px", display: "flex", gap: 12, alignItems: "flex-start", borderBottom: "1px solid #EEF0F2" }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  flex: "0 0 auto",
                  marginTop: -24,
                  borderRadius: 12,
                  background: "#FFFFFF",
                  border: "1px solid #E6E8EB",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-zhamo-display)",
                  fontSize: 17,
                  fontWeight: 700,
                  color: v.accent,
                }}
              >
                {v.initial}
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.018em" }}>{v.name}</span>
                <span style={{ fontSize: 12, color: "#5B6069" }}>{v.meta}</span>
              </span>
              <span style={{ marginLeft: "auto", height: 22, padding: "0 9px", borderRadius: 6, background: v.tint, color: v.accentDeep, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
                {v.vertical}
              </span>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{v.prompt}</span>
              {v.items.map((i) => (
                <div
                  key={i.name}
                  style={{
                    minHeight: 54,
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: `1px solid ${i.checked ? v.accent : "#E6E8EB"}`,
                    background: i.checked ? "#FAFBFC" : "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    gap: 11,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      flex: "0 0 auto",
                      borderRadius: 6,
                      border: `1.5px solid ${i.checked ? v.accent : "#C9CDD3"}`,
                      background: i.checked ? v.accent : "#FFFFFF",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i.checked ? "✓" : ""}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{i.name}</span>
                    <span style={{ fontSize: 11.5, color: "#8A9099" }}>{i.meta}</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5 }}>{i.price}</span>
                </div>
              ))}
              <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em" }}>{v.total}</span>
                <button style={{ marginLeft: "auto", height: 40, padding: "0 18px", border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                  {v.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
