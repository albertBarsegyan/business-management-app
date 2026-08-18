import type { CSSProperties, ReactNode } from "react";

type RailItem = {
  label: string;
  state: "done" | "active" | "upcoming";
};

export function OnboardingRail({
  railBg,
  stepNumber,
  totalColor = "#4A4E57",
  fillHeight,
  fillColor,
  items,
  countdownLabel,
  countdownColor,
  upcomingColor = "#6B7079",
  badge,
}: {
  railBg: string;
  stepNumber: string;
  totalColor?: string;
  fillHeight: number;
  fillColor: string;
  items: RailItem[];
  countdownLabel: string;
  countdownColor: string;
  upcomingColor?: string;
  badge?: ReactNode;
}) {
  return (
    <div style={{ background: railBg, padding: "28px 26px", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#FFC935", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-display)", fontSize: 15, fontWeight: 700, color: "#17170F" }}>
          Z
        </span>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
          Zhamo
        </span>
      </div>

      {badge}

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 84, lineHeight: 0.9, letterSpacing: "-0.04em", fontWeight: 700, color: "#FFFFFF" }}>
          {stepNumber}
          <span style={{ color: totalColor, fontSize: 34, letterSpacing: "-0.02em" }}>/03</span>
        </span>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ width: 2, height: 96, background: "rgba(255,255,255,0.12)", position: "relative", borderRadius: 1 }}>
            <span style={{ position: "absolute", top: 0, left: 0, width: 2, height: fillHeight, background: fillColor, borderRadius: 1 }} />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 12.5 }}>
            {items.map((item) => {
              const style: CSSProperties =
                item.state === "active"
                  ? { color: "#FFFFFF", fontWeight: 600 }
                  : item.state === "done"
                    ? { color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }
                    : { color: upcomingColor };
              return (
                <span key={item.label} style={style}>
                  {item.label}
                </span>
              );
            })}
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: countdownColor, letterSpacing: "0.08em" }}>
              {countdownLabel}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
