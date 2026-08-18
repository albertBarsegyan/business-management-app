import { coverGradient } from "./template-catalog";

export const teamMembers = [
  { name: "Karen Sahakyan", role: "Barber · 9 years", rating: "4.9", photo: coverGradient("oklch(0.55 0.09 350)", "oklch(0.48 0.09 350)") },
  { name: "Davit Melkonyan", role: "Barber · 4 years", rating: "4.8", photo: coverGradient("oklch(0.55 0.08 285)", "oklch(0.48 0.08 285)") },
  { name: "Mariam Petrosyan", role: "Colourist", rating: "5.0", photo: coverGradient("oklch(0.55 0.08 225)", "oklch(0.48 0.08 225)") },
];

export const galleryTiles = [1, 2, 3, 4, 5, 6].map((i) => ({
  bg: coverGradient(
    `oklch(${(0.52 + (i % 3) * 0.05).toFixed(2)} 0.09 ${330 + i * 8})`,
    `oklch(${(0.45 + (i % 3) * 0.05).toFixed(2)} 0.09 ${330 + i * 8})`,
  ),
  label: i === 1 ? "1200×1200" : "",
}));

export const classes = [
  { time: "07:30", name: "Reformer, level 2", who: "Ani Melkonyan · 50 min", spots: "3 spots", spotsKind: "warn" as const },
  { time: "09:00", name: "Mat pilates", who: "Ani Melkonyan · 55 min", spots: "8 spots", spotsKind: "ok" as const },
  { time: "18:30", name: "Reformer, beginners", who: "Tigran A. · 50 min", spots: "1 spot", spotsKind: "danger" as const },
  { time: "20:00", name: "Stretch & release", who: "Ani Melkonyan · 45 min", spots: "6 spots", spotsKind: "ok" as const },
];

export const weekStripBase = [
  { dow: "Mon", day: "18" },
  { dow: "Tue", day: "19" },
  { dow: "Wed", day: "20" },
  { dow: "Thu", day: "21" },
  { dow: "Fri", day: "22" },
  { dow: "Sat", day: "23" },
  { dow: "Sun", day: "24" },
];

export const hours = [
  { d: "Mon–Fri", t: "09:00 – 22:00" },
  { d: "Saturday", t: "10:00 – 20:00" },
  { d: "Sunday", t: "closed" },
];

export const trustItemsClinic = [
  { k: "Licence AM-4471", v: "Ministry of Health" },
  { k: "Insurance", v: "Sil, Ingo, Reso" },
  { k: "12 doctors", v: "avg. 14 years" },
];

export const trustItemsDefault = [
  { k: "Open till 20:00", v: "Mon–Sat" },
  { k: "+374 10 543 220", v: "call for urgent jobs" },
  { k: "Free pickup", v: "within Kentron" },
];

export const bookingRules = [
  { label: "Accept online bookings", meta: "off = the page shows a phone number instead", on: true },
  { label: "Require SMS confirmation", meta: "one 4-digit code, no account", on: true },
  { label: "Show prices publicly", meta: "off = \"from\" prices only", on: true },
  { label: "Take deposits", meta: "20% on services over 20 000 ֏", on: false },
];

export const principles = [
  { k: "Templates never touch booking", v: "All seven wrap the same five-step flow from the widget. Switching template can't lose a service, a price or a booking." },
  { k: "Accent is inherited, not chosen", v: "The vertical accent flows in from onboarding. Owners can shift hue, never lightness — so no template can be made unreadable." },
  { k: "Yellow stays the action", v: "Book now is #FFC935 on every template, dark ones included. It's the one thing a client must find in under a second." },
  { k: "Publish is explicit", v: "Edits accumulate as a draft with a change count. Nothing reaches clients until Publish, and the live page keeps serving in the meantime." },
];

export const navRows = [
  { label: "Reports", mono: "RP", depth: 0 },
  { label: "Team", mono: "TM", depth: 0 },
  { label: "Clients", mono: "CL", depth: 0 },
  { label: "Online booking", mono: "OB", depth: 0, expanded: true },
  { label: "Branding page", mono: "", depth: 1, active: true },
  { label: "Booking settings", mono: "", depth: 1 },
  { label: "Services", mono: "SV", depth: 0 },
  { label: "Finance", mono: "FN", depth: 0 },
  { label: "Loyalty", mono: "LY", depth: 0 },
];
