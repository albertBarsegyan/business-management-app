import { walkthrough } from "../model/setup-data";

export function CompletionScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 620, background: "#FFFFFF", borderRadius: 10, boxShadow: "0 24px 64px rgba(10,10,14,0.4)", padding: "36px 38px 30px", display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ height: 132, borderRadius: 8, background: "#F7F8FA", border: "1px solid #E6E8EB", padding: "12px 14px", display: "grid", gridTemplateColumns: "30px 1fr 1fr 1fr", gap: 6, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-zhamo-mono)", fontSize: 8.5, color: "#A9AEB6" }}>
          <span>09:00</span>
          <span>11:00</span>
          <span>13:00</span>
          <span>15:00</span>
        </div>
        <div style={{ borderLeft: "1px solid #E6E8EB", paddingLeft: 5, display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ height: 30, borderRadius: 5, background: "#FFC935" }} />
          <span style={{ height: 20, borderRadius: 5, background: "#E4E7EB" }} />
        </div>
        <div style={{ borderLeft: "1px solid #E6E8EB", paddingLeft: 5, display: "flex", flexDirection: "column", gap: 4, paddingTop: 22 }}>
          <span style={{ height: 44, borderRadius: 5, background: "#E4E7EB" }} />
        </div>
        <div style={{ borderLeft: "1px solid #E6E8EB", paddingLeft: 5, display: "flex", flexDirection: "column", gap: 4, paddingTop: 52 }}>
          <span style={{ height: 26, borderRadius: 5, background: "#E4E7EB" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 38, lineHeight: 1.03, letterSpacing: "-0.028em", fontWeight: 700 }}>
          Your calendar can breathe.
        </h2>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#5B6069" }}>
          One service, one barber, one week of hours — enough to take a booking in the next minute.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {walkthrough.map((w) => (
          <div key={w.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ width: 22, height: 22, flex: "0 0 auto", borderRadius: 6, background: "#16161A", color: "#FFFFFF", fontFamily: "var(--font-zhamo-mono)", fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {w.n}
            </span>
            <span style={{ fontSize: 13.5, lineHeight: 1.45, color: "#16161A" }}>{w.text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 13px", borderRadius: 8, background: "#F1FCF5", border: "1px solid #BBF0CE" }}>
        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          ✓
        </span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#17753C" }}>Service, team member and schedule created</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={onRestart}
          className="zhamo-setup-primary"
          style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Schedule first client
        </button>
        <span style={{ fontSize: 12, color: "#A9AEB6", lineHeight: 1.4 }}>Trial runs to 12 September. No card needed until then.</span>
      </div>
      <style>{`.zhamo-setup-primary:hover { background: #F0B81F; }`}</style>
    </div>
  );
}
