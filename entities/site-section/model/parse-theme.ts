import { DEFAULT_THEME, type SiteTheme } from "./theme";

/**
 * `themeJson` is untyped JSONB on the backend (D4 — "the backend doesn't
 * need to know each template's schema"). Parses it defensively, merging
 * valid fields over the defaults rather than failing the whole page —
 * matching how a section's `propsJson` is handled (Phase 5 doc §1).
 */
export function parseTheme(themeJson: Record<string, unknown>): SiteTheme {
  const theme = { ...DEFAULT_THEME };
  if (typeof themeJson.accent === "string") theme.accent = themeJson.accent;
  if (themeJson.surface === "light" || themeJson.surface === "dark") {
    theme.surface = themeJson.surface;
  }
  if (
    themeJson.radius === "sharp" ||
    themeJson.radius === "rounded" ||
    themeJson.radius === "pill"
  ) {
    theme.radius = themeJson.radius;
  }
  if (
    themeJson.fontFamily === "sans" ||
    themeJson.fontFamily === "serif" ||
    themeJson.fontFamily === "mono"
  ) {
    theme.fontFamily = themeJson.fontFamily;
  }
  if (typeof themeJson.logoAssetId === "string") {
    theme.logoAssetId = themeJson.logoAssetId;
  }
  return theme;
}
