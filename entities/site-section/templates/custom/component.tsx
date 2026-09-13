import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import { SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { CustomVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: CustomVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: variables.body ? tokens.ink : tokens.inkMuted,
          }}
        >
          {variables.body || "No description added yet."}
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              minHeight: 160,
              borderRadius: tokens.radius,
              background: variables.imageAssetId ? undefined : tokens.coverBg,
              overflow: "hidden",
            }}
          >
            {variables.imageAssetId && (
              <img
                src={assetUrl(variables.imageAssetId)}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          {variables.ctaLabel && (
            <a
              href={variables.ctaUrl || undefined}
              style={{
                alignSelf: "flex-start",
                height: 44,
                padding: "0 20px",
                borderRadius: 8,
                background: context.theme.accent,
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {variables.ctaLabel}
            </a>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
