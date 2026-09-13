import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { TeamVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: TeamVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);
  const { teamMembers } = context;

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {teamMembers.length === 0 ? (
        <EmptyNote tokens={tokens}>No team members published yet.</EmptyNote>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${variables.columns}, 1fr)`,
            gap: 16,
          }}
        >
          {teamMembers.map((m) => (
            <div
              key={m.id}
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
              <span
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: context.theme.accent,
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {m.firstName.slice(0, 1).toUpperCase()}
              </span>
              <span
                style={{ fontSize: 15, fontWeight: 600, color: tokens.ink }}
              >
                {m.name}
              </span>
              <span style={{ fontSize: 13, color: tokens.inkMuted }}>
                {m.roleTitle}
              </span>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
