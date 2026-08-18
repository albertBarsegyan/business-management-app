export const teamFilters = ["Position", "Employment status", "Account status", "Access", "Included in plan"];

export type TeamRow = {
  name: string;
  position: string;
  initials: string;
  avatar: string;
  phone: string;
  email: string;
  schedule: string;
  schedBg: string;
  schedColor: string;
  toggleBg: string;
  knob: string;
  services: string;
  role: string;
  subscription: string;
  subColor: string;
  bg: string;
};

export const teamRows: TeamRow[] = [
  { name: "Karen Sahakyan", position: "· Barber", initials: "KS", avatar: "oklch(0.64 0.16 350)", phone: "+374 77 214 508", email: "karen@studioaram.am", schedule: "until 06.09.2026", schedBg: "#E7F8EE", schedColor: "#17753C", toggleBg: "#22C55E", knob: "16px", services: "12", role: "Professional", subscription: "Paid", subColor: "#16161A", bg: "#FFFFFF" },
  { name: "Mariam Petrosyan", position: "· Colourist", initials: "MP", avatar: "oklch(0.64 0.16 285)", phone: "+374 91 330 217", email: "mariam@studioaram.am", schedule: "until 06.09.2026", schedBg: "#E7F8EE", schedColor: "#17753C", toggleBg: "#22C55E", knob: "16px", services: "9", role: "Manager", subscription: "Paid", subColor: "#16161A", bg: "#FAFBFC" },
  { name: "Tigran Avetisyan", position: "· Invite sent", initials: "TA", avatar: "#8A9099", phone: "+374 55 480 122", email: "invite pending", schedule: "Add to schedule", schedBg: "#F4F8FF", schedColor: "#2C6CF6", toggleBg: "#D5D9DE", knob: "2px", services: "0", role: "Professional", subscription: "Not in plan", subColor: "#8A9099", bg: "#FFFFFF" },
  { name: "Anna Hakobyan", position: "· Nail technician", initials: "AH", avatar: "oklch(0.64 0.16 225)", phone: "+374 98 771 640", email: "anna@studioaram.am", schedule: "until 21.08.2026", schedBg: "#FEF6E0", schedColor: "#8A6A05", toggleBg: "#22C55E", knob: "16px", services: "7", role: "Professional", subscription: "Paid", subColor: "#16161A", bg: "#FAFBFC" },
];
