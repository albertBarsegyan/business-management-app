import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { LoyaltyVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: LoyaltyVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.plans.length === 0 ? (
        <EmptyNote tokens={tokens}>No membership plans yet.</EmptyNote>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${variables.plans.length}, 1fr)`,
            gap: 16,
          }}
        >
          {variables.plans.map((p, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${tokens.hairline}`,
                borderRadius: tokens.radius,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                background: tokens.cardBg,
              }}
            >
              <span style={{ fontSize: 13, color: tokens.inkMuted }}>
                {p.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-zhamo-display)",
                  fontSize: 28,
                  fontWeight: 700,
                  color: tokens.ink,
                }}
              >
                {p.price}
              </span>
              {p.perksText
                .split("\n")
                .filter(Boolean)
                .map((perk, j) => (
                  <span
                    key={j}
                    style={{ fontSize: 13, color: tokens.inkMuted }}
                  >
                    · {perk}
                  </span>
                ))}
              <span
                style={{
                  marginTop: 8,
                  height: 40,
                  borderRadius: 7,
                  background: context.theme.accent,
                  color: "#FFFFFF",
                  fontSize: 13.5,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Choose
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
