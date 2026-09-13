import type { RenderedSection } from "../../model/rendered-section";
import { AboutBlock } from "./section-kinds/about-block";
import { BeforeAfter } from "./section-kinds/before-after";
import { FaqAccordion } from "./section-kinds/faq-accordion";
import { GalleryGrid, GalleryStrip } from "./section-kinds/gallery";
import { HoursBlock } from "./section-kinds/hours-block";
import { InstagramGrid } from "./section-kinds/instagram-grid";
import { LoyaltyGrid } from "./section-kinds/loyalty-grid";
import { OffersGrid } from "./section-kinds/offers-grid";
import { ReviewCards, ReviewQuote } from "./section-kinds/reviews";
import { ServicesCards } from "./section-kinds/services-cards";
import { ServicesList } from "./section-kinds/services-list";
import { ServicesTable } from "./section-kinds/services-table";
import { TeamGrid } from "./section-kinds/team-grid";
import { CustomBlock } from "./section-kinds/custom-block";

export function PreviewSection({
  sec,
  accent,
  coverBg,
}: {
  sec: RenderedSection;
  accent: string;
  coverBg: string;
}) {
  return (
    <div
      onClick={sec.onSelect}
      style={{
        padding: `${sec.padY} ${sec.padX}`,
        background: sec.bg,
        borderTop: `1px solid ${sec.hairline}`,
        cursor: "pointer",
        outline: sec.outline,
        outlineOffset: -2,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 24,
            lineHeight: 1.06,
            letterSpacing: "-0.022em",
            fontWeight: 700,
            color: sec.ink,
          }}
        >
          {sec.heading}
        </span>
        <span
          style={{ fontSize: 11.5, color: sec.inkMuted, whiteSpace: "nowrap" }}
        >
          {sec.meta}
        </span>
      </div>

      {sec.kind === "services" && sec.layout === "list" && (
        <ServicesList
          items={sec.items}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          ghost={sec.ghost}
        />
      )}
      {sec.kind === "services" && sec.layout === "cards" && (
        <ServicesCards
          items={sec.items}
          cols={sec.cols}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          cardBg={sec.cardBg}
        />
      )}
      {sec.kind === "services" && sec.layout === "table" && (
        <ServicesTable
          items={sec.items}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          ghost={sec.ghost}
          cardBg={sec.cardBg}
        />
      )}

      {sec.kind === "team" && (
        <TeamGrid
          items={sec.items}
          cols={sec.cols}
          ratings={sec.ratings}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          ghost={sec.ghost}
          cardBg={sec.cardBg}
          ratingColor={sec.ratingColor}
        />
      )}

      {sec.kind === "gallery" && sec.layout === "grid" && (
        <GalleryGrid items={sec.items} cols={sec.cols} />
      )}
      {sec.kind === "gallery" && sec.layout === "strip" && (
        <GalleryStrip items={sec.items} />
      )}

      {sec.kind === "reviews" && sec.layout === "quote" && (
        <ReviewQuote
          items={sec.items}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          quoteBg={sec.quoteBg}
          accent={accent}
        />
      )}
      {sec.kind === "reviews" && sec.layout === "cards" && (
        <ReviewCards
          items={sec.items}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          cardBg={sec.cardBg}
          ratingColor={sec.ratingColor}
        />
      )}

      {sec.kind === "about" && (
        <AboutBlock
          body={sec.body}
          cols={sec.cols}
          order={sec.order}
          photoOrder={sec.photoOrder}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          coverBg={coverBg}
        />
      )}
      {sec.kind === "hours" && (
        <HoursBlock
          cols={sec.cols}
          rows={sec.rows}
          showMap={sec.showMap}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          ghost={sec.ghost}
          hairline={sec.hairline}
          mapBg={sec.mapBg}
        />
      )}
      {sec.kind === "offers" && (
        <OffersGrid items={sec.items} cols={sec.cols} />
      )}
      {sec.kind === "loyalty" && (
        <LoyaltyGrid
          items={sec.items}
          cols={sec.cols}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          cardBg={sec.cardBg}
        />
      )}
      {sec.kind === "faq" && (
        <FaqAccordion
          items={sec.items}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          hairline={sec.hairline}
          cardBg={sec.cardBg}
        />
      )}
      {sec.kind === "beforeafter" && (
        <BeforeAfter pairs={sec.pairs} hairline={sec.hairline} />
      )}
      {sec.kind === "instagram" && (
        <InstagramGrid items={sec.items} inkMuted={sec.inkMuted} />
      )}
      {sec.kind === "custom" && (
        <CustomBlock
          body={sec.body}
          ink={sec.ink}
          inkMuted={sec.inkMuted}
          coverBg={coverBg}
        />
      )}
    </div>
  );
}
