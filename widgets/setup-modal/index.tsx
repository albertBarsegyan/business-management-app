"use client";

import { useState } from "react";
import { dayKeys, type DayKey, type Duration, type HourPreset, type SetupStep } from "./model/types";
import { CompletionScreen } from "./ui/completion-screen";
import { SetupBackdrop } from "./ui/setup-backdrop";
import { SetupTopBar } from "./ui/setup-top-bar";
import { StepContentPane } from "./ui/step-content-pane";
import { StepPreviewPane } from "./ui/step-preview-pane";
import {useRouter} from "next/navigation";

const initialDays: Record<DayKey, boolean> = { Sun: false, Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: true };

export function SetupModalScreen() {
    const router = useRouter()
  const [step, setStep] = useState<SetupStep>(1);
  const [duration, setDuration] = useState<Duration>("1 h");
  const [days, setDays] = useState<Record<DayKey, boolean>>(initialDays);
  const [hours, setHours] = useState<HourPreset>("9:00–22:00");

  const toggleDay = (k: DayKey) => setDays((prev) => ({ ...prev, [k]: !prev[k] }));
  const next = () => setStep((s) => (Math.min(4, s + 1) as SetupStep));
  const back = () => setStep((s) => (Math.max(1, s - 1) as SetupStep));
  const start = () => router.push('/reports');


  return (
    <div style={{ minHeight: "100vh", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, background: "#E9EBEE", color: "#16161A" }}>
      <SetupTopBar step={step} onGo={setStep} />

      <div style={{ width: "100%", maxWidth: 1100, background: "#14141A", borderRadius: 12, padding: 44, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <SetupBackdrop />

        {step === 4 ? (
            <CompletionScreen onRestart={start}/>
        ) : (
            <div style={{
                position: "relative",
                width: "100%",
                maxWidth: 940,
                background: "#FFFFFF",
                borderRadius: 10,
                boxShadow: "0 24px 64px rgba(10,10,14,0.4)",
                display: "grid",
                gridTemplateColumns: "380px 1fr",
                overflow: "hidden"
            }}>
                <StepPreviewPane step={step} days={days} hours={hours}/>
                <StepContentPane
                    step={step}
                    duration={duration}
                    onPickDuration={setDuration}
                    days={days}
                    hours={hours}
                    onToggleDay={toggleDay}
                    onPickHours={setHours}
                    onBack={back}
                    onNext={next}
                />
            </div>
        )}
      </div>
    </div>
  );
}
