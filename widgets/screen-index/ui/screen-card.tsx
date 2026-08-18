import Link from "next/link";
import type { ScreenCard } from "../model/screens";

export function ScreenCardTile({ c }: { c: ScreenCard }) {
  return (
    <Link
      href={c.href}
      className="zhamo-screen-card"
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#1A1A21",
        minHeight: 190,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            background: c.tile,
            color: c.tileText,
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 11,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {c.n}
        </span>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7C818B" }}>
          {c.kicker}
        </span>
      </div>
      <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 27, lineHeight: 1.05, letterSpacing: "-0.022em", fontWeight: 700 }}>
        {c.title}
      </span>
      <span style={{ fontSize: 13, lineHeight: 1.5, color: "#A7ADB8" }}>{c.body}</span>
      <span style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 5 }}>
        {c.states.map((s) => (
          <span key={s} style={{ height: 21, padding: "0 8px", borderRadius: 5, background: "rgba(255,255,255,0.07)", color: "#C6CAD1", fontSize: 10.5, display: "inline-flex", alignItems: "center" }}>
            {s}
          </span>
        ))}
      </span>
      <style>{`
        .zhamo-screen-card:hover { border-color: #FFC935; background: #1E1E26; }
      `}</style>
    </Link>
  );
}
