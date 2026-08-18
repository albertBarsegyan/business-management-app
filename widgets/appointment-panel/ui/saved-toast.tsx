export function SavedToast() {
  return (
    <div
      className="zhamo-apptpanel-toast"
      style={{
        position: "absolute",
        top: 18,
        right: 20,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 14px",
        borderRadius: 8,
        background: "#FFFFFF",
        border: "1px solid #BBF0CE",
        boxShadow: "0 12px 32px rgba(20,20,26,0.18)",
      }}
    >
      <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#22C55E", color: "#FFFFFF", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        ✓
      </span>
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#17753C" }}>Saved</span>
        <span style={{ fontSize: 11.5, color: "#8A9099" }}>Anahit Grigoryan · today 14:30 · Karen Sahakyan</span>
      </span>
      <span style={{ fontSize: 12, color: "#2C6CF6", cursor: "pointer", marginLeft: 6 }}>Open</span>
      <style>{`
        @keyframes zhamo-apptpanel-slide { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .zhamo-apptpanel-toast { animation: zhamo-apptpanel-slide 0.24s ease both; }
        @media (prefers-reduced-motion: reduce) { .zhamo-apptpanel-toast { animation-duration: 0.001ms !important; } }
      `}</style>
    </div>
  );
}
