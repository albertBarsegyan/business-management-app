import Link from "next/link";
import { ZhamoEyebrow } from "@/shared/ui/zhamo/eyebrow";
import { ZhamoLogoMark } from "@/shared/ui/zhamo/logo-mark";

export function SheetHeader() {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <ZhamoEyebrow>
        <ZhamoLogoMark />
        <span>Zhamo — foundation v1.0</span>
        <span style={{ color: "#C9CDD3" }}>/</span>
        <Link href="/screens">All screens</Link>
      </ZhamoEyebrow>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-zhamo-display)",
          fontSize: "clamp(40px, 9vw, 104px)",
          lineHeight: 1.02,
          letterSpacing: "-0.028em",
          fontWeight: 700,
          maxWidth: "15ch",
        }}
      >
        The system behind the day.
      </h1>
      <p
        style={{
          margin: 0,
          maxWidth: "62ch",
          fontSize: 17,
          lineHeight: 1.55,
          color: "#5B6069",
        }}
      >
        Zhamo is used eight hours a day at a front desk with clients waiting.
        Borders separate, not shadows. Density is a feature. The only decoration
        is the type: enormous, tight display against small, calm UI text — and
        one accent that tells you which business you are in.
      </p>
    </header>
  );
}
