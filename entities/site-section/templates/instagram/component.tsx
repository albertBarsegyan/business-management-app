import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import { EmptyNote, SectionShell } from "../../model/section-shell";
import type { TemplateContext } from "../../model/template-context";
import type { InstagramVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: InstagramVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);

  return (
    <SectionShell heading={variables.heading} tokens={tokens}>
      {variables.images.length === 0 ? (
        <EmptyNote tokens={tokens}>No photos added yet.</EmptyNote>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 6,
          }}
        >
          {variables.images.map((img, i) => (
            <img
              key={i}
              src={assetUrl(img.assetId)}
              alt=""
              style={{
                aspectRatio: "1 / 1",
                borderRadius: 6,
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}
      {variables.handleUrl && (
        <a
          href={variables.handleUrl}
          style={{ fontSize: 12.5, color: context.theme.accent }}
        >
          {variables.handleUrl}
        </a>
      )}
    </SectionShell>
  );
}
