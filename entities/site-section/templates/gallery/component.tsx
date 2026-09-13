import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { GalleryVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: GalleryVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.images.length === 0 ? (
        <EmptyNote tokens={tokens}>No photos uploaded yet.</EmptyNote>
      ) : variables.layout === "strip" ? (
        <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
          {variables.images.map((img, i) => (
            <img
              key={i}
              src={assetUrl(img.assetId)}
              alt=""
              style={{
                width: 220,
                height: 160,
                flex: "0 0 auto",
                borderRadius: tokens.radius,
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 10,
          }}
        >
          {variables.images.map((img, i) => (
            <img
              key={i}
              src={assetUrl(img.assetId)}
              alt=""
              style={{
                aspectRatio: "1 / 1",
                width: "100%",
                borderRadius: tokens.radius,
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}
    </SectionShell>
  );
}
