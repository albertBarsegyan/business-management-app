import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { OffersVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: OffersVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.items.length === 0 ? (
        <EmptyNote tokens={tokens}>No active offers.</EmptyNote>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {variables.items.map((o, i) => (
            <div
              key={i}
              style={{
                borderRadius: tokens.radius,
                padding: 18,
                border: `1px solid ${tokens.hairline}`,
                background: tokens.cardBg,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{ fontSize: 18, fontWeight: 700, color: tokens.ink }}
              >
                {o.title}
              </span>
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: tokens.inkMuted,
                }}
              >
                {o.body}
              </span>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {o.code && (
                  <span
                    style={{
                      fontFamily: "var(--font-zhamo-mono)",
                      fontSize: 12,
                      padding: "4px 8px",
                      borderRadius: 5,
                      background: tokens.pageBg,
                      color: tokens.ink,
                    }}
                  >
                    {o.code}
                  </span>
                )}
                {o.until && (
                  <span style={{ fontSize: 11.5, color: tokens.inkMuted }}>
                    Until {o.until}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
