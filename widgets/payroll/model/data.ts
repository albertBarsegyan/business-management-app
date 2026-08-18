import type { Stat } from "@/widgets/day-calendar";

export const payrollStats: Stat[] = [
  { label: "Total payroll", value: "1 940 000 ֏", sub: "August 2026" },
  { label: "Avg. commission", value: "38%" },
  { label: "Next payout", value: "Sep 1" },
  { label: "Team members", value: "4" },
];

export type PayrollRow = {
  name: string;
  role: string;
  base: string;
  commission: string;
  total: string;
  status: "Paid" | "Scheduled";
};

export const payroll: PayrollRow[] = [
  { name: "Karen Sahakyan", role: "Barber", base: "200 000 ֏", commission: "280 000 ֏", total: "480 000 ֏", status: "Paid" },
  { name: "Mariam Petrosyan", role: "Colourist", base: "220 000 ֏", commission: "412 000 ֏", total: "632 000 ֏", status: "Paid" },
  { name: "Anna Hakobyan", role: "Nail technician", base: "180 000 ֏", commission: "236 000 ֏", total: "416 000 ֏", status: "Scheduled" },
  { name: "Davit Melkonyan", role: "Barber", base: "200 000 ֏", commission: "212 000 ֏", total: "412 000 ֏", status: "Scheduled" },
];
