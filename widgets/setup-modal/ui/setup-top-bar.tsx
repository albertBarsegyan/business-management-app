import Link from "next/link";
import type { SetupStep } from "../model/types";

const stepLabels: Record<SetupStep, string> = { 1: "Step 1", 2: "Step 2", 3: "Step 3", 4: "Done" };

export function SetupTopBar({ step, onGo }: { step: SetupStep; onGo: (step: SetupStep) => void }) {
  const steps: SetupStep[] = [1, 2, 3, 4];
  return (
    <div style={{ width: "100%", maxWidth: 1100, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A9099" }}>
          <span>Zhamo — forced setup</span>
          <span style={{ color: "#C9CDD3" }}>/</span>
          <Link href="/screens">All screens</Link>
        </div>
        <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 40, lineHeight: 1.03, letterSpacing: "-0.026em", fontWeight: 700 }}>
          A service, a person, a schedule.
        </h1>
        <p style={{ margin: 0, maxWidth: "60ch", fontSize: 14, lineHeight: 1.55, color: "#5B6069" }}>
          The calendar can&apos;t render without these three. No close button, no skip — but each
          step is one screen of typing, and the left pane shows the calendar assembling itself as
          you go.
        </p>
      </div>
      <div style={{ display: "flex", gap: 6, flex: "0 0 auto" }}>
        {steps.map((n) => {
          const active = step === n;
          return (
            <button
              key={n}
              onClick={() => onGo(n)}
              style={{
                height: 30,
                padding: "0 12px",
                border: `1px solid ${active ? "#16161A" : "#D5D9DE"}`,
                borderRadius: 6,
                background: active ? "#16161A" : "#FFFFFF",
                color: active ? "#FFFFFF" : "#16161A",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {stepLabels[n]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
