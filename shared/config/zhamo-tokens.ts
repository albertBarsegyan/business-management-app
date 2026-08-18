/**
 * Zhamo design foundation — palette, vertical accents, type scale, spacing
 * and density, transcribed from `claude-design/Zhamo Design System.dc.html`.
 * Single source of truth so every Zhamo screen stays in sync.
 */

export const zhamoNeutrals = [
  { name: "Sidebar", hex: "#14141A", use: "Nav shell, deepest surface" },
  { name: "Sidebar raised", hex: "#1E1E25", use: "Sub-nav, user block" },
  { name: "App background", hex: "#F5F6F8", use: "Behind every card" },
  { name: "Card", hex: "#FFFFFF", use: "Content surface" },
  { name: "Border", hex: "#E6E8EB", use: "Separation, no shadow" },
  { name: "Text muted", hex: "#8A9099", use: "Labels, meta, micro" },
] as const;

export const zhamoSemantics = [
  { name: "Primary", hex: "#FFC935", on: "#17170F", sample: "Save changes", use: "One per screen" },
  { name: "Link / secondary", hex: "#2C6CF6", on: "#FFFFFF", sample: "Add break", use: "Links, focus ring" },
  { name: "Success", hex: "#22C55E", on: "#FFFFFF", sample: "Saved", use: "Toasts, schedule badge" },
  { name: "Danger", hex: "#EF4444", on: "#FFFFFF", sample: "Delete", use: "Destructive, no-show" },
  { name: "Warning", hex: "#F59E0B", on: "#FFFFFF", sample: "Pending", use: "Unconfirmed states" },
] as const;

export type ZhamoVerticalId =
  | "beauty"
  | "healthcare"
  | "fitness"
  | "education"
  | "automobile"
  | "consumer-services";

export const zhamoVerticals: {
  id: ZhamoVerticalId;
  name: string;
  nav: string;
  accent: string;
  tint: string;
  example: string;
}[] = [
  { id: "beauty", name: "Beauty", nav: "Salon floor", accent: "oklch(0.64 0.16 350)", tint: "oklch(0.96 0.03 350)", example: "Balayage" },
  { id: "healthcare", name: "Healthcare", nav: "Clinic", accent: "oklch(0.64 0.16 225)", tint: "oklch(0.96 0.03 225)", example: "Hygiene visit" },
  { id: "fitness", name: "Sport & Fitness", nav: "Studio", accent: "oklch(0.64 0.16 155)", tint: "oklch(0.96 0.03 155)", example: "Reformer class" },
  { id: "education", name: "Education", nav: "School", accent: "oklch(0.64 0.16 285)", tint: "oklch(0.96 0.03 285)", example: "Piano, 45 min" },
  { id: "automobile", name: "Automobile", nav: "Service bay", accent: "oklch(0.64 0.16 45)", tint: "oklch(0.96 0.03 45)", example: "Full detail" },
  { id: "consumer-services", name: "Consumer services", nav: "Front desk", accent: "oklch(0.64 0.16 110)", tint: "oklch(0.96 0.04 110)", example: "Dry cleaning" },
];

export function zhamoVertical(id: ZhamoVerticalId) {
  return zhamoVerticals.find((v) => v.id === id) ?? zhamoVerticals[0];
}

export const zhamoTypeScale = [
  { name: "Display", spec: "88–104 / 1.02 / -0.028em / 700", use: "Onboarding, empty hero", family: "var(--font-zhamo-display)", size: "76px", lh: "1.02", ls: "-0.028em", weight: "700", sample: "Let's get acquainted!" },
  { name: "H1", spec: "34 / 1.05 / -0.02em / 700", use: "Page titles", family: "var(--font-zhamo-display)", size: "34px", lh: "1.05", ls: "-0.02em", weight: "700", sample: "13 August, Thursday" },
  { name: "H2", spec: "20 / 1.15 / -0.015em / 700", use: "Modals, card titles", family: "var(--font-zhamo-display)", size: "20px", lh: "1.15", ls: "-0.015em", weight: "700", sample: "Choose a work schedule" },
  { name: "Body", spec: "14 / 1.5 / 0 / 400–500", use: "Forms, tables, everything", family: "var(--font-zhamo-sans)", size: "14px", lh: "1.5", ls: "0", weight: "400", sample: "Women's cut & styling · 60 min · 12 000 ֏" },
  { name: "Small", spec: "12.5 / 1.45 / 0 / 400–600", use: "Meta, helper, chips", family: "var(--font-zhamo-sans)", size: "12.5px", lh: "1.45", ls: "0", weight: "400", sample: "Master: Karen Sahakyan · +374 77 214 508" },
  { name: "Micro", spec: "11 / 1.3 / 0.12em / 600 caps", use: "Column heads, section tags", family: "var(--font-zhamo-mono)", size: "11px", lh: "1.3", ls: "0.12em", weight: "500", sample: "TEAM MEMBER — SCHEDULE — SERVICES" },
] as const;

export const zhamoSpacing = [
  { token: "space-1", px: "4px", use: "table cell padding" },
  { token: "space-2", px: "8px", use: "chip gaps" },
  { token: "space-3", px: "12px", use: "field stack" },
  { token: "space-4", px: "16px", use: "card padding" },
  { token: "space-6", px: "24px", use: "card inner sections" },
  { token: "space-8", px: "32px", use: "page gutters" },
  { token: "space-12", px: "48px", use: "onboarding blocks" },
  { token: "space-18", px: "72px", use: "display breathing room" },
] as const;

export const zhamoDensity = [
  { k: "Input / select / button height", v: "32px" },
  { k: "Table row", v: "40px" },
  { k: "Table cell padding", v: "4px 8px" },
  { k: "Card radius / chip radius", v: "8px / 6px" },
  { k: "Calendar row (30 min)", v: "34px" },
  { k: "Shadow", v: "only overlays: 0 8px 32px rgba(20,20,26,.16)" },
  { k: "Focus ring", v: "2px #2C6CF6, offset 2px" },
] as const;

export const zhamoVoice = [
  { rule: "Name the outcome", yes: "Save changes", no: "Submit form" },
  { rule: "The verb persists", yes: "Publish → Published", no: "Publish → Success!" },
  { rule: "Empty states invite", yes: "Your first client goes here", no: "No data available" },
  { rule: "Sentence case only", yes: "Add team member", no: "Add Team Member" },
] as const;
