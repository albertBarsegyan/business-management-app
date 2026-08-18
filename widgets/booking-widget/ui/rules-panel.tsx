import { flowRules } from "../model/misc-data";

export function RulesPanel() {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        Rules this surface keeps
      </span>
      {flowRules.map((r) => (
        <div key={r} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
          <span style={{ width: 5, height: 5, marginTop: 7, flex: "0 0 auto", borderRadius: "50%", background: "#FFC935" }} />
          <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "#16161A" }}>{r}</span>
        </div>
      ))}
    </div>
  );
}
