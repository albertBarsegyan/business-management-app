/**
 * The site's branding theme (D4 — stored on the draft/published revision's
 * `themeJson`, edited by `widgets/branding-builder`). Every template
 * derives its actual colors from this via `deriveThemeTokens` rather than
 * hardcoding them, so the whole site stays visually consistent and themes
 * apply uniformly across every section.
 */
export interface SiteTheme {
  accent: string;
  surface: "light" | "dark";
  radius: "sharp" | "rounded" | "pill";
  fontFamily: "sans" | "serif" | "mono";
  logoAssetId: string | null;
}

export const DEFAULT_THEME: SiteTheme = {
  accent: "oklch(0.64 0.16 350)",
  surface: "light",
  radius: "rounded",
  fontFamily: "sans",
  logoAssetId: null,
};

export interface ThemeTokens {
  dark: boolean;
  pageBg: string;
  ink: string;
  inkMuted: string;
  hairline: string;
  cardBg: string;
  ghost: string;
  coverBg: string;
  quoteBg: string;
  radius: number;
}

/** Every template's `component.tsx` calls this once to get consistent
 * colors from the theme, instead of re-deriving its own palette. */
export function deriveThemeTokens(theme: SiteTheme): ThemeTokens {
  const dark = theme.surface === "dark";
  return {
    dark,
    pageBg: dark ? "#101016" : "#FFFFFF",
    ink: dark ? "rgba(255,255,255,0.92)" : "#16161A",
    inkMuted: dark ? "rgba(255,255,255,0.55)" : "#7C818B",
    hairline: dark ? "rgba(255,255,255,0.12)" : "#E6E8EB",
    cardBg: dark ? "#1A1A21" : "#FFFFFF",
    ghost: dark ? "rgba(255,255,255,0.25)" : "#D5D9DE",
    coverBg: theme.accent,
    quoteBg: dark ? "#1A1A21" : "#FAFBFC",
    radius: theme.radius === "sharp" ? 2 : theme.radius === "pill" ? 999 : 10,
  };
}
