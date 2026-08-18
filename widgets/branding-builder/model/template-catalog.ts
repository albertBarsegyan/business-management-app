export type TemplateId =
  | "minimal"
  | "editorial"
  | "dark"
  | "grid"
  | "clinic"
  | "storefront"
  | "timetable";

export const TEMPLATE_IDS: TemplateId[] = [
  "minimal",
  "editorial",
  "dark",
  "grid",
  "clinic",
  "storefront",
  "timetable",
];

export function coverGradient(a: string, b: string) {
  return `repeating-linear-gradient(135deg, ${a} 0 9px, ${b} 9px 18px)`;
}

export type TemplateSpec = {
  name: string;
  coverH: string;
  hero: string;
  sectionSize: string;
  services: "list" | "cards" | "table" | "timetable";
  gallery: boolean;
  review: boolean;
  trust: boolean;
  teamCols: number;
  cardCols: number;
  editorial: boolean;
  heroName: boolean;
};

export const specByTemplate: Record<TemplateId, TemplateSpec> = {
  minimal: { name: "Minimal", coverH: "0px", hero: "34px", sectionSize: "19px", services: "list", gallery: false, review: true, trust: false, teamCols: 3, cardCols: 3, editorial: false, heroName: true },
  editorial: { name: "Editorial", coverH: "196px", hero: "34px", sectionSize: "21px", services: "list", gallery: false, review: true, trust: false, teamCols: 3, cardCols: 3, editorial: true, heroName: false },
  dark: { name: "Dark studio", coverH: "150px", hero: "32px", sectionSize: "19px", services: "list", gallery: true, review: true, trust: false, teamCols: 3, cardCols: 3, editorial: false, heroName: true },
  grid: { name: "Photo grid", coverH: "96px", hero: "28px", sectionSize: "18px", services: "cards", gallery: true, review: false, trust: false, teamCols: 3, cardCols: 3, editorial: false, heroName: true },
  clinic: { name: "Clinic", coverH: "84px", hero: "30px", sectionSize: "19px", services: "table", gallery: false, review: true, trust: true, teamCols: 3, cardCols: 3, editorial: false, heroName: true },
  storefront: { name: "Storefront", coverH: "72px", hero: "30px", sectionSize: "19px", services: "table", gallery: false, review: false, trust: true, teamCols: 2, cardCols: 2, editorial: false, heroName: true },
  timetable: { name: "Timetable", coverH: "110px", hero: "30px", sectionSize: "19px", services: "timetable", gallery: false, review: true, trust: false, teamCols: 3, cardCols: 3, editorial: false, heroName: true },
};

export type TemplateMeta = {
  kicker: string;
  bestFor: string;
  needs: string;
  hero: string;
};

export const templateMeta: Record<TemplateId, TemplateMeta> = {
  minimal: { kicker: "Type-led", bestFor: "Barbershops, self-employed masters, anyone with no photos yet", needs: "Nothing — zero images", hero: "No cover. Name at 34px, hours and address right under it." },
  editorial: { kicker: "Photo hero", bestFor: "Hair salons, brow & lash studios, one strong photo", needs: "1 cover photo, 1600×900", hero: "Full-bleed cover with the name set over it." },
  dark: { kicker: "Dark canvas", bestFor: "Tattoo studios, nail bars, late-night barbers", needs: "Cover + logo on transparent", hero: "Dark surface, accent-lit rows, gallery strip." },
  grid: { kicker: "Gallery first", bestFor: "Nails, colourists, makeup — the work sells itself", needs: "6+ square photos", hero: "Short header, then a 3×2 gallery before anything else." },
  clinic: { kicker: "Trust-led", bestFor: "Dental, medical, physio, diagnostics", needs: "Licence + insurance text", hero: "Calm header, credentials row, price table." },
  storefront: { kicker: "Price list", bestFor: "Auto service, dry cleaning, repair, consumer services", needs: "Address, phone and hours", hero: "Hours and phone above the fold, map beside them." },
  timetable: { kicker: "Class schedule", bestFor: "Fitness studios, dance, schools, group classes", needs: "A recurring class schedule", hero: "This-week strip, then classes with spots left." },
};

export type ServiceItem = {
  name: string;
  meta: string;
  duration: string;
  price: string;
  thumb: string;
};

export const serviceSets: Record<"default" | "clinic" | "storefront", ServiceItem[]> = {
  default: [
    { name: "Men's cut & beard trim", meta: "45 min · with wash", duration: "45 min", price: "7 500 ֏", thumb: coverGradient("oklch(0.6 0.09 350)", "oklch(0.53 0.09 350)") },
    { name: "Men's haircut", meta: "45 min", duration: "45 min", price: "6 000 ֏", thumb: coverGradient("oklch(0.62 0.06 300)", "oklch(0.55 0.06 300)") },
    { name: "Beard sculpt", meta: "30 min", duration: "30 min", price: "5 000 ֏", thumb: coverGradient("oklch(0.6 0.07 60)", "oklch(0.53 0.07 60)") },
    { name: "Head shave & hot towel", meta: "30 min", duration: "30 min", price: "5 500 ֏", thumb: coverGradient("oklch(0.58 0.08 200)", "oklch(0.51 0.08 200)") },
  ],
  clinic: [
    { name: "Consultation & X-ray", meta: "40 min · Dr. Sargsyan", duration: "40 min", price: "8 000 ֏", thumb: coverGradient("oklch(0.5 0.1 225)", "oklch(0.43 0.1 225)") },
    { name: "Professional hygiene", meta: "60 min", duration: "60 min", price: "22 000 ֏", thumb: coverGradient("oklch(0.5 0.1 225)", "oklch(0.43 0.1 225)") },
    { name: "Filling, one tooth", meta: "45 min", duration: "45 min", price: "from 25 000 ֏", thumb: coverGradient("oklch(0.5 0.1 225)", "oklch(0.43 0.1 225)") },
    { name: "Whitening course", meta: "90 min", duration: "90 min", price: "68 000 ֏", thumb: coverGradient("oklch(0.5 0.1 225)", "oklch(0.43 0.1 225)") },
  ],
  storefront: [
    { name: "Full interior detail", meta: "180 min", duration: "180 min", price: "24 000 ֏", thumb: coverGradient("oklch(0.5 0.1 45)", "oklch(0.43 0.1 45)") },
    { name: "Wash & wax", meta: "60 min", duration: "60 min", price: "8 000 ֏", thumb: coverGradient("oklch(0.5 0.1 45)", "oklch(0.43 0.1 45)") },
    { name: "Tyre change, 4 wheels", meta: "45 min", duration: "45 min", price: "6 000 ֏", thumb: coverGradient("oklch(0.5 0.1 45)", "oklch(0.43 0.1 45)") },
    { name: "Headlight polish", meta: "40 min", duration: "40 min", price: "9 000 ֏", thumb: coverGradient("oklch(0.5 0.1 45)", "oklch(0.43 0.1 45)") },
  ],
};

export const accentSwatchColors = [
  "oklch(0.64 0.16 350)",
  "oklch(0.64 0.16 285)",
  "oklch(0.64 0.16 225)",
  "oklch(0.64 0.16 155)",
  "oklch(0.64 0.16 45)",
];
