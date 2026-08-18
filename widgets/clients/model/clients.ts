export type Segment = { label: string; count: string; border: string; bg: string; color: string; weight: string };

export const segments: Segment[] = [
  { label: "New", count: "48", border: "#16161A", bg: "#16161A", color: "#FFFFFF", weight: "600" },
  { label: "Returning", count: "612", border: "#D5D9DE", bg: "#FFFFFF", color: "#16161A", weight: "400" },
  { label: "Lost", count: "97", border: "#D5D9DE", bg: "#FFFFFF", color: "#16161A", weight: "400" },
  { label: "Expiring membership", count: "12", border: "#D5D9DE", bg: "#FFFFFF", color: "#16161A", weight: "400" },
];

export const clientFilters = ["Appointments", "Clients", "Sales"];

export type ClientRow = {
  name: string;
  initials: string;
  avatar: string;
  phone: string;
  email: string;
  sold: string;
  balance: string;
  balanceColor: string;
  visits: string;
  discount: string;
  last: string;
  first: string;
  check: string;
  checkBg: string;
  checkBorder: string;
  bg: string;
  vip: boolean;
};

export const clientRows: ClientRow[] = [
  { name: "Anahit Grigoryan", initials: "AG", avatar: "oklch(0.64 0.16 350)", phone: "+374 77 214 508", email: "anahit.g@mail.am", sold: "96 000 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "14", discount: "10%", last: "02.07.2026", first: "14.02.2024", check: "✓", checkBg: "#FFC935", checkBorder: "#FFC935", bg: "#FFFDF6", vip: true },
  { name: "Sona Avagyan", initials: "SA", avatar: "oklch(0.64 0.16 285)", phone: "+374 91 442 108", email: "sona.avagyan@gmail.com", sold: "212 500 ֏", balance: "15 000 ֏", balanceColor: "#17753C", visits: "31", discount: "15%", last: "11.08.2026", first: "03.06.2023", check: "✓", checkBg: "#FFC935", checkBorder: "#FFC935", bg: "#FFFDF6", vip: true },
  { name: "Gor Hakobyan", initials: "GH", avatar: "#8A9099", phone: "+374 55 018 774", email: "—", sold: "18 000 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "3", discount: "—", last: "29.07.2026", first: "12.05.2026", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FFFFFF", vip: false },
  { name: "Mane Hovhannisyan", initials: "MH", avatar: "oklch(0.64 0.16 225)", phone: "+374 98 220 315", email: "mane.h@mail.am", sold: "74 200 ֏", balance: "−4 000 ֏", balanceColor: "#C7302F", visits: "9", discount: "5%", last: "06.08.2026", first: "22.11.2025", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FAFBFC", vip: false },
  { name: "Vahe Manukyan", initials: "VM", avatar: "oklch(0.64 0.16 45)", phone: "+374 77 903 461", email: "vahe.m@mail.am", sold: "41 000 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "7", discount: "—", last: "01.08.2026", first: "09.01.2026", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FFFFFF", vip: false },
  { name: "Nune Baghdasaryan", initials: "NB", avatar: "oklch(0.64 0.16 155)", phone: "+374 93 774 200", email: "nune.b@gmail.com", sold: "134 800 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "22", discount: "10%", last: "12.08.2026", first: "17.03.2024", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FAFBFC", vip: false },
  { name: "Arpine Ghazaryan", initials: "AG", avatar: "oklch(0.64 0.16 110)", phone: "+374 99 511 038", email: "—", sold: "9 000 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "1", discount: "—", last: "13.08.2026", first: "13.08.2026", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FFFFFF", vip: false },
  { name: "Suren Ghukasyan", initials: "SG", avatar: "#8A9099", phone: "+374 77 640 129", email: "suren.g@mail.am", sold: "57 500 ֏", balance: "0 ֏", balanceColor: "#16161A", visits: "11", discount: "—", last: "24.05.2026", first: "05.09.2024", check: "", checkBg: "#FFFFFF", checkBorder: "#C9CDD3", bg: "#FAFBFC", vip: false },
];

export const pages = ["‹", "1", "2", "3", "…", "50", "›"].map((label) => ({
  label,
  border: label === "1" ? "#16161A" : "#D5D9DE",
  bg: label === "1" ? "#16161A" : "#FFFFFF",
  color: label === "1" ? "#FFFFFF" : "#5B6069",
  weight: label === "1" ? "600" : "400",
}));
