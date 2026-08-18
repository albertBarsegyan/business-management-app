export type TimeSlot = {
  label: string;
  labelColor: string;
  line: string;
  fill: string;
  fillLate: string;
  fillMorning: string;
};

export function buildSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let m = 540; m < 1320; m += 30) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const onHour = mm === 0;
    slots.push({
      label: onHour ? `${String(h).padStart(2, "0")}:00` : "",
      labelColor: "#8A9099",
      line: onHour ? "#E6E8EB" : "#F2F3F5",
      fill: "#FFFFFF",
      fillLate: m >= 1200 ? "#F7F8FA" : "#FFFFFF",
      fillMorning: m < 720 ? "#F7F8FA" : "#FFFFFF",
    });
  }
  return slots;
}
