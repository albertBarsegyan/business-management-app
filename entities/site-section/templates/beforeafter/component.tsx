import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { BeforeAfterVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: BeforeAfterVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.pairs.length === 0 ? (
        <EmptyNote tokens={tokens}>No photos added yet.</EmptyNote>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {variables.pairs.map((pair, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                borderRadius: tokens.radius,
                overflow: "hidden",
                border: `1px solid ${tokens.hairline}`,
              }}
            >
              {(["beforeAssetId", "afterAssetId"] as const).map((field) => (
                <div
                  key={field}
                  style={{
                    height: 180,
                    background: tokens.pageBg,
                    position: "relative",
                  }}
                >
                  {pair[field] && (
                    <img
                      src={assetUrl(pair[field]!)}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      fontFamily: "var(--font-zhamo-mono)",
                      fontSize: 10,
                      color: "#FFFFFF",
                      textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                    }}
                  >
                    {field === "beforeAssetId" ? "BEFORE" : "AFTER"}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
