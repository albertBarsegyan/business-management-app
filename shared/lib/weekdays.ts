export const WEEKDAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
] as const;

export function weekdayLabel(weekday: number): string {
  return WEEKDAYS.find((w) => w.value === weekday)?.label ?? `Day ${weekday}`;
}

export function formatTime(time: string): string {
  return time.slice(0, 5);
}
