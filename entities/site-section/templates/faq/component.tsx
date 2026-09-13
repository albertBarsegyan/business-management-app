import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { FaqVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: FaqVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.items.length === 0 ? (
        <EmptyNote tokens={tokens}>No questions added yet.</EmptyNote>
      ) : (
        <div
          style={{
            border: `1px solid ${tokens.hairline}`,
            borderRadius: tokens.radius,
            overflow: "hidden",
          }}
        >
          {variables.items.map((f, i) => (
            <div
              key={i}
              style={{
                padding: 16,
                borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                background: tokens.cardBg,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span
                style={{ fontSize: 14, fontWeight: 600, color: tokens.ink }}
              >
                {f.question}
              </span>
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: tokens.inkMuted,
                }}
              >
                {f.answer}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
