import { ComponentsSection } from "./ui/components-section";
import { DensitySection } from "./ui/density-section";
import { PaletteSection } from "./ui/palette-section";
import { SheetHeader } from "./ui/sheet-header";
import { TypeScaleSection } from "./ui/type-scale-section";
import { VerticalsSection } from "./ui/verticals-section";
import { VoiceSection } from "./ui/voice-section";

export function DesignSystemSheet() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding:
          "clamp(32px, 8vw, 72px) clamp(16px, 5vw, 56px) clamp(56px, 12vw, 120px)",
        background: "#F5F6F8",
        color: "#16161A",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 88,
        }}
      >
        <SheetHeader />
        <PaletteSection />
        <VerticalsSection />
        <TypeScaleSection />
        <DensitySection />
        <ComponentsSection />
        <VoiceSection />
      </div>
    </div>
  );
}
