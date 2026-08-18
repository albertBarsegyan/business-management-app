import type { DayKey, Duration, HourPreset, SetupStep } from "../model/types";
import { StepFooter } from "./step-footer";
import { StepFormSchedule } from "./step-form-schedule";
import { StepFormService } from "./step-form-service";
import { StepFormTeam } from "./step-form-team";

const titles: Record<Exclude<SetupStep, 4>, string> = {
  1: "Create a service",
  2: "Add team member",
  3: "Choose a work schedule",
};

const subtitles: Record<Exclude<SetupStep, 4>, string> = {
  1: "Write the name of the service and category, and set the cost and duration.",
  2: "You've just created a service. Now add the name and specialization of the team member who'll perform it.",
  3: "The schedule is created a month in advance. Working days and hours can be changed at any time in settings.",
};

export function StepContentPane({
  step,
  duration,
  onPickDuration,
  days,
  hours,
  onToggleDay,
  onPickHours,
  onBack,
  onNext,
}: {
  step: Exclude<SetupStep, 4>;
  duration: Duration;
  onPickDuration: (d: Duration) => void;
  days: Record<DayKey, boolean>;
  hours: HourPreset;
  onToggleDay: (d: DayKey) => void;
  onPickHours: (h: HourPreset) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div style={{ padding: "32px 34px 26px", display: "flex", flexDirection: "column", minHeight: 520 }}>
      <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-zhamo-display)", fontSize: 32, lineHeight: 1.05, letterSpacing: "-0.024em", fontWeight: 700 }}>
        {titles[step]}
      </h2>
      <p style={{ margin: "0 0 26px", fontSize: 13.5, lineHeight: 1.55, color: "#5B6069", maxWidth: "48ch" }}>{subtitles[step]}</p>

      {step === 1 && <StepFormService duration={duration} onPickDuration={onPickDuration} />}
      {step === 2 && <StepFormTeam />}
      {step === 3 && <StepFormSchedule days={days} hours={hours} onToggleDay={onToggleDay} onPickHours={onPickHours} />}

      <StepFooter canGoBack={step > 1} primaryLabel={step === 3 ? "Finish setup" : "Continue"} onBack={onBack} onNext={onNext} />
    </div>
  );
}
