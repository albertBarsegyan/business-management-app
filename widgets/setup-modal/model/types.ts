export type SetupStep = 1 | 2 | 3 | 4;

export type DayKey = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export const dayKeys: DayKey[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export type Duration = "30 m" | "1 h" | "1 h 30 m";

export type HourPreset =
  "9:00–18:00" | "9:00–22:00" | "10:00–18:00" | "10:00–22:00" | "Custom hours";

export const hourPresetValues: HourPreset[] = [
  "9:00–18:00",
  "9:00–22:00",
  "10:00–18:00",
  "10:00–22:00",
  "Custom hours",
];

export type RadioTile = {
  label: string;
  border: string;
  bg: string;
  color: string;
  weight: string;
  dotBorder: string;
  dotBg: string;
};

export function radioTile(label: string, on: boolean): RadioTile {
  return {
    label,
    border: on ? "#16161A" : "#D5D9DE",
    bg: on ? "#FAFBFC" : "#FFFFFF",
    color: "#16161A",
    weight: on ? "600" : "400",
    dotBorder: on ? "#16161A" : "#C9CDD3",
    dotBg: on ? "#16161A" : "#FFFFFF",
  };
}
