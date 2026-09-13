import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { ReviewsVariables } from "./schema";

function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export function Component({
  variables,
  context,
}: {
  variables: ReviewsVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.items.length === 0 ? (
        <EmptyNote tokens={tokens}>No reviews added yet.</EmptyNote>
      ) : variables.layout === "quote" ? (
        <div
          style={{
            padding: 24,
            borderRadius: tokens.radius,
            background: tokens.quoteBg,
            borderLeft: `3px solid ${context.theme.accent}`,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 22,
              lineHeight: 1.3,
              fontWeight: 700,
              color: tokens.ink,
            }}
          >
            &ldquo;{variables.items[0]!.quote}&rdquo;
          </span>
          <span style={{ fontSize: 13, color: tokens.inkMuted }}>
            {stars(variables.items[0]!.rating)} — {variables.items[0]!.author}
          </span>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {variables.items.map((r, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${tokens.hairline}`,
                borderRadius: tokens.radius,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                background: tokens.cardBg,
              }}
            >
              <span style={{ fontSize: 13, color: context.theme.accent }}>
                {stars(r.rating)}
              </span>
              <span
                style={{ fontSize: 14, lineHeight: 1.5, color: tokens.ink }}
              >
                {r.quote}
              </span>
              <span style={{ fontSize: 12.5, color: tokens.inkMuted }}>
                {r.author}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
