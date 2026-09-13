/**
 * Hand-written types for the site (public page builder) endpoints, standing
 * in until the backend's OpenAPI spec is exported and openapi-typescript
 * generates shared/api/generated/schema.d.ts (see business-management-infra
 * CLAUDE.md §3).
 */

export type SiteType = "marketing" | "booking" | "combined";
export type SiteStatus = "draft" | "published" | "suspended";

export interface Site {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  name: string;
  siteType: SiteType;
  defaultLocale: string;
  status: SiteStatus;
  publishedRevisionId: string | null;
}

export type SiteRevisionState = "draft" | "published" | "archived";

export interface SiteRevision {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  siteId: string;
  revisionNumber: number;
  state: SiteRevisionState;
  baseRevisionId: string | null;
  templateCode: string;
  schemaVersion: number;
  themeJson: Record<string, unknown>;
  navigationJson: Record<string, unknown>;
  footerJson: Record<string, unknown>;
  changeCount: number;
  createdByMembershipId: string | null;
  publishedAt: string | null;
  publishedByMembershipId: string | null;
}

export interface SitePage {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  revisionId: string;
  stableKey: string;
  slug: string;
  title: string;
  pageType: string;
  position: number;
  isHome: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  socialImageAssetId: string | null;
}

export const SITE_SECTION_TYPES = [
  "hero",
  "services",
  "team",
  "locations",
  "gallery",
  "reviews",
  "hours",
  "faq",
  "custom",
] as const;
export type SiteSectionType = (typeof SITE_SECTION_TYPES)[number];

export interface SiteSection {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  pageId: string;
  stableKey: string;
  sectionType: SiteSectionType;
  templateKey: string | null;
  position: number;
  enabled: boolean;
  schemaVersion: number;
  propsJson: Record<string, unknown>;
}

export interface CreateSiteRequest {
  name: string;
  siteType?: SiteType;
  defaultLocale?: string;
  templateCode: string;
}

export interface CreateSitePageRequest {
  slug: string;
  title: string;
  pageType: string;
  isHome?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateSitePageRequest {
  slug?: string;
  title?: string;
  isHome?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface CreateSiteSectionRequest {
  sectionType: SiteSectionType;
  templateKey: string;
  enabled?: boolean;
  propsJson: Record<string, unknown>;
  position?: number;
}

export interface UpdateSiteSectionRequest {
  enabled?: boolean;
  propsJson?: Record<string, unknown>;
  position?: number;
}

export interface ReorderSectionsRequest {
  sections: { id: string; position: number }[];
}

export interface UpdateSiteRevisionRequest {
  themeJson?: Record<string, unknown>;
  navigationJson?: Record<string, unknown>;
  footerJson?: Record<string, unknown>;
}

export interface AssetUploadResponse {
  assetId: string;
}

export interface PublishSiteResult {
  published: SiteRevision;
  draft: SiteRevision;
}

export interface PublicSiteSection {
  id: string;
  stableKey: string;
  sectionType: SiteSectionType;
  templateKey: string | null;
  position: number;
  schemaVersion: number;
  propsJson: Record<string, unknown>;
}

export interface PublicSitePage {
  id: string;
  stableKey: string;
  slug: string;
  title: string;
  pageType: string;
  position: number;
  isHome: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  sections: PublicSiteSection[];
}

export interface PublicService {
  id: string;
  name: string;
  durationLabel: string;
  priceLabel: string;
}

export interface PublicTeamMember {
  id: string;
  name: string;
  firstName: string;
  roleTitle: string;
}

export interface PublicSite {
  name: string;
  defaultLocale: string;
  themeJson: Record<string, unknown>;
  navigationJson: Record<string, unknown>;
  footerJson: Record<string, unknown>;
  pages: PublicSitePage[];
  services: PublicService[];
  teamMembers: PublicTeamMember[];
}
