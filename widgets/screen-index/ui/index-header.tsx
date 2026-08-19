import { ZhamoEyebrow } from "@/shared/ui/zhamo/eyebrow";
import { ZhamoLogoMark } from "@/shared/ui/zhamo/logo-mark";

export function IndexHeader() {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <ZhamoEyebrow>
        <ZhamoLogoMark />
        <span>Zhamo — screen index</span>
      </ZhamoEyebrow>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-zhamo-display)",
          fontSize: "clamp(38px, 9vw, 96px)",
          lineHeight: 1.0,
          letterSpacing: "-0.032em",
          fontWeight: 700,
          maxWidth: "16ch",
        }}
      >
        Every screen, one system.
      </h1>
      <p style={{ margin: 0, maxWidth: "62ch", fontSize: 16, lineHeight: 1.6, color: "#A7ADB8" }}>
        Nine files, each a working screen you can click through. The palette, type scale and
        density come from the foundation sheet; the per-vertical accent is what stops Zhamo
        reading as a generic booking clone.
      </p>
    </header>
  );
}
