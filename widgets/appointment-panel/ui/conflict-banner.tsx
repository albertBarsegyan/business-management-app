import { alternatives } from "../model/appointment-panel-data";

export function ConflictBanner() {
  return (
    <div
      className="zhamo-apptpanel-conflict"
      style={{
        flex: "0 0 auto",
        margin: "12px 18px 0",
        border: "1px solid #F3C7C7",
        background: "#FFF5F5",
        borderRadius: 8,
        padding: "14px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <span style={{ width: 20, height: 20, flex: "0 0 auto", borderRadius: "50%", background: "#EF4444", color: "#FFFFFF", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        !
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "#C7302F" }}>14:30 was taken while you were typing</span>
        <span style={{ fontSize: 12.5, color: "#8A6A6A", lineHeight: 1.45 }}>
          Sona Avagyan booked it online 40 seconds ago. Nothing you entered is lost — pick a new time and save.
        </span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {alternatives.map((a) => (
            <span
              key={a.time + a.who}
              className="zhamo-apptpanel-alt"
              style={{ height: 30, padding: "0 12px", borderRadius: 6, border: `1px solid ${a.border}`, background: "#FFFFFF", fontSize: 12.5, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}
            >
              {a.time}
              <span style={{ fontWeight: 400, color: "#8A9099" }}>{a.who}</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes zhamo-apptpanel-slide-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .zhamo-apptpanel-conflict { animation: zhamo-apptpanel-slide-in 0.2s ease both; }
        .zhamo-apptpanel-alt:hover { border-color: #16161A; }
        @media (prefers-reduced-motion: reduce) { .zhamo-apptpanel-conflict { animation-duration: 0.001ms !important; } }
      `}</style>
    </div>
  );
}
