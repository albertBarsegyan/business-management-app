import type { TemplateContext } from "../../model/template-context";
import type { FinalCtaVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: FinalCtaVariables;
  context: TemplateContext;
}) {
  return (
    <div
      style={{
        padding: "28px 5vw",
        background: "#16161A",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-zhamo-display)",
          fontSize: 26,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        {variables.heading}
      </span>
      <span
        style={{
          marginLeft: "auto",
          height: 48,
          padding: "0 22px",
          borderRadius: 8,
          background: context.theme.accent,
          color: "#FFFFFF",
          fontSize: 14.5,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {variables.ctaLabel}
      </span>
    </div>
  );
}
