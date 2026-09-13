import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedSite } from "@/entities/site/api/get-published-site";
import { SiteSectionRenderer } from "@/entities/site-section/ui/site-section-renderer";
import { parseTheme } from "@/entities/site-section/model/parse-theme";
import { deriveThemeTokens } from "@/entities/site-section/model/theme";
import type { TemplateContext } from "@/entities/site-section/model/template-context";
import { assetUrl } from "@/shared/lib/asset-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  if (!site) {
    return { title: "Site not found" };
  }
  return { title: site.name };
}

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  if (!site) {
    notFound();
  }

  const theme = parseTheme(site.themeJson);
  const tokens = deriveThemeTokens(theme);
  const context: TemplateContext = {
    theme,
    venueName: site.name,
    services: site.services,
    teamMembers: site.teamMembers,
  };

  const homePage = site.pages.find((p) => p.isHome) ?? site.pages[0];
  const nav = site.navigationJson as {
    showLinks?: boolean;
    ctaLabel?: string;
  };
  const footer = site.footerJson as {
    columns?: { title: string; items: string[] }[];
    copyrightText?: string;
  };

  return (
    <div style={{ background: tokens.pageBg, minHeight: "100vh" }}>
      <header
        style={{
          height: 64,
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${tokens.hairline}`,
        }}
      >
        {theme.logoAssetId ? (
          // eslint-disable-next-line @next/next/no-img-element -- venue-controlled logo, arbitrary aspect ratio
          <img
            src={assetUrl(theme.logoAssetId)}
            alt={site.name}
            style={{ height: 32, width: "auto" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 18,
              fontWeight: 700,
              color: tokens.ink,
            }}
          >
            {site.name}
          </span>
        )}
        {nav.ctaLabel && (
          <a
            href="#book"
            style={{
              marginLeft: "auto",
              height: 38,
              padding: "0 16px",
              borderRadius: 7,
              background: theme.accent,
              color: "#FFFFFF",
              fontSize: 13.5,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            {nav.ctaLabel}
          </a>
        )}
      </header>

      <main>
        {homePage?.sections.map((section) => (
          <SiteSectionRenderer
            key={section.id}
            templateKey={section.templateKey}
            propsJson={section.propsJson}
            context={context}
          />
        ))}
      </main>

      <footer
        style={{
          padding: "32px 5vw",
          borderTop: `1px solid ${tokens.hairline}`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {footer.columns && footer.columns.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${footer.columns.length}, 1fr)`,
              gap: 16,
            }}
          >
            {footer.columns.map((col, i) => (
              <div
                key={i}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: tokens.inkMuted,
                  }}
                >
                  {col.title}
                </span>
                {col.items.map((item, j) => (
                  <span key={j} style={{ fontSize: 13, color: tokens.ink }}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
        <span style={{ fontSize: 12, color: tokens.inkMuted }}>
          {footer.copyrightText || `© ${new Date().getFullYear()} ${site.name}`}
        </span>
      </footer>
    </div>
  );
}
