import type { ThemeTokens } from "./theme";

/** Shared wrapper every non-hero/cta template uses — heading + consistent
 * padding, so each template's component.tsx only writes its own content. */
export function SectionShell({
  heading,
  tokens,
  children,
}: {
  heading: string;
  tokens: ThemeTokens;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "40px 5vw",
        background: tokens.pageBg,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {heading && (
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: tokens.ink,
          }}
        >
          {heading}
        </span>
      )}
      {children}
    </div>
  );
}

export function EmptyNote({
  tokens,
  children,
}: {
  tokens: ThemeTokens;
  children: React.ReactNode;
}) {
  return (
    <span style={{ fontSize: 13, color: tokens.inkMuted }}>{children}</span>
  );
}
