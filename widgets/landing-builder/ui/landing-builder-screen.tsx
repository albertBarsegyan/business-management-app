"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseTheme } from "@/entities/site-section/model/parse-theme";
import type { TemplateContext } from "@/entities/site-section/model/template-context";
import { useServicesQuery } from "@/shared/api/catalog/queries";
import {
  useCreateSiteMutation,
  usePublishSiteMutation,
  useSiteDraftQuery,
  useSitePagesQuery,
  useSiteQuery,
  useSiteSectionsQuery,
} from "@/shared/api/site/queries";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import { useVenueQuery } from "@/shared/api/venue/queries";
import { Button } from "@/shared/ui/button";
import { PageHeader, PageShell } from "@/widgets/day-calendar";
import { LivePreview } from "./live-preview";
import { PageSidebar } from "./page-sidebar";
import { SectionPanel } from "./section-panel";

/**
 * Phase 5's registry-based rewrite of the staff-facing landing builder —
 * every section renders through `entities/site-section/templates`, the
 * same registry the public `/s/[slug]` route uses, so the two can never
 * visually diverge (Phase 5 doc §3: "uses the same component.tsx as the
 * public renderer").
 */
export function LandingBuilderScreen() {
  const siteQuery = useSiteQuery();
  const createSite = useCreateSiteMutation();
  const publishSite = usePublishSiteMutation();
  const venueQuery = useVenueQuery();
  const pagesQuery = useSitePagesQuery(Boolean(siteQuery.data));
  const draftQuery = useSiteDraftQuery(Boolean(siteQuery.data));
  const servicesQuery = useServicesQuery();
  const teamQuery = useTeamMembersQuery();

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const pages = pagesQuery.data ?? [];
  // Derived, not effect+setState: falls back to the home page (or the
  // first page) until the user explicitly picks one.
  const activePageId =
    selectedPageId ?? pages.find((p) => p.isHome)?.id ?? pages[0]?.id ?? null;
  const sectionsQuery = useSiteSectionsQuery(activePageId);

  if (siteQuery.isPending) {
    return (
      <PageShell>
        <PageHeader title="Website builder" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </PageShell>
    );
  }

  if (!siteQuery.data) {
    return (
      <PageShell>
        <PageHeader
          title="Website builder"
          subtitle="Build your public booking site."
        />
        <div className="flex max-w-md flex-col gap-3 rounded-lg border border-border p-6">
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created a site yet.
          </p>
          <Button
            type="button"
            disabled={createSite.isPending || !venueQuery.data}
            onClick={() =>
              venueQuery.data &&
              createSite.mutate({
                name: venueQuery.data.name,
                templateCode: "default",
              })
            }
          >
            Create site
          </Button>
        </div>
      </PageShell>
    );
  }

  const theme = draftQuery.data
    ? parseTheme(draftQuery.data.themeJson)
    : undefined;
  const context: TemplateContext | undefined = theme
    ? {
        theme,
        venueName: venueQuery.data?.name ?? "",
        services: (servicesQuery.data ?? []).map((s) => ({
          id: s.id,
          name: s.name,
          durationLabel: "",
          priceLabel: "",
        })),
        teamMembers: (teamQuery.data ?? []).map((m) => ({
          id: m.id,
          name: m.displayName,
          firstName: m.firstName,
          roleTitle: m.positionTitle,
        })),
      }
    : undefined;

  return (
    <PageShell>
      <PageHeader
        title="Website builder"
        subtitle="Build your public booking site."
        action={
          <Button
            type="button"
            disabled={publishSite.isPending}
            onClick={() =>
              publishSite.mutate(undefined, {
                onSuccess: () => toast.success("Published."),
                onError: () => toast.error("Couldn't publish."),
              })
            }
          >
            {publishSite.isPending ? "Publishing…" : "Publish"}
          </Button>
        }
      />

      <div className="flex h-[70vh] overflow-hidden rounded-lg border border-border">
        <PageSidebar
          pages={pages}
          activePageId={activePageId}
          onSelect={setSelectedPageId}
        />
        {activePageId && (
          <SectionPanel
            pageId={activePageId}
            sections={sectionsQuery.data ?? []}
          />
        )}
        {context && (
          <LivePreview sections={sectionsQuery.data ?? []} context={context} />
        )}
      </div>
    </PageShell>
  );
}
