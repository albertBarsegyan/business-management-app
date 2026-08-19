"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  accentSwatchHexes,
  bodySectionOrderAll,
  coverGradient,
  defaultBuilderProps,
  defaultOrder,
  footerColumnsAll,
  heroHeights,
  heroTitleSizes,
  sectionMeta,
} from "./data";
import { buildRenderedSection, type RenderedSection, type RenderedSectionBase } from "./rendered-section";
import type {
  BodySectionKey,
  BodySectionPropsMap,
  BuilderProps,
  DeviceOption,
  SelectedKey,
  SurfaceOption,
} from "./types";

export interface ChipOption {
  label: string;
  active: boolean;
  onPick: () => void;
}
export interface ControlChips {
  kind: "chips";
  label: string;
  options: ChipOption[];
  hint?: string;
}
export interface ControlSwitch {
  kind: "switch";
  label: string;
  switchLabel: string;
  on: boolean;
  onToggle: () => void;
  hint?: string;
}
export interface ControlText {
  kind: "text";
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}
export type Control = ControlChips | ControlSwitch | ControlText;

export interface StructureRow {
  key: SelectedKey;
  label: string;
  grip: string;
  movable: boolean;
  locked: boolean;
  meta: string;
  selected: boolean;
  on: boolean;
  onSelect: () => void;
  onToggle?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export interface LibraryCard {
  key: BodySectionKey;
  name: string;
  mono: string;
  body: string;
  needs: string;
  added: boolean;
  onAdd: () => void;
}

function chip(label: string, on: boolean, pick: () => void): ChipOption {
  return { label, active: on, onPick: pick };
}

export function useLandingBuilder(options?: { interactive?: boolean }) {
  const interactive = options?.interactive ?? true;
  const [accent, setAccent] = useState(accentSwatchHexes[0]);
  const [surface, setSurface] = useState<SurfaceOption>("light");
  const [device, setDevice] = useState<DeviceOption>("desktop");
  const [published, setPublished] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedKey>("hero");
  const [order, setOrder] = useState<BodySectionKey[]>(defaultOrder);
  const [enabled, setEnabled] = useState<Partial<Record<BodySectionKey, boolean>>>(
    Object.fromEntries(defaultOrder.map((k) => [k, true])) as Partial<Record<BodySectionKey, boolean>>
  );
  const [props, setProps] = useState<BuilderProps>(defaultBuilderProps);
  const [scale, setScale] = useState(1);
  const [frameH, setFrameH] = useState(0);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const frame = frameRef.current;
      if (!wrap || !frame) return;
      const design = device === "phone" ? 390 : 1280;
      const next = Math.min(1, wrap.clientWidth / design);
      const h = frame.offsetHeight * next;
      setScale((cur) => (Math.abs(cur - next) > 0.002 ? next : cur));
      setFrameH((cur) => (Math.abs(cur - h) > 1 ? h : cur));
    };
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (frameRef.current) ro.observe(frameRef.current);
    measure();
    return () => ro.disconnect();
  }, [device, order, enabled, props]);

  function markDirty() {
    setPublished(false);
  }

  function setBodyProp<K extends BodySectionKey>(key: K, patch: Partial<BodySectionPropsMap[K]>) {
    setProps((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
    markDirty();
  }
  function setNavProp(patch: Partial<BuilderProps["nav"]>) {
    setProps((prev) => ({ ...prev, nav: { ...prev.nav, ...patch } }));
    markDirty();
  }
  function setHeroProp(patch: Partial<BuilderProps["hero"]>) {
    setProps((prev) => ({ ...prev, hero: { ...prev.hero, ...patch } }));
    markDirty();
  }
  function setFooterProp(patch: Partial<BuilderProps["footer"]>) {
    setProps((prev) => ({ ...prev, footer: { ...prev.footer, ...patch } }));
    markDirty();
  }

  function toggleEnabled(key: BodySectionKey) {
    setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));
    markDirty();
  }
  function moveUp(key: BodySectionKey) {
    setOrder((prev) => {
      const i = prev.indexOf(key);
      if (i <= 0) return prev;
      const next = prev.slice();
      next[i] = next[i - 1];
      next[i - 1] = key;
      return next;
    });
    markDirty();
  }
  function moveDown(key: BodySectionKey) {
    setOrder((prev) => {
      const i = prev.indexOf(key);
      if (i === -1 || i >= prev.length - 1) return prev;
      const next = prev.slice();
      next[i] = next[i + 1];
      next[i + 1] = key;
      return next;
    });
    markDirty();
  }
  function addSection(key: BodySectionKey) {
    setOrder((prev) => (prev.includes(key) ? prev : prev.concat([key])));
    setEnabled((prev) => ({ ...prev, [key]: true }));
    setSelected(key);
    setLibraryOpen(false);
    markDirty();
  }
  function applyRecommended() {
    setOrder(defaultOrder);
    setEnabled(Object.fromEntries(bodySectionOrderAll.map((k) => [k, defaultOrder.includes(k)])) as Partial<Record<BodySectionKey, boolean>>);
    setPublished(false);
    setSelected("hero");
  }

  const dark = surface === "dark";
  const ink = dark ? "#FFFFFF" : "#16161A";
  const inkMuted = dark ? "rgba(255,255,255,0.58)" : "#5B6069";
  const pageBg = dark ? "#15151B" : "#FFFFFF";
  const hairline = dark ? "rgba(255,255,255,0.12)" : "#EEF0F2";
  const ghostBorder = dark ? "rgba(255,255,255,0.22)" : "#D5D9DE";
  const coverBg = coverGradient("oklch(0.5 0.1 350)", "oklch(0.43 0.1 350)");
  const gutter = device === "phone" ? "16px" : "26px";

  function outline(key: SelectedKey) {
    if (!interactive) return "0";
    return selected === key ? "2px solid #FFC935" : "0";
  }
  function select(key: SelectedKey) {
    return interactive ? () => setSelected(key) : () => {};
  }
  function secBg(key: BodySectionKey) {
    const b = props[key].bg;
    if (b === "dark") return "#15151B";
    if (b === "tinted") return dark ? "#1A1A21" : "oklch(0.985 0.008 350)";
    return pageBg;
  }
  function secDark(key: BodySectionKey) {
    return props[key].bg === "dark" || dark;
  }

  const enabledCount = order.filter((k) => enabled[k]).length;

  const renderedSections: RenderedSection[] = useMemo(
    () =>
      order
        .filter((k) => enabled[k])
        .map((key) => {
          const p = props[key];
          const d = secDark(key);
          const sInk = d ? "#FFFFFF" : "#16161A";
          const sMuted = d ? "rgba(255,255,255,0.58)" : "#5B6069";
          const sHair = d ? "rgba(255,255,255,0.12)" : "#EEF0F2";
          const base: RenderedSectionBase = {
            key,
            heading: p.heading,
            padY: "",
            padX: p.bleed ? "0px" : gutter,
            bg: secBg(key),
            ink: sInk,
            inkMuted: sMuted,
            hairline: sHair,
            cardBg: d ? "#1C1C23" : "#FFFFFF",
            ghost: d ? "rgba(255,255,255,0.22)" : "#D5D9DE",
            quoteBg: d ? "#1C1C23" : "oklch(0.98 0.012 350)",
            mapBg: d ? "#1C1C23" : "#F1F2F4",
            ratingColor: d ? "#FFC935" : "#8A6A05",
            outline: outline(key),
            meta: "",
            onSelect: select(key),
          };
          return buildRenderedSection(key, base, p, accent, dark, device, sInk, sMuted, sHair);
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, enabled, props, accent, dark, device, selected, gutter]
  );

  const navLinks = order
    .filter((k) => enabled[k])
    .slice(0, 4)
    .map((k) => props[k].heading);

  const structureRow = (key: BodySectionKey): StructureRow => {
    const on = !!enabled[key];
    return {
      key,
      label: sectionMeta[key].name,
      grip: "⠿",
      movable: true,
      locked: false,
      meta: sectionSummary(key),
      selected: selected === key,
      on,
      onSelect: () => setSelected(key),
      onToggle: () => toggleEnabled(key),
      onMoveUp: () => moveUp(key),
      onMoveDown: () => moveDown(key),
    };
  };
  const fixedRow = (key: "nav" | "hero" | "footer", label: string): StructureRow => ({
    key,
    label,
    grip: "◆",
    movable: false,
    locked: true,
    meta: key === "nav" ? "logo, links, CTA" : key === "hero" ? "above the fold" : "contact, legal, social",
    selected: selected === key,
    on: true,
    onSelect: () => setSelected(key),
  });

  function sectionSummary(key: BodySectionKey): string {
    const p = props[key];
    switch (key) {
      case "services": {
        const sp = p as BodySectionPropsMap["services"];
        return `24 services · ${sp.layout}${sp.prices ? " · prices" : " · from-prices"}`;
      }
      case "team": {
        const tp = p as BodySectionPropsMap["team"];
        return `4 people · ${tp.cols} columns`;
      }
      case "gallery": {
        const gp = p as BodySectionPropsMap["gallery"];
        return `18 photos · ${gp.layout}${gp.layout === "grid" ? ` of ${gp.cols}` : ""}`;
      }
      case "reviews": {
        const rp = p as BodySectionPropsMap["reviews"];
        return `218 reviews · ${rp.layout === "quote" ? "pull-quote" : "three cards"}`;
      }
      case "about": {
        const ap = p as BodySectionPropsMap["about"];
        return `since 2016 · ${ap.align === "center" ? "no photo" : "photo " + (ap.align === "left" ? "right" : "left")}`;
      }
      case "hours": {
        const hp = p as BodySectionPropsMap["hours"];
        return `Kentron · ${hp.map ? "with map" : "no map"}`;
      }
      case "offers": {
        const op = p as BodySectionPropsMap["offers"];
        return `2 active · ${op.layout === "banner" ? "banner" : "two cards"}`;
      }
      case "loyalty": {
        const lp = p as BodySectionPropsMap["loyalty"];
        return `3 plans · ${lp.cols} columns`;
      }
      case "faq":
        return "5 questions · accordion";
      case "beforeafter":
        return "6 pairs · two across";
      case "instagram":
        return "@studioaram · 6 latest";
      case "custom":
        return "heading, text, image, button";
      default:
        return "";
    }
  }

  const structure: StructureRow[] = [fixedRow("nav", "Navbar"), fixedRow("hero", "Hero")]
    .concat(order.map((k) => structureRow(k)))
    .concat([fixedRow("footer", "Footer")]);

  const library: LibraryCard[] = bodySectionOrderAll.map((key) => ({
    key,
    name: sectionMeta[key].name,
    mono: sectionMeta[key].mono,
    body: sectionMeta[key].body,
    needs: sectionMeta[key].needs,
    added: order.includes(key) && !!enabled[key],
    onAdd: () => addSection(key),
  }));

  const isBody = order.includes(selected as BodySectionKey);
  const panelMap: Record<string, { kicker: string; title: string; hint: string }> = {
    nav: { kicker: "Fixed · always first", title: "Navbar", hint: "Links come from your enabled sections. Mobile always collapses to a drawer." },
    hero: { kicker: "Fixed · above the fold", title: "Hero", hint: "The one section a client always sees. Keep the promise and the button visible without scrolling." },
    footer: { kicker: "Fixed · always last", title: "Footer", hint: "Contact, legal and the SMS list. The Zhamo badge is removable on paid plans." },
  };
  const panel = panelMap[selected] ?? {
    kicker: "Body section · movable",
    title: sectionMeta[selected as BodySectionKey].name,
    hint: sectionMeta[selected as BodySectionKey].body,
  };

  function C(label: string, options: ChipOption[], hint?: string): ControlChips {
    return { kind: "chips", label, options, hint };
  }
  function S(label: string, switchLabel: string, on: boolean, onToggle: () => void, hint?: string): ControlSwitch {
    return { kind: "switch", label, switchLabel, on, onToggle, hint };
  }
  function TXT(label: string, value: string, onChange: (v: string) => void, hint?: string): ControlText {
    return { kind: "text", label, value, onChange, hint };
  }

  let specificTitle = "Options";
  let specificControls: Control[] = [];

  if (selected === "nav") {
    specificTitle = "Navbar";
    const p = props.nav;
    specificControls = [
      C("Logo", [
        chip("Mark + name", p.showName, () => setNavProp({ showName: true })),
        chip("Mark only", !p.showName, () => setNavProp({ showName: false })),
      ]),
      C(
        "Behaviour",
        [chip("Sticky", p.sticky, () => setNavProp({ sticky: true })), chip("Static", !p.sticky, () => setNavProp({ sticky: false }))],
        p.sticky ? "Follows the client down the page." : "Scrolls away with the hero."
      ),
      S("Section links", "Show links from sections", p.showLinks, () => setNavProp({ showLinks: !p.showLinks })),
      TXT("CTA label", p.cta, (v) => setNavProp({ cta: v })),
    ];
  } else if (selected === "hero") {
    specificTitle = "Hero";
    const p = props.hero;
    specificControls = [
      C("Layout", [
        chip("Full-bleed", p.layout === "fullbleed", () => setHeroProp({ layout: "fullbleed" })),
        chip("Split", p.layout === "split", () => setHeroProp({ layout: "split" })),
        chip("Centered", p.layout === "centered", () => setHeroProp({ layout: "centered" })),
      ]),
      C("Height", [
        chip("Compact", p.height === "compact", () => setHeroProp({ height: "compact" })),
        chip("Standard", p.height === "standard", () => setHeroProp({ height: "standard" })),
        chip("Tall", p.height === "tall", () => setHeroProp({ height: "tall" })),
      ]),
      TXT("Headline", p.title, (v) => setHeroProp({ title: v })),
      TXT("Subline", p.sub, (v) => setHeroProp({ sub: v })),
      TXT("Button label", p.cta, (v) => setHeroProp({ cta: v })),
      S("Secondary button", 'Show "Call us"', p.second, () => setHeroProp({ second: !p.second })),
      S("Trust strip", "Rating, reviews, hours", p.trust, () => setHeroProp({ trust: !p.trust })),
    ];
  } else if (selected === "footer") {
    specificTitle = "Footer";
    const p = props.footer;
    specificControls = [
      C(
        "Columns",
        [2, 3, 4].map((n) => chip(String(n), p.cols === n, () => setFooterProp({ cols: n })))
      ),
      S("SMS list", "Signup row", p.signup, () => setFooterProp({ signup: !p.signup })),
      S("Zhamo badge", "Powered by Zhamo", p.badge, () => setFooterProp({ badge: !p.badge }), "Removable on paid plans."),
    ];
  } else if (selected === "services") {
    specificTitle = "Services";
    const p = props.services;
    specificControls = [
      C("Layout", [
        chip("List", p.layout === "list", () => setBodyProp("services", { layout: "list" })),
        chip("Cards", p.layout === "cards", () => setBodyProp("services", { layout: "cards" })),
        chip("Table", p.layout === "table", () => setBodyProp("services", { layout: "table" })),
      ]),
      S("Prices", "Show exact prices", p.prices, () => setBodyProp("services", { prices: !p.prices }), p.prices ? "" : 'Clients see "from" prices only.'),
    ];
  } else if (selected === "team") {
    specificTitle = "Team";
    const p = props.team;
    specificControls = [
      C(
        "Columns",
        [2, 3, 4].map((n) => chip(String(n), p.cols === n, () => setBodyProp("team", { cols: n })))
      ),
      S("Ratings", "Show star ratings", p.ratings, () => setBodyProp("team", { ratings: !p.ratings })),
    ];
  } else if (selected === "gallery") {
    specificTitle = "Gallery";
    const p = props.gallery;
    specificControls = [
      C("Layout", [chip("Grid", p.layout === "grid", () => setBodyProp("gallery", { layout: "grid" })), chip("Strip", p.layout === "strip", () => setBodyProp("gallery", { layout: "strip" }))]),
      C(
        "Grid columns",
        [3, 4, 6].map((n) => chip(String(n), p.cols === n, () => setBodyProp("gallery", { cols: n }))),
        "18 photos uploaded."
      ),
    ];
  } else if (selected === "reviews") {
    specificTitle = "Reviews";
    const p = props.reviews;
    specificControls = [
      C("Layout", [chip("Pull-quote", p.layout === "quote", () => setBodyProp("reviews", { layout: "quote" })), chip("Three cards", p.layout === "cards", () => setBodyProp("reviews", { layout: "cards" }))]),
      S("Source", "Zhamo verified only", p.verified, () => setBodyProp("reviews", { verified: !p.verified })),
    ];
  } else if (selected === "about") {
    specificTitle = "About";
    const p = props.about;
    specificControls = [
      C("Photo side", [
        chip("Photo right", p.align === "left", () => setBodyProp("about", { align: "left" })),
        chip("Photo left", p.align === "right", () => setBodyProp("about", { align: "right" })),
        chip("No photo", p.align === "center", () => setBodyProp("about", { align: "center" })),
      ]),
    ];
  } else if (selected === "hours") {
    specificTitle = "Hours & location";
    const p = props.hours;
    specificControls = [S("Map", "Show map", p.map, () => setBodyProp("hours", { map: !p.map }), "Hours are read from your work schedule — edit them there.")];
  } else if (selected === "offers") {
    specificTitle = "Offers";
    const p = props.offers;
    specificControls = [C("Layout", [chip("Two cards", p.layout === "cards", () => setBodyProp("offers", { layout: "cards" })), chip("Full banner", p.layout === "banner", () => setBodyProp("offers", { layout: "banner" }))])];
  } else if (selected === "loyalty") {
    specificTitle = "Memberships";
    const p = props.loyalty;
    specificControls = [
      C(
        "Columns",
        [2, 3].map((n) => chip(String(n), p.cols === n, () => setBodyProp("loyalty", { cols: n })))
      ),
    ];
  } else {
    const key = selected as BodySectionKey;
    specificTitle = sectionMeta[key]?.name ?? "Options";
    specificControls = [C("Content", [chip("Managed in this section's own screen", true, () => {})], "This block takes its content from your catalogue — layout only here.")];
  }

  const heroTitleSize = device === "phone" ? "32px" : heroTitleSizes[props.hero.height];
  const heroHeight = heroHeights[props.hero.height];

  const accentSwatches = accentSwatchHexes.map((hex) => ({
    hex,
    border: accent === hex ? "#16161A" : "transparent",
    onPick: () => {
      setAccent(hex);
      markDirty();
    },
  }));
  const surfaceOptions: ChipOption[] = [
    chip("Light", surface === "light", () => {
      setSurface("light");
      markDirty();
    }),
    chip("Dark", surface === "dark", () => {
      setSurface("dark");
      markDirty();
    }),
  ];

  const checks = [
    { glyph: "✓", bg: "#22C55E", color: "#16161A", text: "Hero, navbar CTA and footer all point at the same booking flow." },
    { glyph: "✓", bg: "#22C55E", color: "#16161A", text: "Hours match your work schedule — no bookable slot falls outside them." },
    {
      glyph: "!",
      bg: "#F59E0B",
      color: "#8A6A05",
      text: enabledCount > 6 ? `${enabledCount} sections is a long scroll — clients book fastest with five or fewer.` : "No cancellation policy text yet; clients see the default 2-hour rule.",
    },
  ];

  const footerColumns = footerColumnsAll.slice(0, props.footer.cols);

  return {
    accent,
    surface,
    dark,
    device,
    setDevice: (d: DeviceOption) => setDevice(d),
    published,
    publish: () => setPublished((p) => !p),
    libraryOpen,
    openLibrary: () => setLibraryOpen(true),
    closeLibrary: () => setLibraryOpen(false),
    selected,
    ink,
    inkMuted,
    pageBg,
    hairline,
    ghostBorder,
    coverBg,
    gutter,
    wrapRef,
    frameRef,
    scale,
    frameH,
    enabledCount,
    structure,
    library,
    applyRecommended,
    sectionBudget: `${enabledCount} of 8 body sections in use. Fewer sections book better than more.`,

    nav: props.nav,
    navOutline: outline("nav"),
    navBg: props.nav.bg === "solid" ? (dark ? "#101016" : "#FFFFFF") : "transparent",
    navShowLinks: props.nav.showLinks && device !== "phone",
    navShowBurger: device === "phone",
    navShowCta: device !== "phone",
    navLinks,
    selectNavbar: select("nav"),
    interactive,

    hero: props.hero,
    heroOutline: outline("hero"),
    heroHeight,
    heroTitleSize,
    selectHero: select("hero"),

    renderedSections,

    footer: props.footer,
    footerOutline: outline("footer"),
    footerColumns,
    selectFooter: select("footer"),

    panel,
    isBody,
    panelHeading: isBody ? props[selected as BodySectionKey].heading : "",
    setPanelHeading: (v: string) => {
      if (isBody) setBodyProp(selected as BodySectionKey, { heading: v } as Partial<BodySectionPropsMap[BodySectionKey]>);
    },
    spacingOptions: (["compact", "normal", "roomy"] as const).map((v) =>
      chip(v[0].toUpperCase() + v.slice(1), isBody && props[selected as BodySectionKey].spacing === v, () => {
        if (isBody) setBodyProp(selected as BodySectionKey, { spacing: v } as Partial<BodySectionPropsMap[BodySectionKey]>);
      })
    ),
    bgOptions: ([["page", "Page"], ["tinted", "Tinted"], ["dark", "Dark"]] as const).map(([v, label]) =>
      chip(label, isBody && props[selected as BodySectionKey].bg === v, () => {
        if (isBody) setBodyProp(selected as BodySectionKey, { bg: v } as Partial<BodySectionPropsMap[BodySectionKey]>);
      })
    ),
    bleedOn: isBody && props[selected as BodySectionKey].bleed,
    toggleBleed: () => {
      if (isBody) {
        const key = selected as BodySectionKey;
        setBodyProp(key, { bleed: !props[key].bleed } as Partial<BodySectionPropsMap[BodySectionKey]>);
      }
    },

    specificTitle,
    specificControls,

    accentSwatches,
    surfaceOptions,
    checks,
  };
}

export type LandingBuilderState = ReturnType<typeof useLandingBuilder>;
