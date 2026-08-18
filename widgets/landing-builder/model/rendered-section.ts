import type { BodySectionKey, BodySectionPropsMap } from "./types";
import {
  faqEntries,
  hoursRows,
  padMap,
  reviews,
  services,
  team,
  tiles,
} from "./data";

export interface RenderedSectionBase {
  key: BodySectionKey;
  heading: string;
  padY: string;
  padX: string;
  bg: string;
  ink: string;
  inkMuted: string;
  hairline: string;
  cardBg: string;
  ghost: string;
  quoteBg: string;
  mapBg: string;
  ratingColor: string;
  outline: string;
  meta: string;
  onSelect: () => void;
}

export interface OfferCard {
  title: string;
  body: string;
  code: string;
  until: string;
  bg: string;
  border: string;
  ink: string;
  sub: string;
  codeBg: string;
}

export interface LoyaltyPlan {
  name: string;
  price: string;
  perks: string[];
  border: string;
  ctaBg: string;
  ctaInk: string;
}

export type RenderedSection =
  | (RenderedSectionBase & { kind: "services"; layout: BodySectionPropsMap["services"]["layout"]; cols: string; items: typeof services })
  | (RenderedSectionBase & { kind: "team"; cols: string; ratings: boolean; items: typeof team })
  | (RenderedSectionBase & { kind: "gallery"; layout: BodySectionPropsMap["gallery"]["layout"]; cols: string; items: { bg: string; label: string }[] })
  | (RenderedSectionBase & { kind: "reviews"; layout: BodySectionPropsMap["reviews"]["layout"]; items: typeof reviews })
  | (RenderedSectionBase & { kind: "about"; cols: string; order: string; photoOrder: string })
  | (RenderedSectionBase & { kind: "hours"; showMap: boolean; cols: string; rows: typeof hoursRows })
  | (RenderedSectionBase & { kind: "offers"; cols: string; items: OfferCard[] })
  | (RenderedSectionBase & { kind: "loyalty"; cols: string; items: LoyaltyPlan[] })
  | (RenderedSectionBase & { kind: "faq"; items: typeof faqEntries })
  | (RenderedSectionBase & { kind: "beforeafter"; pairs: { before: string; after: string }[] })
  | (RenderedSectionBase & { kind: "instagram"; items: { bg: string; label: string }[] })
  | (RenderedSectionBase & { kind: "custom" });

export function buildRenderedSection(
  key: BodySectionKey,
  base: RenderedSectionBase,
  p: BodySectionPropsMap[BodySectionKey],
  accent: string,
  dark: boolean,
  device: "desktop" | "phone",
  sInk: string,
  sMuted: string,
  sHair: string
): RenderedSection {
  base.padY = padMap[p.spacing];

  if (key === "services") {
    const sp = p as BodySectionPropsMap["services"];
    return { ...base, kind: "services", layout: sp.layout, cols: "3", items: services, meta: sp.prices ? "24 services · prices shown" : "24 services · from-prices only" };
  }
  if (key === "team") {
    const tp = p as BodySectionPropsMap["team"];
    return { ...base, kind: "team", cols: String(tp.cols), ratings: tp.ratings, items: team, meta: "4 people" };
  }
  if (key === "gallery") {
    const gp = p as BodySectionPropsMap["gallery"];
    return { ...base, kind: "gallery", layout: gp.layout, cols: String(gp.cols), items: tiles(6), meta: "18 photos" };
  }
  if (key === "reviews") {
    const rp = p as BodySectionPropsMap["reviews"];
    return { ...base, kind: "reviews", layout: rp.layout, items: reviews, meta: rp.verified ? "218 verified" : "218 reviews" };
  }
  if (key === "about") {
    const ap = p as BodySectionPropsMap["about"];
    return {
      ...base,
      kind: "about",
      cols: device === "phone" ? "1fr" : ap.align === "center" ? "1fr" : "1.2fr 1fr",
      order: ap.align === "right" ? "2" : "1",
      photoOrder: ap.align === "right" ? "1" : "2",
      meta: "since 2016",
    };
  }
  if (key === "hours") {
    const hp = p as BodySectionPropsMap["hours"];
    return { ...base, kind: "hours", showMap: hp.map, cols: device === "phone" ? "1fr" : "1fr 1fr", rows: hoursRows, meta: "Kentron, Yerevan" };
  }
  if (key === "offers") {
    const op = p as BodySectionPropsMap["offers"];
    const items: OfferCard[] = [
      { title: "First visit, −20%", body: "On any haircut with Davit, Monday to Thursday.", code: "FIRST20", until: "until 31 Aug", bg: accent, border: accent, ink: "#FFFFFF", sub: "rgba(255,255,255,0.8)", codeBg: "rgba(255,255,255,0.18)" },
      { title: "Bring a friend", body: "Two cuts booked together, 5 000 ֏ off the second.", code: "DUO", until: "ongoing", bg: dark ? "#1C1C23" : "#FAFBFC", border: sHair, ink: sInk, sub: sMuted, codeBg: dark ? "rgba(255,255,255,0.1)" : "#EDEFF2" },
    ];
    return { ...base, kind: "offers", cols: op.layout === "banner" ? "1fr" : device === "phone" ? "1fr" : "1fr 1fr", items, meta: "2 active" };
  }
  if (key === "loyalty") {
    const lp = p as BodySectionPropsMap["loyalty"];
    const items: LoyaltyPlan[] = [
      { name: "Monthly cut", price: "18 000 ֏", perks: ["2 cuts a month", "Priority slots", "Free beard tidy"], border: sHair, ctaBg: dark ? "rgba(255,255,255,0.1)" : "#EDEFF2", ctaInk: sInk },
      { name: "Cut & beard", price: "28 000 ֏", perks: ["2 cuts + 2 trims", "Priority slots", "10% on products"], border: accent, ctaBg: "#FFC935", ctaInk: "#17170F" },
      { name: "Full care", price: "42 000 ֏", perks: ["Unlimited cuts", "Any barber", "Free hot towel"], border: sHair, ctaBg: dark ? "rgba(255,255,255,0.1)" : "#EDEFF2", ctaInk: sInk },
    ];
    return { ...base, kind: "loyalty", cols: String(lp.cols), items, meta: "3 plans" };
  }
  if (key === "faq") {
    return { ...base, kind: "faq", items: faqEntries, meta: "5 questions" };
  }
  if (key === "beforeafter") {
    const pairs = [
      { before: "repeating-linear-gradient(135deg, oklch(0.5 0.05 350) 0 9px, oklch(0.44 0.05 350) 9px 18px)", after: "repeating-linear-gradient(135deg, oklch(0.62 0.11 350) 0 9px, oklch(0.55 0.11 350) 9px 18px)" },
      { before: "repeating-linear-gradient(135deg, oklch(0.5 0.04 260) 0 9px, oklch(0.44 0.04 260) 9px 18px)", after: "repeating-linear-gradient(135deg, oklch(0.62 0.1 260) 0 9px, oklch(0.55 0.1 260) 9px 18px)" },
    ];
    return { ...base, kind: "beforeafter", pairs, meta: "6 pairs" };
  }
  if (key === "instagram") {
    return { ...base, kind: "instagram", items: tiles(6), meta: "@studioaram" };
  }
  return { ...base, kind: "custom", meta: "custom block" };
}
