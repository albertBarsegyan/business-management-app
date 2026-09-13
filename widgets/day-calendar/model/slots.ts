export type TimeSlot = {
  label: string;
  labelColor: string;
  line: string;
  fill: string;
  fillLate: string;
  fillMorning: string;
};

export const SLOT_HEIGHT_PX = 34;
export const SLOT_MINUTES = 30;
export const DAY_START_MINUTES = 540;
export const DAY_END_MINUTES = 1320;

export function buildSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let m = DAY_START_MINUTES; m < DAY_END_MINUTES; m += SLOT_MINUTES) {
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
