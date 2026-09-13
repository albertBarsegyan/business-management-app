import type { SiteTheme } from "./theme";

/** Real catalog/team data, summarized for public display — never copied
 * into a section's stored `propsJson` (D4), only passed at render time by
 * whichever page assembles the site (the builder preview or the public
 * route), both fetching it fresh from the real backend. */
export interface ServiceSummary {
  id: string;
  name: string;
  durationLabel: string;
  priceLabel: string;
}

export interface TeamMemberSummary {
  id: string;
  name: string;
  firstName: string;
  roleTitle: string;
}

/**
 * Passed to every template's `component.tsx` alongside its own
 * `variables` — the "no data fetching inside component.tsx" rule (Phase 5
 * doc) means whoever assembles the page (builder preview, public route)
 * fetches this once and threads it through uniformly. Most templates
 * ignore the fields they don't need.
 */
export interface TemplateContext {
  theme: SiteTheme;
  venueName: string;
  services: ServiceSummary[];
  teamMembers: TeamMemberSummary[];
}
