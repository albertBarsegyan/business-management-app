import { OnboardingHeader } from "./ui/onboarding-header";
import { StepAboutYou } from "./ui/step-about-you";
import { StepLocation } from "./ui/step-location";
import { StepPositionSelect } from "./ui/step-position-select";
import { StepYourBusiness } from "./ui/step-your-business";

export function OnboardingFlow() {
  return (
    <div style={{ padding: "56px 40px 96px", display: "flex", flexDirection: "column", alignItems: "center", gap: 56, background: "#EDEFF2", color: "#16161A", minHeight: "100vh" }}>
      <OnboardingHeader />
      <StepAboutYou />
      <StepPositionSelect />
      <StepYourBusiness />
      <StepLocation />
    </div>
  );
}
