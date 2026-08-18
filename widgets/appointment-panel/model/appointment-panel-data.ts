import type { BackdropColumn, PanelMatch, PanelService, VisitStatus } from "./types";

export const statusStyle: Record<
  VisitStatus,
  { dot: string; border: string; bg: string; color: string; dotRadius: string }
> = {
  Pending: { dot: "#F59E0B", border: "#F5DFA0", bg: "#FFFDF6", color: "#8A6A05", dotRadius: "50%" },
  Arrived: { dot: "#22C55E", border: "#BBF0CE", bg: "#F1FCF5", color: "#17753C", dotRadius: "50%" },
  "No-show": { dot: "#EF4444", border: "#F3C7C7", bg: "#FFF5F5", color: "#C7302F", dotRadius: "1px" },
  Confirmed: { dot: "#2C6CF6", border: "#C8D9FD", bg: "#F4F8FF", color: "#1B4FCB", dotRadius: "2px" },
};

export const visitStatuses: VisitStatus[] = ["Pending", "Arrived", "No-show", "Confirmed"];

export const alternatives = [
  { time: "15:00", who: "· Karen", border: "#D5D9DE" },
  { time: "15:30", who: "· Karen", border: "#D5D9DE" },
  { time: "14:30", who: "· Davit", border: "#FFC935" },
  { time: "Waiting list", who: "", border: "#D5D9DE" },
];

export const tiles = [
  { mono: "AF", label: "Advanced fields", meta: "3 filled" },
  { mono: "RP", label: "Repeat", meta: "Off" },
  { mono: "NT", label: "Notifications", meta: "SMS + 2 h" },
];

export const services: PanelService[] = [
  {
    id: "mens-cut-beard",
    name: "Men's cut & beard trim",
    meta: "45 min · Karen, Davit",
    price: "7 500 ֏",
    selected: true,
    detail: { price: "7 500", discountPercent: "0", duration: "45 min", masterShare: "Master's cut share: 40% · 3 000 ֏" },
  },
  { id: "mens-haircut", name: "Men's haircut", meta: "45 min · Karen, Davit", price: "6 000 ֏" },
  { id: "beard-sculpt", name: "Beard sculpt", meta: "30 min · Karen, Davit", price: "5 000 ֏" },
  { id: "kids-cut", name: "Kids cut (under 12)", meta: "30 min · Davit", price: "4 000 ֏" },
  { id: "head-shave", name: "Head shave & hot towel", meta: "30 min · Karen", price: "5 500 ֏" },
];

export const matches: PanelMatch[] = [
  { name: "Anahit Grigoryan", phone: "+374 77 214 508", initials: "AG", avatar: "oklch(0.64 0.16 350)", visits: "14 visits", last: "last: 02.07.2026", linked: true },
  { name: "Anahit Karapetyan", phone: "+374 77 219 043", initials: "AK", avatar: "oklch(0.64 0.16 285)", visits: "2 visits", last: "last: 11.03.2026" },
  { name: "Armen Hovhannisyan", phone: "+374 77 210 771", initials: "AH", avatar: "#8A9099", visits: "1 visit", last: "last: 20.01.2026" },
];

export const backdropCols: BackdropColumn[] = [
  { blocks: [{ h: "60px", gap: "34px" }, { h: "40px", gap: "60px" }, { h: "80px", gap: "40px" }] },
  { blocks: [{ h: "200px", gap: "68px" }, { h: "100px", gap: "70px" }] },
  { blocks: [{ h: "66px", gap: "0px" }, { h: "134px", gap: "138px" }, { h: "66px", gap: "104px" }] },
  { blocks: [{ h: "32px", gap: "238px" }, { h: "50px", gap: "4px" }, { h: "66px", gap: "290px" }] },
];
