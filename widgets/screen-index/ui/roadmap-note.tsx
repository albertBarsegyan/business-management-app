export function RoadmapNote() {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C818B" }}>
        Still to build — prompt 6
      </span>
      <span style={{ fontSize: 14, lineHeight: 1.65, color: "#A7ADB8", maxWidth: "74ch" }}>
        Work schedule editor, services list with drag reorder, SMS templates with variable
        chips, online booking settings, reports overview, the collected empty/error/loading
        sheet, and the phone-sized back-office calendar.
      </span>
    </div>
  );
}
