import { dateOptions, timeGroups } from "../model/mobile-data";
import { embedCart } from "../model/misc-data";

const ACCENT = "oklch(0.5 0.1 350)";
const ACCENT_DARK = "oklch(0.44 0.1 350)";

const dates = dateOptions.map((d) => {
  const on = d.day === "14";
  const full = d.free === "full";
  return {
    ...d,
    border: on ? "oklch(0.64 0.16 350)" : full ? "#EEF0F2" : "#D5D9DE",
    bg: on ? "oklch(0.64 0.16 350)" : full ? "#F7F8FA" : "#FFFFFF",
    color: on ? "#FFFFFF" : full ? "#C0C5CB" : "#16161A",
  };
});

const slotAppearance = (state: "free" | "gone" | "picked") => {
  const picked = state === "picked";
  const gone = state === "gone";
  return {
    border: picked ? "oklch(0.64 0.16 350)" : gone ? "#EEF0F2" : "#D5D9DE",
    bg: picked ? "oklch(0.64 0.16 350)" : gone ? "#F7F8FA" : "#FFFFFF",
    color: picked ? "#FFFFFF" : gone ? "#C0C5CB" : "#16161A",
    weight: picked ? 700 : 400,
    cursor: gone ? "not-allowed" : "pointer",
    strike: gone ? "line-through" : "none",
  };
};

const embedIndicator = [1, 2, 3, 4, 5].map((n) => ({ n, bg: n < 3 ? "oklch(0.64 0.16 350)" : n === 3 ? "#FFC935" : "#E6E8EB" }));

export function DesktopEmbed() {
  return (
    <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
        Embedded widget — 920×620 iframe on the salon&apos;s own site
      </span>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: 40, background: "#FAFBFC", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 8, padding: "0 14px" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E1E4E8" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E1E4E8" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E1E4E8" }} />
          <span style={{ marginLeft: 10, fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099" }}>studioaram.am/booking</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", minHeight: 500 }}>
          <div style={{ borderRight: "1px solid #E6E8EB", padding: 20, display: "flex", flexDirection: "column", gap: 16, background: "#FAFBFC" }}>
            <div
              style={{
                height: 74,
                borderRadius: 8,
                background: `repeating-linear-gradient(135deg, ${ACCENT} 0 8px, ${ACCENT_DARK} 8px 16px)`,
                display: "flex",
                alignItems: "flex-end",
                padding: "8px 10px",
              }}
            >
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 9, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)" }}>COVER · 1200×400</span>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>Studio Aram</span>
                <span style={{ fontSize: 12.5, color: "#5B6069" }}>12 Abovyan St, Kentron, Yerevan</span>
                <span style={{ fontSize: 12.5 }}>
                  <span style={{ color: "#8A6A05", fontWeight: 600 }}>★ 4.9</span> <span style={{ color: "#8A9099" }}>· 218 reviews · till 22:00</span>
                </span>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #E6E8EB", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>Your booking</span>
              {embedCart.map((c) => (
                <div key={c.name} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                  <span style={{ fontSize: 12.5 }}>
                    {c.name}
                    <br />
                    <span style={{ color: "#8A9099", fontSize: 11.5 }}>{c.meta}</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5 }}>{c.price}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: 10, borderTop: "1px dashed #E1E4E8" }}>
                <span style={{ fontSize: 12.5, color: "#8A9099" }}>105 min total</span>
                <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.015em" }}>19 500 ֏</span>
              </div>
            </div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {embedIndicator.map((s) => (
                  <span key={s.n} style={{ flex: 1, height: 3, borderRadius: 2, background: s.bg }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "#8A9099" }}>STEP 3/5 · DATE &amp; TIME</span>
            </div>
          </div>
          <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 30, fontWeight: 700, letterSpacing: "-0.024em" }}>Pick a time</span>
              <span style={{ fontSize: 12.5, color: "#8A9099" }}>Karen Sahakyan · 14 August, Friday</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {dates.map((d) => (
                <span
                  key={d.day}
                  style={{ minWidth: 62, padding: "9px 0", borderRadius: 9, border: `1px solid ${d.border}`, background: d.bg, color: d.color, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}
                >
                  <span style={{ fontSize: 10.5, opacity: 0.7 }}>{d.dow}</span>
                  <span style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-zhamo-display)" }}>{d.day}</span>
                  <span style={{ fontSize: 9.5, opacity: 0.75 }}>{d.free}</span>
                </span>
              ))}
            </div>
            {timeGroups.map((g) => (
              <div key={g.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A9099" }}>
                  {g.label} <span style={{ color: "#C9CDD3" }}>· {g.meta}</span>
                </span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 6 }}>
                  {g.slots.map((t) => {
                    const a = slotAppearance(t.state);
                    return (
                      <span
                        key={t.label}
                        style={{
                          height: 40,
                          borderRadius: 8,
                          border: `1px solid ${a.border}`,
                          background: a.bg,
                          color: a.color,
                          fontFamily: "var(--font-zhamo-mono)",
                          fontSize: 12.5,
                          fontWeight: a.weight,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: a.cursor,
                          textDecoration: a.strike,
                        }}
                      >
                        {t.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ height: 40, padding: "0 16px", border: "1px solid #D5D9DE", borderRadius: 8, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                Back
              </button>
              <button style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 8, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                Continue to details
              </button>
              <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#A9AEB6" }}>Powered by Zhamo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
