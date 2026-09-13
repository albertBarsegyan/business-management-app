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
  serviceName,
  onChangeServiceName,
  serviceCategory,
  onChangeServiceCategory,
  servicePrice,
  onChangeServicePrice,
  currencyCode,
  duration,
  onPickDuration,
  teamMemberName,
  onChangeTeamMemberName,
  teamMemberSpecialization,
  onChangeTeamMemberSpecialization,
  days,
  hours,
  onToggleDay,
  onPickHours,
  customOpensAt,
  onChangeCustomOpensAt,
  customClosesAt,
  onChangeCustomClosesAt,
  onBack,
  onNext,
  isSubmitting,
  errorMessage,
}: {
  step: Exclude<SetupStep, 4>;
  serviceName: string;
  onChangeServiceName: (value: string) => void;
  serviceCategory: string;
  onChangeServiceCategory: (value: string) => void;
  servicePrice: string;
  onChangeServicePrice: (value: string) => void;
  currencyCode: string;
  duration: Duration;
  onPickDuration: (d: Duration) => void;
  teamMemberName: string;
  onChangeTeamMemberName: (value: string) => void;
  teamMemberSpecialization: string;
  onChangeTeamMemberSpecialization: (value: string) => void;
  days: Record<DayKey, boolean>;
  hours: HourPreset;
  onToggleDay: (d: DayKey) => void;
  onPickHours: (h: HourPreset) => void;
  customOpensAt: string;
  onChangeCustomOpensAt: (value: string) => void;
  customClosesAt: string;
  onChangeCustomClosesAt: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  errorMessage: string | null;
}) {
  return (
    <div
      style={{
        padding: "32px 34px 26px",
        display: "flex",
        flexDirection: "column",
        minHeight: 520,
      }}
    >
      <h2
        style={{
          margin: "0 0 8px",
          fontFamily: "var(--font-zhamo-display)",
          fontSize: "clamp(22px, 5vw, 32px)",
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          fontWeight: 700,
        }}
      >
        {titles[step]}
      </h2>
      <p
        style={{
          margin: "0 0 26px",
          fontSize: 13.5,
          lineHeight: 1.55,
          color: "#5B6069",
          maxWidth: "48ch",
        }}
      >
        {subtitles[step]}
      </p>

      {step === 1 && (
        <StepFormService
          name={serviceName}
          onChangeName={onChangeServiceName}
          category={serviceCategory}
          onChangeCategory={onChangeServiceCategory}
          price={servicePrice}
          onChangePrice={onChangeServicePrice}
          currencyCode={currencyCode}
          duration={duration}
          onPickDuration={onPickDuration}
        />
      )}
      {step === 2 && (
        <StepFormTeam
          name={teamMemberName}
          onChangeName={onChangeTeamMemberName}
          specialization={teamMemberSpecialization}
          onChangeSpecialization={onChangeTeamMemberSpecialization}
          serviceName={serviceName}
        />
      )}
      {step === 3 && (
        <StepFormSchedule
          days={days}
          hours={hours}
          onToggleDay={onToggleDay}
          onPickHours={onPickHours}
          customOpensAt={customOpensAt}
          onChangeCustomOpensAt={onChangeCustomOpensAt}
          customClosesAt={customClosesAt}
          onChangeCustomClosesAt={onChangeCustomClosesAt}
        />
      )}

      <StepFooter
        canGoBack={step > 1}
        primaryLabel={
          isSubmitting ? "Saving…" : step === 3 ? "Finish setup" : "Continue"
        }
        onBack={onBack}
        onNext={onNext}
        disabled={isSubmitting}
        errorMessage={errorMessage}
      />
    </div>
  );
}
