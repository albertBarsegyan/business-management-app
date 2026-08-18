import { TEMPLATE_IDS, specByTemplate, templateMeta, type TemplateId } from "../model/template-catalog";

const servicesAsCopy: Record<string, string> = {
  list: "One list, price right-aligned, Book on every row",
  cards: "Cards with a photo each, three across",
  table: "Table with duration and price, searchable",
  timetable: "Week strip plus classes with spots left",
};

const proofCopy: Record<TemplateId, string> = {
  minimal: "Rating line only — nothing to load",
  editorial: "One pull-quote review at 22px",
  dark: "Gallery strip, Instagram-style",
  grid: "The gallery itself, 3×2 above services",
  clinic: "Licence, insurance and doctor credentials",
  storefront: "Hours, phone and map",
  timetable: "Trainer row with ratings",
};

const stripeById: Record<TemplateId, string | null> = {
  minimal: "#16161A",
  editorial: null,
  dark: "#15151B",
  grid: null,
  clinic: "oklch(0.64 0.16 225)",
  storefront: "oklch(0.64 0.16 45)",
  timetable: "oklch(0.64 0.16 155)",
};

export function buildCatalogue(accent: string) {
  return TEMPLATE_IDS.map((id) => ({
    id,
    name: specByTemplate[id].name,
    kicker: templateMeta[id].kicker,
    stripe: stripeById[id] ?? accent,
    specs: [
      { k: "Best for", v: templateMeta[id].bestFor },
      { k: "Needs", v: templateMeta[id].needs },
      { k: "Hero", v: templateMeta[id].hero },
      { k: "Services as", v: servicesAsCopy[specByTemplate[id].services] },
      { k: "Proof", v: proofCopy[id] },
    ],
  }));
}
