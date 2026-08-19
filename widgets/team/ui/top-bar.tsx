import Link from "next/link";

export function TopBar() {
  return (
    <div className="zhamo-topbar" style={{ height: 48, flex: "0 0 auto", background: "#FFFFFF", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
      <span className="zhamo-topbar-label" style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        Zhamo — management
      </span>
      <Link href="/clients" style={{ marginLeft: "auto", fontSize: 12 }}>Clients</Link>
      <Link href="/screens" style={{ fontSize: 12 }}>All screens</Link>
    </div>
  );
}
