import { serviceSets, specByTemplate, templateMeta, type TemplateId } from "../model/template-catalog";
import { trustItemsClinic, trustItemsDefault } from "../model/static-content";

export type BrandingSections = {
  services: boolean;
  team: boolean;
  reviews: boolean;
  gallery: boolean;
  hours: boolean;
  about: boolean;
};

export type BrandingState = {
  template: TemplateId;
  device: "desktop" | "phone";
  published: boolean;
  accent: string;
  sections: BrandingSections;
};

export const initialBrandingState: BrandingState = {
  template: "editorial",
  device: "desktop",
  published: false,
  accent: "oklch(0.64 0.16 350)",
  sections: { services: true, team: true, reviews: true, gallery: true, hours: true, about: false },
};

export function buildBrandingViewModel(state: BrandingState) {
  const { template: T, device, published, accent, sections } = state;
  const dark = T === "dark";
  const s = specByTemplate[T];

  const ink = dark ? "#FFFFFF" : "#16161A";
  const inkMuted = dark ? "rgba(255,255,255,0.58)" : "#5B6069";
  const hairline = dark ? "rgba(255,255,255,0.12)" : "#EEF0F2";
  const pageBg = dark ? "#15151B" : "#FFFFFF";
  const cardBg = dark ? "#1C1C23" : "#FFFFFF";

  const services = T === "clinic" ? serviceSets.clinic : T === "storefront" ? serviceSets.storefront : serviceSets.default;

  return {
    accent,
    dark,
    template: T,
    device,
    published,
    sections,

    statusLabel: published ? "Published · live" : "Draft — 4 unpublished changes",
    statusBg: published ? "#E7F8EE" : "#FEF6E0",
    statusColor: published ? "#17753C" : "#8A6A05",
    publishLabel: published ? "Published" : "Publish changes",
    publishBg: published ? "#EDEFF2" : "#FFC935",
    publishColor: published ? "#A9AEB6" : "#17170F",
    publishCursor: published ? "default" : "pointer",

    deviceLabel: device === "phone" ? "390 px" : "1280 px",
    frameWidth: device === "phone" ? "390px" : "100%",
    frameRadius: device === "phone" ? "18px" : "10px",

    templateName: s.name,
    templateHero: templateMeta[T].hero,

    pageBg,
    cardBg,
    hairline,
    inkStrong: ink,
    inkMuted,
    ratingColor: dark ? "#FFC935" : "#8A6A05",
    openColor: dark ? "#5FD68C" : "#17753C",
    ghostBorder: dark ? "rgba(255,255,255,0.22)" : "#D5D9DE",
    quoteBg: dark ? "#1C1C23" : "oklch(0.98 0.012 350)",
    quoteSize: T === "editorial" ? "22px" : "17px",
    tableHeadBg: dark ? "#1C1C23" : "#FAFBFC",
    mapBg: dark ? "#1C1C23" : "#F1F2F4",
    footerBg: dark ? "#101016" : "#FAFBFC",
    trustBg: dark ? "#1C1C23" : "oklch(0.98 0.012 225)",
    trustBorder: dark ? "rgba(255,255,255,0.12)" : "oklch(0.9 0.04 225)",
    logoBg: dark ? "#22222A" : "#FFFFFF",
    logoBorder: dark ? "rgba(255,255,255,0.14)" : "#E6E8EB",

    coverHeight: s.coverH,
    coverBg: T === "minimal" ? "transparent" : "repeating-linear-gradient(135deg, oklch(0.5 0.1 350) 0 9px, oklch(0.43 0.1 350) 9px 18px)",
    hasCover: T !== "minimal",
    isEditorial: s.editorial,
    showHeroName: s.heroName,
    heroSize: s.hero,
    sectionSize: s.sectionSize,
    headerPad: T === "minimal" ? "26px 16px 14px" : "14px 16px 14px",
    logoLift: T === "minimal" ? "0px" : "-28px",

    galleryFirst: T === "grid" && sections.gallery,

    showTrustRow: s.trust,
    trustItems: T === "clinic" ? trustItemsClinic : trustItemsDefault,

    servicesHeading: T === "timetable" ? "This week's classes" : T === "storefront" ? "Price list" : "Services",
    servicesMeta: T === "timetable" ? "18 classes" : `${services.length} of 24 shown`,
    servicesList: s.services === "list",
    servicesCards: s.services === "cards",
    servicesTable: s.services === "table",
    servicesTimetable: s.services === "timetable",
    cardCols: String(s.cardCols),
    teamCols: String(s.teamCols),
    services,

    teamHeading: T === "clinic" ? "Doctors" : T === "timetable" ? "Trainers" : "The team",
    showReview: s.review && sections.reviews,
    hoursCols: device === "phone" ? "1fr" : "1fr 1fr",

    checks: [
      { glyph: "✓", bg: "#22C55E", color: "#16161A", text: "24 services and 4 team members are visible to clients." },
      { glyph: "✓", bg: "#22C55E", color: "#16161A", text: "Hours match your work schedule — no bookable slot is outside them." },
      {
        glyph: "!",
        bg: "#F59E0B",
        color: "#8A6A05",
        text: T === "grid" ? "Photo grid wants 6 photos; you have 4. Two tiles will render empty." : "No cancellation policy text yet — clients see the default 2-hour rule.",
      },
    ],
  };
}

export type BrandingViewModel = ReturnType<typeof buildBrandingViewModel>;
