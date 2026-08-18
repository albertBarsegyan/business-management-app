import Link from "next/link";

export function TopBar({ empty, onToggleEmpty }: { empty: boolean; onToggleEmpty: () => void }) {
  return (
    <div style={{ height: 48, flex: "0 0 auto", background: "#FFFFFF", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
      <button
        onClick={onToggleEmpty}
        style={{ height: 30, padding: "0 12px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
      >
        {empty ? "Show client list" : "Show empty state"}
      </button>
      <span style={{ marginLeft: "auto", fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        Zhamo — management
      </span>
      <Link href="/team" style={{ fontSize: 12 }}>Team</Link>
      <Link href="/screens" style={{ fontSize: 12 }}>All screens</Link>
    </div>
  );
}
