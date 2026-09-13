import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { HoursVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: HoursVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.rows.length === 0 ? (
        <EmptyNote tokens={tokens}>Hours not set yet.</EmptyNote>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxWidth: 360,
          }}
        >
          {variables.rows.map((row, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                fontSize: 14,
              }}
            >
              <span style={{ color: tokens.inkMuted }}>{row.day}</span>
              <span
                style={{
                  fontFamily: "var(--font-zhamo-mono)",
                  color: tokens.ink,
                }}
              >
                {row.hours}
              </span>
            </span>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
