export const beautyAccent = "oklch(0.64 0.16 350)";

export type Chip = {
  label: string;
  check?: string;
  border: string;
  bg: string;
  color: string;
  weight: "400" | "600";
};

function accentChip(label: string, selected: boolean): Chip {
  return {
    label,
    check: selected ? "✓" : "",
    border: selected ? beautyAccent : "#D5D9DE",
    bg: selected ? "oklch(0.96 0.03 350)" : "#FFFFFF",
    color: selected ? "oklch(0.44 0.13 350)" : "#16161A",
    weight: selected ? "600" : "400",
  };
}

function plainChip(label: string, selected: boolean): Chip {
  return {
    label,
    border: selected ? "#16161A" : "#D5D9DE",
    bg: selected ? "#16161A" : "#FFFFFF",
    color: selected ? "#FFFFFF" : "#16161A",
    weight: selected ? "600" : "400",
  };
}

export const positions = ["Owner", "Manager", "Receptionist", "Professional", "Marketer", "Accountant"].map(
  (label, i) => ({
    label,
    check: i === 0 ? "✓" : "",
    bg: i === 0 ? "#FEF6E0" : "transparent",
    weight: (i === 0 ? "600" : "400") as "400" | "600",
  }),
);

const businessTypeLabels = [
  "Beauty",
  "Healthcare",
  "Sport & Fitness",
  "Education",
  "Entertainment",
  "Consumer services",
  "Automobile",
  "Retail",
  "Other",
];

const teamSizeLabels = ["1", "2–4", "5–7", "8–14", "15+"];

export const sources = ["Recommendation", "Internet advertising", "Conference", "Longtime fan", "I don't remember"].map(
  (label) => plainChip(label, label === "Recommendation"),
);

export function businessTypeChips(beauty: boolean): Chip[] {
  return businessTypeLabels.map((label) => accentChip(label, beauty && label === "Beauty"));
}

export function teamSizeChips(beauty: boolean): Chip[] {
  return teamSizeLabels.map((label) => plainChip(label, beauty && label === "2–4"));
}
