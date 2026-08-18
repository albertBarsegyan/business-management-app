import type { DayKey, HourPreset, SetupStep } from "../model/types";
import { buildWeekCells } from "../model/setup-data";
import { ScheduleSkeleton } from "./schedule-skeleton";
import { ServiceSkeleton } from "./service-skeleton";
import { TeamSkeleton } from "./team-skeleton";

const previewLabels: Record<Exclude<SetupStep, 4>, string> = {
  1: "Your service list",
  2: "Your team",
  3: "Your work week",
};

export function StepPreviewPane({
  step,
  days,
  hours,
}: {
  step: Exclude<SetupStep, 4>;
  days: Record<DayKey, boolean>;
  hours: HourPreset;
}) {
  const progressWidth = `${(step / 3) * 100}%`;

  return (
    <div style={{ background: "#F7F8FA", borderRight: "1px solid #E6E8EB", padding: "28px 26px 20px", display: "flex", flexDirection: "column", gap: 20, minHeight: 520 }}>
      <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
        {previewLabels[step]}
      </span>

      {step === 1 && <ServiceSkeleton />}
      {step === 2 && <TeamSkeleton />}
      {step === 3 && <ScheduleSkeleton weekCells={buildWeekCells(days, hours)} />}

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ height: 4, borderRadius: 2, background: "#E1E4E8", overflow: "hidden" }}>
          <span style={{ display: "block", height: 4, borderRadius: 2, background: "#FFC935", width: progressWidth }} />
        </span>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, letterSpacing: "0.08em", color: "#8A9099" }}>
          STEP {step} OF 3
        </span>
      </div>
    </div>
  );
}
