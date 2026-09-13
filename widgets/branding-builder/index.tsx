"use client";

import { parseTheme } from "@/entities/site-section/model/parse-theme";
import type { SiteTheme } from "@/entities/site-section/model/theme";
import { SiteSectionRenderer } from "@/entities/site-section/ui/site-section-renderer";
import { useDebouncedCallback } from "@/shared/lib/use-debounced-callback";
import {
  useSiteDraftQuery,
  useSitePagesQuery,
  useSiteQuery,
  useSiteSectionsQuery,
  useUpdateDraftRevisionMutation,
  useUploadSiteImageMutation,
} from "@/shared/api/site/queries";
import { useVenueQuery } from "@/shared/api/venue/queries";
import { Button } from "@/shared/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { PageHeader, PageShell } from "@/widgets/day-calendar";
import { useRef, useState } from "react";

const AUTOSAVE_DELAY_MS = 500;

/**
 * From-scratch (audit F: "does not exist" before Phase 5). Edits the
 * draft revision's `themeJson` — public site only (Decision I.2), the
 * dashboard keeps its own fixed design system. Every template already
 * derives its palette from this same `SiteTheme` (`deriveThemeTokens`),
 * so a change here is visually consistent everywhere immediately.
 */
export function BrandingBuilderScreen() {
  const siteQuery = useSiteQuery();
  const draftQuery = useSiteDraftQuery(Boolean(siteQuery.data));
  const pagesQuery = useSitePagesQuery(Boolean(siteQuery.data));
  const venueQuery = useVenueQuery();
  const updateDraft = useUpdateDraftRevisionMutation();
  const upload = useUploadSiteImageMutation();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  const homePage = (pagesQuery.data ?? []).find((p) => p.isHome);
  const sectionsQuery = useSiteSectionsQuery(homePage?.id ?? null);
  const firstSection = (sectionsQuery.data ?? [])[0];

  const debouncedSave = useDebouncedCallback((theme: SiteTheme) => {
    setSaveState("saving");
    updateDraft.mutate(
      { themeJson: { ...theme } },
      { onSuccess: () => setSaveState("saved") },
    );
  }, AUTOSAVE_DELAY_MS);

  if (siteQuery.isPending || draftQuery.isPending) {
    return (
      <PageShell>
        <PageHeader title="Branding" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </PageShell>
    );
  }

  if (!draftQuery.data) {
    return (
      <PageShell>
        <PageHeader
          title="Branding"
          subtitle="Colors, fonts, and logo for your public site."
        />
        <p className="text-sm text-muted-foreground">
          Create your site first, in the website builder.
        </p>
      </PageShell>
    );
  }

  const theme = parseTheme(draftQuery.data.themeJson);

  function setTheme(patch: Partial<SiteTheme>) {
    const next = { ...theme, ...patch };
    debouncedSave(next);
  }

  return (
    <PageShell>
      <PageHeader
        title="Branding"
        subtitle="Colors, fonts, and logo for your public site — the dashboard keeps its own look (Decision I.2)."
      />

      <div className="flex gap-6">
        <div className="flex w-80 flex-col gap-4 rounded-lg border border-border p-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Accent color</FieldLabel>
              <Input
                type="color"
                value={theme.accent.startsWith("#") ? theme.accent : "#000000"}
                onChange={(e) => setTheme({ accent: e.target.value })}
                className="h-9 w-16 p-1"
              />
            </Field>
            <Field>
              <FieldLabel>Surface</FieldLabel>
              <Select
                value={theme.surface}
                onValueChange={(v) =>
                  setTheme({ surface: v as SiteTheme["surface"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Corner radius</FieldLabel>
              <Select
                value={theme.radius}
                onValueChange={(v) =>
                  setTheme({ radius: v as SiteTheme["radius"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sharp">Sharp</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                  <SelectItem value="pill">Pill</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Font</FieldLabel>
              <Select
                value={theme.fontFamily}
                onValueChange={(v) =>
                  setTheme({ fontFamily: v as SiteTheme["fontFamily"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sans">Sans-serif</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>Logo</FieldLabel>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  upload.mutate(file, {
                    onSuccess: (result) =>
                      setTheme({ logoAssetId: result.assetId }),
                  });
                  e.target.value = "";
                }}
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={upload.isPending}
                  onClick={() => logoInputRef.current?.click()}
                >
                  {upload.isPending
                    ? "Uploading…"
                    : theme.logoAssetId
                      ? "Replace"
                      : "Upload"}
                </Button>
                {theme.logoAssetId && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme({ logoAssetId: null })}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </Field>
          </FieldGroup>
          <span className="text-xs text-muted-foreground">
            {saveState === "saving"
              ? "Saving…"
              : saveState === "saved"
                ? "Saved"
                : ""}
          </span>
        </div>

        <div className="flex-1 overflow-hidden rounded-lg border border-border">
          {firstSection ? (
            <SiteSectionRenderer
              templateKey={firstSection.templateKey}
              propsJson={firstSection.propsJson}
              context={{
                theme,
                venueName: venueQuery.data?.name ?? "",
                services: [],
                teamMembers: [],
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-10 text-sm text-muted-foreground">
              Add a section in the website builder to preview your branding.
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
