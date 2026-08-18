import { dayKeys, type DayKey, type HourPreset } from "./types";

export const serviceSkeleton = [
  { live: true, text: "Men's haircut · 60 min · 6 000 ֏", border: "#FFC935", bg: "#FFFDF6", tile: "#FFC935", bar: "#E4E7EB", barLight: "#EDEFF2", w1: "38%", w2: "22%" },
  { live: false, text: "", border: "#E6E8EB", bg: "#FFFFFF", tile: "#EDEFF2", bar: "#E4E7EB", barLight: "#EDEFF2", w1: "56%", w2: "30%" },
  { live: false, text: "", border: "#E6E8EB", bg: "#FFFFFF", tile: "#EDEFF2", bar: "#E4E7EB", barLight: "#EDEFF2", w1: "44%", w2: "26%" },
  { live: false, text: "", border: "#E6E8EB", bg: "#FFFFFF", tile: "#EDEFF2", bar: "#EAECEF", barLight: "#F1F2F4", w1: "62%", w2: "34%" },
  { live: false, text: "", border: "#EEF0F2", bg: "#FFFFFF", tile: "#F1F2F4", bar: "#EEF0F2", barLight: "#F4F5F7", w1: "40%", w2: "20%" },
];

export const teamSkeleton = [
  { live: true, border: "#FFC935", bg: "#FFFDF6", avatar: "oklch(0.64 0.16 350)", bar: "#E4E7EB", barLight: "#EDEFF2" },
  { live: false, border: "#E6E8EB", bg: "#FFFFFF", avatar: "#EDEFF2", bar: "#E4E7EB", barLight: "#EDEFF2" },
  { live: false, border: "#E6E8EB", bg: "#FFFFFF", avatar: "#EDEFF2", bar: "#EAECEF", barLight: "#F1F2F4" },
  { live: false, border: "#EEF0F2", bg: "#FFFFFF", avatar: "#F1F2F4", bar: "#EEF0F2", barLight: "#F4F5F7" },
];

export const weekHeads = ["S", "M", "T", "W", "T", "F", "S"];

export function buildWeekCells(days: Record<DayKey, boolean>, hours: HourPreset) {
  const cells: { label: string; bg: string; border: string; color: string }[] = [];
  const opensAt = hours === "Custom hours" ? "08:30" : hours.split("–")[0];
  for (let w = 0; w < 4; w++) {
    dayKeys.forEach((k) => {
      const open = days[k];
      cells.push({
        label: open ? opensAt : "—",
        bg: open ? "#FFFDF6" : "#F1F2F4",
        border: open ? "#F5DFA0" : "#EAECEF",
        color: open ? "#8A6A05" : "#C0C5CB",
      });
    });
  }
  return cells;
}

export const backdropCols = [0, 1, 2, 3, 4].map((i) => ({
  cells: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((j) => ((i * 3 + j * 5) % 7 < 3 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)")),
}));

export const walkthrough = [
  { n: "1", text: "Click a free slot in the calendar — the appointment panel opens on that time." },
  { n: "2", text: "Type the client's phone; Zhamo matches them or creates the card as you type." },
  { n: "3", text: "Save. They get a confirmation SMS, and the slot turns yellow on your day." },
];
