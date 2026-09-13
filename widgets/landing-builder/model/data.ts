import type { BodySectionKey, BuilderProps, SectionMetaEntry } from "./types";

export function coverGradient(a: string, b: string): string {
  return `repeating-linear-gradient(135deg, ${a} 0 9px, ${b} 9px 18px)`;
}

export const bodySectionOrderAll: BodySectionKey[] = [
  "services",
  "team",
  "gallery",
  "reviews",
  "about",
  "hours",
  "offers",
  "loyalty",
  "faq",
  "beforeafter",
  "instagram",
  "custom",
];

export const defaultOrder: BodySectionKey[] = [
  "services",
  "team",
  "reviews",
  "gallery",
  "hours",
];

export const sectionMeta: Record<BodySectionKey, SectionMetaEntry> = {
  services: {
    name: "Services / price list",
    mono: "SV",
    body: "Every bookable service with price and duration, Book on each row.",
    needs: "at least one service",
  },
  team: {
    name: "Team",
    mono: "TM",
    body: "Photos, roles and ratings, with Book-with-X on every card.",
    needs: "team photos",
  },
  gallery: {
    name: "Gallery",
    mono: "GL",
    body: "Grid, strip or carousel of your work.",
    needs: "6+ photos",
  },
  reviews: {
    name: "Reviews",
    mono: "RV",
    body: "Verified Zhamo reviews as one pull-quote or three cards.",
    needs: "3+ reviews",
  },
  about: {
    name: "About",
    mono: "AB",
    body: "Your story, with an optional photo left or right.",
    needs: "nothing",
  },
  hours: {
    name: "Hours & location",
    mono: "HR",
    body: "Hours table, address, phone, map and directions.",
    needs: "address",
  },
  offers: {
    name: "Offers",
    mono: "OF",
    body: "Promotions with a code and a valid-until date.",
    needs: "an active promotion",
  },
  loyalty: {
    name: "Memberships",
    mono: "LY",
    body: "Plan cards with price and perks.",
    needs: "a loyalty plan",
  },
  faq: {
    name: "FAQ",
    mono: "FQ",
    body: "Accordion of three to ten questions.",
    needs: "nothing",
  },
  beforeafter: {
    name: "Before & after",
    mono: "BA",
    body: "Paired images — strongest for colour, brows and dental.",
    needs: "photo pairs",
  },
  instagram: {
    name: "Instagram feed",
    mono: "IG",
    body: "Six latest posts from a connected account.",
    needs: "connected account",
  },
  custom: {
    name: "Custom block",
    mono: "CB",
    body: "Heading, text, image and one button — for anything else.",
    needs: "nothing",
  },
};

export const padMap: Record<"compact" | "normal" | "roomy", string> = {
  compact: "18px",
  normal: "26px",
  roomy: "40px",
};

export const heroHeights = {
  compact: "220px",
  standard: "300px",
  tall: "400px",
} as const;
export const heroTitleSizes = {
  compact: "clamp(24px, 7vw, 34px)",
  standard: "clamp(28px, 8vw, 44px)",
  tall: "clamp(32px, 9vw, 54px)",
} as const;

export const footerColumnsAll = [
  {
    title: "Studio",
    items: ["Services", "The team", "Gallery", "Memberships"],
  },
  {
    title: "Visit",
    items: ["12 Abovyan St", "Kentron, Yerevan", "Mon–Fri 09:00–22:00"],
  },
  {
    title: "Contact",
    items: ["+374 10 543 220", "hello@studioaram.am", "Book online"],
  },
  { title: "Follow", items: ["Instagram", "Telegram", "Facebook"] },
];

export const accentSwatchHexes = [
  "oklch(0.64 0.16 350)",
  "oklch(0.64 0.16 285)",
  "oklch(0.64 0.16 225)",
  "oklch(0.64 0.16 155)",
  "oklch(0.64 0.16 45)",
];

export const defaultBuilderProps: BuilderProps = {
  nav: {
    sticky: true,
    showName: true,
    showLinks: true,
    cta: "Book now",
    bg: "solid",
  },
  hero: {
    layout: "fullbleed",
    height: "standard",
    title: "The best barbers on Abovyan Street.",
    sub: "Four chairs, no waiting past your time, open till 22:00 every weekday.",
    cta: "Book an appointment",
    second: true,
    trust: true,
  },
  services: {
    heading: "Services",
    layout: "list",
    prices: true,
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  team: {
    heading: "The team",
    cols: 3,
    ratings: true,
    spacing: "normal",
    bg: "tinted",
    bleed: false,
  },
  reviews: {
    heading: "What clients say",
    layout: "quote",
    verified: true,
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  gallery: {
    heading: "Our work",
    layout: "grid",
    cols: 6,
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  hours: {
    heading: "Hours & address",
    map: true,
    spacing: "normal",
    bg: "tinted",
    bleed: false,
  },
  about: {
    heading: "About the studio",
    align: "left",
    body: "",
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  offers: {
    heading: "This month",
    layout: "cards",
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  loyalty: {
    heading: "Memberships",
    cols: 3,
    spacing: "normal",
    bg: "tinted",
    bleed: false,
  },
  faq: { heading: "Questions", spacing: "normal", bg: "page", bleed: false },
  beforeafter: {
    heading: "Before & after",
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  instagram: {
    heading: "On Instagram",
    spacing: "normal",
    bg: "page",
    bleed: false,
  },
  custom: {
    heading: "Custom section",
    body: "",
    spacing: "normal",
    bg: "tinted",
    bleed: false,
  },
  footer: { cols: 3, signup: true, badge: true },
};
