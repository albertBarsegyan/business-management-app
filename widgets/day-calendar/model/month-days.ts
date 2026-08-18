export type MonthDay = {
  n: string;
  bg: string;
  color: string;
  weight: "400" | "700";
  load: string;
  loadColor: string;
};

const loads: Record<number, number> = {
  3: 0.4, 4: 0.9, 5: 0.6, 6: 0.3, 7: 0.75, 10: 0.5, 11: 0.85, 12: 1, 13: 0.7,
  14: 0.45, 17: 0.6, 18: 0.95, 19: 0.4, 20: 0.8, 21: 0.55, 24: 0.35, 25: 0.7,
  26: 0.9, 27: 0.5,
};

export function buildMonthDays(accent: string): MonthDay[] {
  const days: MonthDay[] = [];
  for (let i = -5; i <= 31; i++) {
    const out = i < 1 || i > 31;
    const n = out ? (i < 1 ? 26 + i + 5 : i - 31) : i;
    const today = i === 13;
    const load = loads[i] || 0;
    days.push({
      n: String(n),
      bg: today ? "#16161A" : "transparent",
      color: today ? "#FFFFFF" : out ? "#C9CDD3" : "#16161A",
      weight: today ? "700" : "400",
      load: load ? `${Math.round(6 + load * 12)}px` : "0px",
      loadColor: today ? "#FFC935" : load > 0.75 ? accent : load > 0.4 ? "oklch(0.8 0.09 350)" : "#DFE2E6",
    });
  }
  return days;
}
