import type { SiteSectionTemplate } from "../model/template";

import { meta as aboutMeta } from "./about/meta";
import { aboutFields, aboutSchema } from "./about/schema";
import { defaults as aboutDefaults } from "./about/defaults";
import { Component as AboutComponent } from "./about/component";

import { meta as beforeAfterMeta } from "./beforeafter/meta";
import { beforeAfterFields, beforeAfterSchema } from "./beforeafter/schema";
import { defaults as beforeAfterDefaults } from "./beforeafter/defaults";
import { Component as BeforeAfterComponent } from "./beforeafter/component";

import { meta as customMeta } from "./custom/meta";
import { customFields, customSchema } from "./custom/schema";
import { defaults as customDefaults } from "./custom/defaults";
import { Component as CustomComponent } from "./custom/component";

import { meta as faqMeta } from "./faq/meta";
import { faqFields, faqSchema } from "./faq/schema";
import { defaults as faqDefaults } from "./faq/defaults";
import { Component as FaqComponent } from "./faq/component";

import { meta as finalCtaMeta } from "./final-cta/meta";
import { finalCtaFields, finalCtaSchema } from "./final-cta/schema";
import { defaults as finalCtaDefaults } from "./final-cta/defaults";
import { Component as FinalCtaComponent } from "./final-cta/component";

import { meta as galleryMeta } from "./gallery/meta";
import { galleryFields, gallerySchema } from "./gallery/schema";
import { defaults as galleryDefaults } from "./gallery/defaults";
import { Component as GalleryComponent } from "./gallery/component";

import { meta as heroMeta } from "./hero/meta";
import { heroFields, heroSchema } from "./hero/schema";
import { defaults as heroDefaults } from "./hero/defaults";
import { Component as HeroComponent } from "./hero/component";

import { meta as hoursMeta } from "./hours/meta";
import { hoursFields, hoursSchema } from "./hours/schema";
import { defaults as hoursDefaults } from "./hours/defaults";
import { Component as HoursComponent } from "./hours/component";

import { meta as instagramMeta } from "./instagram/meta";
import { instagramFields, instagramSchema } from "./instagram/schema";
import { defaults as instagramDefaults } from "./instagram/defaults";
import { Component as InstagramComponent } from "./instagram/component";

import { meta as loyaltyMeta } from "./loyalty/meta";
import { loyaltyFields, loyaltySchema } from "./loyalty/schema";
import { defaults as loyaltyDefaults } from "./loyalty/defaults";
import { Component as LoyaltyComponent } from "./loyalty/component";

import { meta as offersMeta } from "./offers/meta";
import { offersFields, offersSchema } from "./offers/schema";
import { defaults as offersDefaults } from "./offers/defaults";
import { Component as OffersComponent } from "./offers/component";

import { meta as reviewsMeta } from "./reviews/meta";
import { reviewsFields, reviewsSchema } from "./reviews/schema";
import { defaults as reviewsDefaults } from "./reviews/defaults";
import { Component as ReviewsComponent } from "./reviews/component";

import { meta as servicesMeta } from "./services/meta";
import { servicesFields, servicesSchema } from "./services/schema";
import { defaults as servicesDefaults } from "./services/defaults";
import { Component as ServicesComponent } from "./services/component";

import { meta as teamMeta } from "./team/meta";
import { teamFields, teamSchema } from "./team/schema";
import { defaults as teamDefaults } from "./team/defaults";
import { Component as TeamComponent } from "./team/component";

/**
 * The template registry (Phase 5 / D4): templates live in the frontend,
 * keyed by `templateKey` — the same key a `SiteSection.templateKey` stores
 * server-side. `widgets/landing-builder` and the public `/s/[slug]` route
 * both render through this one map, so they can never visually diverge.
 */
export const templateRegistry = {
  hero: {
    meta: heroMeta,
    schema: heroSchema,
    fields: heroFields,
    defaults: heroDefaults,
    Component: HeroComponent,
  },
  services: {
    meta: servicesMeta,
    schema: servicesSchema,
    fields: servicesFields,
    defaults: servicesDefaults,
    Component: ServicesComponent,
  },
  team: {
    meta: teamMeta,
    schema: teamSchema,
    fields: teamFields,
    defaults: teamDefaults,
    Component: TeamComponent,
  },
  gallery: {
    meta: galleryMeta,
    schema: gallerySchema,
    fields: galleryFields,
    defaults: galleryDefaults,
    Component: GalleryComponent,
  },
  reviews: {
    meta: reviewsMeta,
    schema: reviewsSchema,
    fields: reviewsFields,
    defaults: reviewsDefaults,
    Component: ReviewsComponent,
  },
  about: {
    meta: aboutMeta,
    schema: aboutSchema,
    fields: aboutFields,
    defaults: aboutDefaults,
    Component: AboutComponent,
  },
  hours: {
    meta: hoursMeta,
    schema: hoursSchema,
    fields: hoursFields,
    defaults: hoursDefaults,
    Component: HoursComponent,
  },
  offers: {
    meta: offersMeta,
    schema: offersSchema,
    fields: offersFields,
    defaults: offersDefaults,
    Component: OffersComponent,
  },
  loyalty: {
    meta: loyaltyMeta,
    schema: loyaltySchema,
    fields: loyaltyFields,
    defaults: loyaltyDefaults,
    Component: LoyaltyComponent,
  },
  faq: {
    meta: faqMeta,
    schema: faqSchema,
    fields: faqFields,
    defaults: faqDefaults,
    Component: FaqComponent,
  },
  beforeafter: {
    meta: beforeAfterMeta,
    schema: beforeAfterSchema,
    fields: beforeAfterFields,
    defaults: beforeAfterDefaults,
    Component: BeforeAfterComponent,
  },
  instagram: {
    meta: instagramMeta,
    schema: instagramSchema,
    fields: instagramFields,
    defaults: instagramDefaults,
    Component: InstagramComponent,
  },
  custom: {
    meta: customMeta,
    schema: customSchema,
    fields: customFields,
    defaults: customDefaults,
    Component: CustomComponent,
  },
  "final-cta": {
    meta: finalCtaMeta,
    schema: finalCtaSchema,
    fields: finalCtaFields,
    defaults: finalCtaDefaults,
    Component: FinalCtaComponent,
  },
};

export type TemplateKey = keyof typeof templateRegistry;

export const TEMPLATE_KEYS = Object.keys(templateRegistry) as TemplateKey[];

/**
 * A dynamic lookup by a runtime `templateKey` string can't carry a specific
 * variables type — every caller of this (the builder, the public renderer)
 * already treats `variables`/`propsJson` as loosely-typed JSON at this
 * boundary, validating it against `schema` before use.
 */
export function getTemplate(
  templateKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see doc comment above
): SiteSectionTemplate<any> | undefined {
  const registry = templateRegistry as Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see doc comment above
    SiteSectionTemplate<any> | undefined
  >;
  return registry[templateKey];
}
