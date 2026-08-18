export type SpacingOption = "compact" | "normal" | "roomy";
export type BgOption = "page" | "tinted" | "dark";
export type DeviceOption = "desktop" | "phone";
export type SurfaceOption = "light" | "dark";

export interface SectionBaseProps {
  heading: string;
  spacing: SpacingOption;
  bg: BgOption;
  bleed: boolean;
}

export interface ServicesProps extends SectionBaseProps {
  layout: "list" | "cards" | "table";
  prices: boolean;
}
export interface TeamProps extends SectionBaseProps {
  cols: number;
  ratings: boolean;
}
export interface GalleryProps extends SectionBaseProps {
  layout: "grid" | "strip";
  cols: number;
}
export interface ReviewsProps extends SectionBaseProps {
  layout: "quote" | "cards";
  verified: boolean;
}
export interface AboutProps extends SectionBaseProps {
  align: "left" | "right" | "center";
}
export interface HoursProps extends SectionBaseProps {
  map: boolean;
}
export interface OffersProps extends SectionBaseProps {
  layout: "cards" | "banner";
}
export interface LoyaltyProps extends SectionBaseProps {
  cols: number;
}
export type FaqProps = SectionBaseProps;
export type BeforeAfterProps = SectionBaseProps;
export type InstagramProps = SectionBaseProps;
export type CustomProps = SectionBaseProps;

export interface BodySectionPropsMap {
  services: ServicesProps;
  team: TeamProps;
  gallery: GalleryProps;
  reviews: ReviewsProps;
  about: AboutProps;
  hours: HoursProps;
  offers: OffersProps;
  loyalty: LoyaltyProps;
  faq: FaqProps;
  beforeafter: BeforeAfterProps;
  instagram: InstagramProps;
  custom: CustomProps;
}

export type BodySectionKey = keyof BodySectionPropsMap;

export interface NavProps {
  sticky: boolean;
  showName: boolean;
  showLinks: boolean;
  cta: string;
  bg: "solid" | "transparent";
}

export interface HeroProps {
  layout: "fullbleed" | "split" | "centered";
  height: "compact" | "standard" | "tall";
  title: string;
  sub: string;
  cta: string;
  second: boolean;
  trust: boolean;
}

export interface FooterProps {
  cols: number;
  signup: boolean;
  badge: boolean;
}

export type SelectedKey = "nav" | "hero" | "footer" | BodySectionKey;

export interface BuilderProps extends BodySectionPropsMap {
  nav: NavProps;
  hero: HeroProps;
  footer: FooterProps;
}

export interface SectionMetaEntry {
  name: string;
  mono: string;
  body: string;
  needs: string;
}

export interface Chip {
  label: string;
  pick: () => void;
  border: string;
  bg: string;
  color: string;
  weight: "400" | "600";
}
