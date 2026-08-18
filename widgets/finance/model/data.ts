import type { Stat } from "@/widgets/day-calendar";

export const financeStats: Stat[] = [
  { label: "Revenue this month", value: "2 480 000 ֏", sub: "+12% vs last month", subColor: "#1E8E5A" },
  { label: "Payouts sent", value: "1 940 000 ֏" },
  { label: "Outstanding", value: "84 000 ֏", sub: "3 unpaid invoices", subColor: "#B4780F" },
  { label: "Refunds", value: "22 000 ֏" },
];

export type TransactionRow = {
  date: string;
  client: string;
  type: "Appointment" | "Product sale" | "Refund" | "Payout";
  amount: string;
  status: "Paid" | "Pending" | "Refunded";
};

export const transactions: TransactionRow[] = [
  { date: "Aug 18", client: "Sona Grigoryan", type: "Appointment", amount: "18 000 ֏", status: "Paid" },
  { date: "Aug 18", client: "Retail — walk-in", type: "Product sale", amount: "6 500 ֏", status: "Paid" },
  { date: "Aug 17", client: "Vahagn Tovmasyan", type: "Appointment", amount: "6 000 ֏", status: "Pending" },
  { date: "Aug 17", client: "Karen Sahakyan — payout", type: "Payout", amount: "480 000 ֏", status: "Paid" },
  { date: "Aug 16", client: "Mane Asatryan", type: "Refund", amount: "9 000 ֏", status: "Refunded" },
  { date: "Aug 15", client: "Lilit Sargsyan", type: "Appointment", amount: "9 500 ֏", status: "Paid" },
];
