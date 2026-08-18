export const codeBoxes = [
  { v: "4", filled: true },
  { v: "1", filled: true },
  { v: "7", filled: true },
  { v: "", filled: false },
];

export const recoveryOptions = [
  { time: "15:30", who: "Karen", featured: true },
  { time: "19:30", who: "Karen", featured: false },
  { time: "15:00", who: "Davit", featured: false },
];

export const bookingSummary = [
  { k: "Service", v: "Men's cut & beard trim", weight: 600 },
  { k: "Specialist", v: "Karen Sahakyan", weight: 500 },
  { k: "When", v: "Friday 14 August, 15:00", weight: 600 },
  { k: "Duration", v: "45 min", weight: 500 },
  { k: "Price", v: "7 500 ֏", weight: 600 },
  { k: "Where", v: "12 Abovyan St, Kentron", weight: 500 },
];

export const flowRules = [
  "No account, ever — name and phone at the end, verified by one SMS code.",
  "“Any specialist” sits above the list, in the vertical accent, because it is the fastest path.",
  "Taken slots stay visible but struck through, so the client can see how full the day is.",
  "Recovery offers three real alternatives; it never returns the client to step 1.",
];

export const embedCart = [
  { name: "Men's cut & beard trim", meta: "45 min · Karen", price: "7 500 ֏" },
  { name: "Balayage refresh", meta: "60 min · Mariam", price: "12 000 ֏" },
];

export type JumpKey = 1 | 2 | 3 | 31 | 4 | 41 | 5 | 51;

export const jumpDefs: { key: JumpKey; label: string }[] = [
  { key: 1, label: "1 · Services" },
  { key: 2, label: "2 · Specialist" },
  { key: 3, label: "3 · Time" },
  { key: 31, label: "3 · Day full" },
  { key: 4, label: "4 · Details" },
  { key: 41, label: "4 · SMS code" },
  { key: 5, label: "5 · Confirmed" },
  { key: 51, label: "5 · Slot taken" },
];
