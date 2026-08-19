import type { BodySectionKey, BuilderProps, SectionMetaEntry } from "./types";

export function coverGradient(a: string, b: string): string {
  return `repeating-linear-gradient(135deg, ${a} 0 9px, ${b} 9px 18px)`;
}

export function tiles(n: number): { bg: string; label: string }[] {
  const out: { bg: string; label: string }[] = [];
  for (let i = 1; i <= n; i++) {
    out.push({
      bg: coverGradient(
        `oklch(${0.52 + (i % 3) * 0.05} 0.09 ${326 + i * 9})`,
        `oklch(${0.45 + (i % 3) * 0.05} 0.09 ${326 + i * 9})`
      ),
      label: i === 1 ? "1200×1200" : "",
    });
  }
  return out;
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

export const defaultOrder: BodySectionKey[] = ["services", "team", "reviews", "gallery", "hours"];

export const sectionMeta: Record<BodySectionKey, SectionMetaEntry> = {
  services: { name: "Services / price list", mono: "SV", body: "Every bookable service with price and duration, Book on each row.", needs: "at least one service" },
  team: { name: "Team", mono: "TM", body: "Photos, roles and ratings, with Book-with-X on every card.", needs: "team photos" },
  gallery: { name: "Gallery", mono: "GL", body: "Grid, strip or carousel of your work.", needs: "6+ photos" },
  reviews: { name: "Reviews", mono: "RV", body: "Verified Zhamo reviews as one pull-quote or three cards.", needs: "3+ reviews" },
  about: { name: "About", mono: "AB", body: "Your story, with an optional photo left or right.", needs: "nothing" },
  hours: { name: "Hours & location", mono: "HR", body: "Hours table, address, phone, map and directions.", needs: "address" },
  offers: { name: "Offers", mono: "OF", body: "Promotions with a code and a valid-until date.", needs: "an active promotion" },
  loyalty: { name: "Memberships", mono: "LY", body: "Plan cards with price and perks.", needs: "a loyalty plan" },
  faq: { name: "FAQ", mono: "FQ", body: "Accordion of three to ten questions.", needs: "nothing" },
  beforeafter: { name: "Before & after", mono: "BA", body: "Paired images — strongest for colour, brows and dental.", needs: "photo pairs" },
  instagram: { name: "Instagram feed", mono: "IG", body: "Six latest posts from a connected account.", needs: "connected account" },
  custom: { name: "Custom block", mono: "CB", body: "Heading, text, image and one button — for anything else.", needs: "nothing" },
};

export const padMap: Record<"compact" | "normal" | "roomy", string> = {
  compact: "18px",
  normal: "26px",
  roomy: "40px",
};

export const heroHeights = { compact: "220px", standard: "300px", tall: "400px" } as const;
export const heroTitleSizes = {
  compact: "clamp(24px, 7vw, 34px)",
  standard: "clamp(28px, 8vw, 44px)",
  tall: "clamp(32px, 9vw, 54px)",
} as const;

export const services = [
  { name: "Men's cut & beard trim", meta: "45 min · with wash", duration: "45 min", price: "7 500 ֏", thumb: coverGradient("oklch(0.6 0.09 350)", "oklch(0.53 0.09 350)") },
  { name: "Men's haircut", meta: "45 min", duration: "45 min", price: "6 000 ֏", thumb: coverGradient("oklch(0.62 0.06 300)", "oklch(0.55 0.06 300)") },
  { name: "Beard sculpt", meta: "30 min", duration: "30 min", price: "5 000 ֏", thumb: coverGradient("oklch(0.6 0.07 60)", "oklch(0.53 0.07 60)") },
  { name: "Head shave & hot towel", meta: "30 min", duration: "30 min", price: "5 500 ֏", thumb: coverGradient("oklch(0.58 0.08 200)", "oklch(0.51 0.08 200)") },
];

export const team = [
  { name: "Karen Sahakyan", first: "Karen", role: "Barber · 9 years", rating: "4.9", photo: coverGradient("oklch(0.55 0.09 350)", "oklch(0.48 0.09 350)") },
  { name: "Davit Melkonyan", first: "Davit", role: "Barber · 4 years", rating: "4.8", photo: coverGradient("oklch(0.55 0.08 285)", "oklch(0.48 0.08 285)") },
  { name: "Mariam Petrosyan", first: "Mariam", role: "Colourist", rating: "5.0", photo: coverGradient("oklch(0.55 0.08 225)", "oklch(0.48 0.08 225)") },
];

export const reviews = [
  { stars: "★★★★★", text: "Booked at 23:00, got a 09:30 slot the next morning. No calls, no waiting.", who: "Gor H. · July 2026" },
  { stars: "★★★★★", text: "Mariam matched a colour from a photo on the first try.", who: "Sona A. · August 2026" },
  { stars: "★★★★★", text: "They text a reminder two hours before. Never missed one since.", who: "Vahe M. · June 2026" },
];

export const hoursRows = [
  { d: "Mon–Fri", t: "09:00 – 22:00" },
  { d: "Saturday", t: "10:00 – 20:00" },
  { d: "Sunday", t: "closed" },
];

export const faqEntries = [
  { q: "Do I need an account to book?", a: "No. Name, phone and one SMS code — that's the whole thing.", glyph: "▾", open: true },
  { q: "How late can I cancel?", a: "", glyph: "▸", open: false },
  { q: "Do you take walk-ins?", a: "", glyph: "▸", open: false },
  { q: "Which cards do you accept?", a: "", glyph: "▸", open: false },
];

export const footerColumnsAll = [
  { title: "Studio", items: ["Services", "The team", "Gallery", "Memberships"] },
  { title: "Visit", items: ["12 Abovyan St", "Kentron, Yerevan", "Mon–Fri 09:00–22:00"] },
  { title: "Contact", items: ["+374 10 543 220", "hello@studioaram.am", "Book online"] },
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
  nav: { sticky: true, showName: true, showLinks: true, cta: "Book now", bg: "solid" },
  hero: { layout: "fullbleed", height: "standard", title: "The best barbers on Abovyan Street.", sub: "Four chairs, no waiting past your time, open till 22:00 every weekday.", cta: "Book an appointment", second: true, trust: true },
  services: { heading: "Services", layout: "list", prices: true, spacing: "normal", bg: "page", bleed: false },
  team: { heading: "The team", cols: 3, ratings: true, spacing: "normal", bg: "tinted", bleed: false },
  reviews: { heading: "What clients say", layout: "quote", verified: true, spacing: "normal", bg: "page", bleed: false },
  gallery: { heading: "Our work", layout: "grid", cols: 6, spacing: "normal", bg: "page", bleed: false },
  hours: { heading: "Hours & address", map: true, spacing: "normal", bg: "tinted", bleed: false },
  about: { heading: "About the studio", align: "left", spacing: "normal", bg: "page", bleed: false },
  offers: { heading: "This month", layout: "cards", spacing: "normal", bg: "page", bleed: false },
  loyalty: { heading: "Memberships", cols: 3, spacing: "normal", bg: "tinted", bleed: false },
  faq: { heading: "Questions", spacing: "normal", bg: "page", bleed: false },
  beforeafter: { heading: "Before & after", spacing: "normal", bg: "page", bleed: false },
  instagram: { heading: "On Instagram", spacing: "normal", bg: "page", bleed: false },
  custom: { heading: "Bridal parties", spacing: "normal", bg: "tinted", bleed: false },
  footer: { cols: 3, signup: true, badge: true },
};

export const trustItems = [
  { k: "★ 4.9", v: "218 reviews" },
  { k: "10 years", v: "on Abovyan St" },
  { k: "Open till 22:00", v: "Mon–Fri" },
];
