import type { Stat } from "@/widgets/day-calendar";

export const loyaltyStats: Stat[] = [
  { label: "Active members", value: "184" },
  { label: "Points issued", value: "42 600" },
  { label: "Redeemed this month", value: "6 200 pts" },
  { label: "Avg. visits / member", value: "3.4" },
];

export type TierRow = { tier: string; threshold: string; perk: string };

export const tiers: TierRow[] = [
  { tier: "Bronze", threshold: "0 – 4 visits", perk: "Birthday discount — 10%" },
  { tier: "Silver", threshold: "5 – 14 visits", perk: "10% off every 5th visit" },
  { tier: "Gold", threshold: "15+ visits", perk: "Free add-on service monthly" },
];

export type MemberRow = { name: string; tier: "Bronze" | "Silver" | "Gold"; points: number; lastVisit: string };

export const topMembers: MemberRow[] = [
  { name: "Sona Grigoryan", tier: "Gold", points: 1240, lastVisit: "Aug 15" },
  { name: "Lilit Sargsyan", tier: "Gold", points: 980, lastVisit: "Aug 12" },
  { name: "Vahagn Tovmasyan", tier: "Silver", points: 540, lastVisit: "Aug 17" },
  { name: "Mane Asatryan", tier: "Silver", points: 410, lastVisit: "Aug 9" },
];
