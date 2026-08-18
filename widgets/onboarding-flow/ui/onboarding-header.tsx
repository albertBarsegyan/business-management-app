import Link from "next/link";
import { ZhamoEyebrow } from "@/shared/ui/zhamo/eyebrow";

export function OnboardingHeader() {
  return (
    <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 14 }}>
      <ZhamoEyebrow color="#8A9099">
        <span>Zhamo — onboarding</span>
        <span style={{ color: "#C9CDD3" }}>/</span>
        <Link href="/screens">All screens</Link>
        <span style={{ color: "#C9CDD3" }}>/</span>
        <Link href="/design-system">System</Link>
      </ZhamoEyebrow>
      <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 60, lineHeight: 1.02, letterSpacing: "-0.028em", fontWeight: 700 }}>
        Three questions, thirty seconds.
      </h1>
      <p style={{ margin: 0, maxWidth: "68ch", fontSize: 15.5, lineHeight: 1.6, color: "#5B6069" }}>
        Every answer seeds real data. The progress indicator is a countdown rather than a
        stepper — a hairline that drains down the dark rail with the seconds left, because a
        30-second flow shouldn&apos;t be dressed up as a wizard.
      </p>
    </div>
  );
}
