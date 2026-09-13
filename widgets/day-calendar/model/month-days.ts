export type MonthDay = {
  date: Date;
  n: string;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Builds a fixed 6-week (42-day) Monday-start grid for `monthAnchor`'s month. */
export function buildMonthDays(
  monthAnchor: Date,
  selectedDate: Date,
): MonthDay[] {
  const year = monthAnchor.getFullYear();
  const month = monthAnchor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
  const gridStart = new Date(year, month, 1 - firstWeekday);
  const today = new Date();

  const days: MonthDay[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + i,
    );
    days.push({
      date,
      n: String(date.getDate()),
      inCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
      isSelected: isSameDay(date, selectedDate),
    });
  }
  return days;
}
