import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { ServicesVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: ServicesVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);
  const { services } = context;

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {services.length === 0 ? (
        <EmptyNote tokens={tokens}>No services published yet.</EmptyNote>
      ) : variables.layout === "list" ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                minHeight: 56,
                padding: "14px 0",
                display: "flex",
                alignItems: "center",
                gap: 14,
                borderBottom: `1px solid ${tokens.hairline}`,
              }}
            >
              <span style={{ flex: 1, fontSize: 15, color: tokens.ink }}>
                {s.name}
              </span>
              <span style={{ fontSize: 13, color: tokens.inkMuted }}>
                {s.durationLabel}
              </span>
              {variables.showPrices && (
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 14,
                    color: tokens.ink,
                  }}
                >
                  {s.priceLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : variables.layout === "table" ? (
        <div
          style={{
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 16,
                padding: "12px 16px",
                alignItems: "center",
                borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                background: tokens.cardBg,
              }}
            >
              <span style={{ fontSize: 14, color: tokens.ink }}>{s.name}</span>
              <span style={{ fontSize: 13, color: tokens.inkMuted }}>
                {s.durationLabel}
              </span>
              {variables.showPrices && (
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 13,
                    color: tokens.ink,
                  }}
                >
                  {s.priceLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                border: `1px solid ${tokens.hairline}`,
                borderRadius: tokens.radius,
                padding: 18,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: tokens.cardBg,
              }}
            >
              <span
                style={{ fontSize: 16, fontWeight: 600, color: tokens.ink }}
              >
                {s.name}
              </span>
              <span style={{ fontSize: 13, color: tokens.inkMuted }}>
                {s.durationLabel}
              </span>
              {variables.showPrices && (
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 14,
                    color: tokens.ink,
                  }}
                >
                  {s.priceLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
