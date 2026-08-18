import Link from "next/link";
import type { ScreenKey } from "../model/nav";

const screenTabs: { key: ScreenKey; label: string }[] = [
  { key: "team", label: "Team members" },
  { key: "clients", label: "Client base" },
  { key: "empty", label: "Clients — empty" },
];

export function TopBar({ screen, onSelectScreen }: { screen: ScreenKey; onSelectScreen: (screen: ScreenKey) => void }) {
  return (
    <div style={{ height: 48, flex: "0 0 auto", background: "#FFFFFF", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 8, padding: "0 18px" }}>
      {screenTabs.map((s) => (
        <button
          key={s.key}
          onClick={() => onSelectScreen(s.key)}
          style={{
            height: 30,
            padding: "0 12px",
            border: `1px solid ${screen === s.key ? "#16161A" : "#D5D9DE"}`,
            borderRadius: 6,
            background: screen === s.key ? "#16161A" : "#FFFFFF",
            color: screen === s.key ? "#FFFFFF" : "#16161A",
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {s.label}
        </button>
      ))}
      <span style={{ marginLeft: "auto", fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        Zhamo — management
      </span>
      <Link href="/screens" style={{ fontSize: 12 }}>All screens</Link>
    </div>
  );
}
