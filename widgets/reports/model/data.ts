import type { Stat } from "@/widgets/day-calendar";

export const reportStats: Stat[] = [
  { label: "Revenue this month", value: "2 480 000 ֏", sub: "+12% vs last month", subColor: "#1E8E5A" },
  { label: "Appointments", value: "312", sub: "+18 vs last month", subColor: "#1E8E5A" },
  { label: "Occupancy", value: "71%", sub: "-3% vs last month", subColor: "#D64545" },
  { label: "New clients", value: "46", sub: "+9 vs last month", subColor: "#1E8E5A" },
];

export type WeekRow = { week: string; appointments: number; revenue: string; avgTicket: string };

export const revenueByWeek: WeekRow[] = [
  { week: "Aug 4 – Aug 10", appointments: 68, revenue: "512 000 ֏", avgTicket: "7 530 ֏" },
  { week: "Aug 11 – Aug 17", appointments: 74, revenue: "588 000 ֏", avgTicket: "7 950 ֏" },
  { week: "Aug 18 – Aug 24", appointments: 81, revenue: "641 000 ֏", avgTicket: "7 910 ֏" },
  { week: "Aug 25 – Aug 31", appointments: 89, revenue: "739 000 ֏", avgTicket: "8 300 ֏" },
];

export type ServiceRow = { service: string; bookings: number; revenue: string; share: string };

export const topServices: ServiceRow[] = [
  { service: "Balayage", bookings: 58, revenue: "1 044 000 ֏", share: "42%" },
  { service: "Men's haircut", bookings: 96, revenue: "576 000 ֏", share: "23%" },
  { service: "Gel manicure", bookings: 74, revenue: "444 000 ֏", share: "18%" },
  { service: "Beard trim", bookings: 51, revenue: "204 000 ֏", share: "8%" },
  { service: "Root touch-up", bookings: 22, revenue: "212 000 ֏", share: "9%" },
];
