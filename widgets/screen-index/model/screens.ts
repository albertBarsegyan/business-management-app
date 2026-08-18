export type ScreenCard = {
  n: string;
  kicker: string;
  href: string;
  title: string;
  body: string;
  states: string[];
  tile: string;
  tileText: string;
};

export const screenCards: ScreenCard[] = [
  {
    n: "00",
    kicker: "Foundation",
    href: "/design-system",
    title: "Design system",
    body: "Palette, six vertical accents, type scale, density contract, components in every state, copy rules.",
    states: ["tokens", "components", "voice"],
    tile: "#FFC935",
    tileText: "#17170F",
  },
  {
    n: "01",
    kicker: "Home screen",
    href: "/day-calendar",
    title: "Day calendar",
    body: "Sidebar (collapsible), month rail with density, quick actions, four master columns, overlaps, break, no-show.",
    states: ["busy day", "day one", "collapsed nav"],
    tile: "oklch(0.64 0.16 350)",
    tileText: "#FFFFFF",
  },
  {
    n: "02",
    kicker: "First run",
    href: "/onboarding",
    title: "Onboarding",
    body: "Three screens, countdown rail instead of a stepper, and the moment the vertical accent takes over the page.",
    states: ["select open", "accent takeover", "promo code"],
    tile: "oklch(0.64 0.16 285)",
    tileText: "#FFFFFF",
  },
  {
    n: "03",
    kicker: "Forced setup",
    href: "/setup",
    title: "Setup modal",
    body: "Service, team member, schedule — with a skeleton pane that assembles as you type, then the completion screen.",
    states: ["3 steps", "custom hours", "done"],
    tile: "oklch(0.64 0.16 155)",
    tileText: "#FFFFFF",
  },
  {
    n: "04",
    kicker: "Densest screen",
    href: "/appointment-panel",
    title: "Appointment panel",
    body: "Timing, cart and client in three columns over a dimmed calendar. Saved toast, edit mode, conflict recovery.",
    states: ["new", "edit", "conflict"],
    tile: "oklch(0.64 0.16 225)",
    tileText: "#FFFFFF",
  },
  {
    n: "05",
    kicker: "Management",
    href: "/team-and-clients",
    title: "Team & clients",
    body: "Grouped team table with schedule badges and invites; client base with segments, locked columns, bulk actions.",
    states: ["team", "clients", "empty", "add client"],
    tile: "oklch(0.64 0.16 45)",
    tileText: "#FFFFFF",
  },
  {
    n: "06",
    kicker: "Client side",
    href: "/booking",
    title: "Booking widget",
    body: "Mobile five-step booking with no account, the embedded desktop version, and barbershop vs dental clinic side by side.",
    states: ["5 steps", "day full", "slot taken", "embed"],
    tile: "oklch(0.64 0.16 110)",
    tileText: "#FFFFFF",
  },
  {
    n: "07",
    kicker: "Owner branding",
    href: "/branding",
    title: "Branding page builder",
    body: "Template gallery, live preview at phone and desktop width, section toggles, publish flow — plus the seven-template catalogue.",
    states: ["7 templates", "draft/published", "phone + desktop"],
    tile: "#FFC935",
    tileText: "#17170F",
  },
  {
    n: "08",
    kicker: "Owner site",
    href: "/landing-builder",
    title: "Landing page builder",
    body: "Navbar, hero, footer and twelve addable body sections — every one configurable, reorderable and previewed live.",
    states: ["12 sections", "light + dark", "section library"],
    tile: "oklch(0.64 0.16 285)",
    tileText: "#FFFFFF",
  },
];
