import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import { SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { AboutVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: AboutVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);
  const photo = (
    <div
      style={{
        minHeight: 220,
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
  );
  const text = (
    <span style={{ fontSize: 14, lineHeight: 1.6, color: tokens.ink }}>
      {variables.body || "No description added yet."}
    </span>
  );

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 24,
          alignItems: "center",
        }}
      >
        {variables.align === "right" ? (
          <>
            {text}
            {photo}
          </>
        ) : (
          <>
            {photo}
            {text}
          </>
        )}
      </div>
    </SectionShell>
  );
}
