import type {
  BodySectionKey,
  BodySectionPropsMap,
  FaqEntry,
  HoursRow,
  ReviewItem,
  ServiceListItem,
  TeamCardItem,
} from "./types";
import { padMap } from "./data";

/** Content sources with no backend anywhere in this system yet — always
 * empty until one exists, rather than fabricated business facts. */
const NO_REVIEWS: ReviewItem[] = [];
const NO_HOURS: HoursRow[] = [];
const NO_FAQ: FaqEntry[] = [];

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
  | (RenderedSectionBase & {
      kind: "services";
      layout: BodySectionPropsMap["services"]["layout"];
      cols: string;
      items: ServiceListItem[];
    })
  | (RenderedSectionBase & {
      kind: "team";
      cols: string;
      ratings: boolean;
      items: TeamCardItem[];
    })
  | (RenderedSectionBase & {
      kind: "gallery";
      layout: BodySectionPropsMap["gallery"]["layout"];
      cols: string;
      items: { bg: string; label: string }[];
    })
  | (RenderedSectionBase & {
      kind: "reviews";
      layout: BodySectionPropsMap["reviews"]["layout"];
      items: ReviewItem[];
    })
  | (RenderedSectionBase & {
      kind: "about";
      cols: string;
      order: string;
      photoOrder: string;
      body: string;
    })
  | (RenderedSectionBase & {
      kind: "hours";
      showMap: boolean;
      cols: string;
      rows: HoursRow[];
    })
  | (RenderedSectionBase & { kind: "offers"; cols: string; items: OfferCard[] })
  | (RenderedSectionBase & {
      kind: "loyalty";
      cols: string;
      items: LoyaltyPlan[];
    })
  | (RenderedSectionBase & { kind: "faq"; items: FaqEntry[] })
  | (RenderedSectionBase & {
      kind: "beforeafter";
      pairs: { before: string; after: string }[];
    })
  | (RenderedSectionBase & {
      kind: "instagram";
      items: { bg: string; label: string }[];
    })
  | (RenderedSectionBase & { kind: "custom"; body: string });

export interface RenderedSectionContent {
  services: ServiceListItem[];
  team: TeamCardItem[];
}

export function buildRenderedSection(
  key: BodySectionKey,
  base: RenderedSectionBase,
  p: BodySectionPropsMap[BodySectionKey],
  accent: string,
  dark: boolean,
  device: "desktop" | "phone",
  sInk: string,
  sMuted: string,
  sHair: string,
  content: RenderedSectionContent,
): RenderedSection {
  base.padY = padMap[p.spacing];

  if (key === "services") {
    const sp = p as BodySectionPropsMap["services"];
    const count = content.services.length;
    return {
      ...base,
      kind: "services",
      layout: sp.layout,
      cols: "3",
      items: content.services,
      meta: sp.prices
        ? `${count} services · prices shown`
        : `${count} services · from-prices only`,
    };
  }
  if (key === "team") {
    const tp = p as BodySectionPropsMap["team"];
    return {
      ...base,
      kind: "team",
      cols: String(tp.cols),
      ratings: tp.ratings,
      items: content.team,
      meta: `${content.team.length} people`,
    };
  }
  if (key === "gallery") {
    const gp = p as BodySectionPropsMap["gallery"];
    return {
      ...base,
      kind: "gallery",
      layout: gp.layout,
      cols: String(gp.cols),
      items: [],
      meta: "No photos uploaded yet",
    };
  }
  if (key === "reviews") {
    const rp = p as BodySectionPropsMap["reviews"];
    return {
      ...base,
      kind: "reviews",
      layout: rp.layout,
      items: NO_REVIEWS,
      meta: "No reviews yet",
    };
  }
  if (key === "about") {
    const ap = p as BodySectionPropsMap["about"];
    return {
      ...base,
      kind: "about",
      cols:
        device === "phone"
          ? "1fr"
          : ap.align === "center"
            ? "1fr"
            : "1.2fr 1fr",
      order: ap.align === "right" ? "2" : "1",
      photoOrder: ap.align === "right" ? "1" : "2",
      body: ap.body,
      meta: "",
    };
  }
  if (key === "hours") {
    const hp = p as BodySectionPropsMap["hours"];
    return {
      ...base,
      kind: "hours",
      showMap: hp.map,
      cols: device === "phone" ? "1fr" : "1fr 1fr",
      rows: NO_HOURS,
      meta: "Hours not set yet",
    };
  }
  if (key === "offers") {
    const op = p as BodySectionPropsMap["offers"];
    return {
      ...base,
      kind: "offers",
      cols:
        op.layout === "banner" ? "1fr" : device === "phone" ? "1fr" : "1fr 1fr",
      items: [],
      meta: "No active offers",
    };
  }
  if (key === "loyalty") {
    const lp = p as BodySectionPropsMap["loyalty"];
    return {
      ...base,
      kind: "loyalty",
      cols: String(lp.cols),
      items: [],
      meta: "No membership plans yet",
    };
  }
  if (key === "faq") {
    return { ...base, kind: "faq", items: NO_FAQ, meta: "No questions yet" };
  }
  if (key === "beforeafter") {
    return { ...base, kind: "beforeafter", pairs: [], meta: "No photos yet" };
  }
  if (key === "instagram") {
    return { ...base, kind: "instagram", items: [], meta: "Not connected" };
  }
  const cp = p as BodySectionPropsMap["custom"];
  return { ...base, kind: "custom", body: cp.body, meta: "" };
}
