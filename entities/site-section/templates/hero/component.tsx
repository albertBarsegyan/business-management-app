import { assetUrl } from "@/shared/lib/asset-url";
import { deriveThemeTokens } from "../../model/theme";
import type { TemplateContext } from "../../model/template-context";
import type { HeroVariables } from "./schema";

export function Component({
  variables,
  context,
}: {
  variables: HeroVariables;
  context: TemplateContext;
}) {
  const tokens = deriveThemeTokens(context.theme);
  const cover = variables.coverImageAssetId ? (
    <img
      src={assetUrl(variables.coverImageAssetId)}
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : null;

  const ctaButton = (
    <span
      style={{
        height: 48,
        padding: "0 24px",
        borderRadius: 8,
        background: context.theme.accent,
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      {variables.ctaLabel}
    </span>
  );
  const secondaryButton = variables.showSecondaryCta ? (
    <span
      style={{
        height: 48,
        padding: "0 22px",
        borderRadius: 8,
        border: `1px solid ${tokens.ghost}`,
        color: tokens.ink,
        fontSize: 14.5,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        whiteSpace: "nowrap",
      }}
    >
      Call us
    </span>
  ) : null;

  if (variables.layout === "fullbleed") {
    return (
      <div
        style={{
          position: "relative",
          minHeight: 420,
          background: tokens.coverBg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 16,
          padding: "48px 5vw",
          overflow: "hidden",
        }}
      >
        {cover}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 44,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#FFFFFF",
              maxWidth: "22ch",
            }}
          >
            {variables.title}
          </span>
          <span
            style={{
              fontSize: 16,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "48ch",
            }}
          >
            {variables.subtitle}
          </span>
          <span style={{ display: "flex", gap: 10 }}>
            {ctaButton}
            {secondaryButton}
          </span>
        </div>
      </div>
    );
  }

  if (variables.layout === "centered") {
    return (
      <div
        style={{
          minHeight: 380,
          padding: "64px 5vw",
          background: tokens.pageBg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 40,
            lineHeight: 1.05,
            fontWeight: 700,
            color: tokens.ink,
            maxWidth: "24ch",
          }}
        >
          {variables.title}
        </span>
        <span
          style={{
            fontSize: 16,
            lineHeight: 1.5,
            color: tokens.inkMuted,
            maxWidth: "50ch",
          }}
        >
          {variables.subtitle}
        </span>
        <span style={{ display: "flex", gap: 10 }}>
          {ctaButton}
          {secondaryButton}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 32,
        alignItems: "center",
        padding: "56px 5vw",
        background: tokens.pageBg,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 40,
            lineHeight: 1.05,
            fontWeight: 700,
            color: tokens.ink,
          }}
        >
          {variables.title}
        </span>
        <span style={{ fontSize: 16, lineHeight: 1.5, color: tokens.inkMuted }}>
          {variables.subtitle}
        </span>
        <span style={{ display: "flex", gap: 10 }}>
          {ctaButton}
          {secondaryButton}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          minHeight: 260,
          borderRadius: tokens.radius,
          background: tokens.coverBg,
          overflow: "hidden",
        }}
      >
        {cover}
      </div>
    </div>
  );
}
