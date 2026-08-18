export function NowIndicator() {
  return (
    <div style={{ position: "absolute", left: 56, right: 56, top: 442, height: 0, zIndex: 4, pointerEvents: "none" }}>
      <span style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: "#EF4444" }} />
      <span style={{ position: "absolute", left: -46, top: -8, height: 17, padding: "0 5px", borderRadius: 4, background: "#EF4444", color: "#FFFFFF", fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, display: "inline-flex", alignItems: "center" }}>
        15:32
      </span>
    </div>
  );
}
