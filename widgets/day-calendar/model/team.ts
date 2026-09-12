export const dayCalendarAccent = "oklch(0.64 0.16 350)";

/** Cycled by team-member index — the backend doesn't assign a color per
 * team member, so this is purely a rendering choice, not business data. */
export const teamColumnAccents = [
  "oklch(0.64 0.16 350)",
  "oklch(0.64 0.16 285)",
  "oklch(0.64 0.16 225)",
  "oklch(0.64 0.16 45)",
  "oklch(0.64 0.16 140)",
  "oklch(0.64 0.16 15)",
] as const;

/**
 * "Product sale", "New payment", etc. have no backend module (billing/
 * finance — see docs/integration/audit.md) and stay inert placeholders.
 * "Waiting list" is real (Phase 3b) — its count and link are computed at
 * render time in `mini-calendar-rail.tsx`, not baked into this label.
 */
export const quickActions = [
  { label: "Product sale", mono: "PS", span: "auto", href: null },
  { label: "New payment", mono: "NP", span: "auto", href: null },
  { label: "Service list", mono: "SL", span: "auto", href: null },
  { label: "Product catalog", mono: "PC", span: "auto", href: null },
  { label: "Waiting list", mono: "WL", span: "span 2", href: "/waitlist" },
] as const;

export const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];
