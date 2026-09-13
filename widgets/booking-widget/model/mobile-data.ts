import type {
  DateOption,
  ServiceCategory,
  Specialist,
  TimeGroupDef,
} from "./types";

export const bizName = "Studio Aram";
export const bizInitial = "A";
export const bizAddress = "12 Abovyan St, Kentron, Yerevan";

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Haircuts & beard",
    count: "6 services",
    glyph: "▾",
    open: true,
    services: [
      { name: "Men's cut & beard trim", duration: "45 min", price: "7 500 ֏" },
      { name: "Men's haircut", duration: "45 min", price: "6 000 ֏" },
      { name: "Beard sculpt", duration: "30 min", price: "5 000 ֏" },
    ],
  },
  {
    name: "Shaving & care",
    count: "4 services",
    glyph: "▾",
    open: true,
    services: [
      { name: "Head shave & hot towel", duration: "30 min", price: "5 500 ֏" },
      { name: "Kids cut (under 12)", duration: "30 min", price: "4 000 ֏" },
    ],
  },
  {
    name: "Colour",
    count: "5 services",
    glyph: "▸",
    open: false,
    services: [],
  },
];

export const specialists: Specialist[] = [
  {
    name: "Karen Sahakyan",
    role: "Barber · 9 years",
    rating: "4.9",
    free: "5 free today",
    initials: "PHOTO",
  },
  {
    name: "Davit Melkonyan",
    role: "Barber · 4 years",
    rating: "4.8",
    free: "3 free today",
    initials: "PHOTO",
  },
  {
    name: "Mariam Petrosyan",
    role: "Colourist",
    rating: "5.0",
    free: "1 free today",
    initials: "PHOTO",
  },
];

export const dateOptions: DateOption[] = [
  { dow: "Thu", day: "13", free: "2 free" },
  { dow: "Fri", day: "14", free: "5 free" },
  { dow: "Sat", day: "15", free: "full" },
  { dow: "Sun", day: "16", free: "6 free" },
  { dow: "Mon", day: "17", free: "9 free" },
  { dow: "Tue", day: "18", free: "9 free" },
  { dow: "Wed", day: "19", free: "8 free" },
];

export const timeGroups: TimeGroupDef[] = [
  {
    label: "Morning",
    meta: "2 free",
    slots: [
      { label: "09:00", state: "gone" },
      { label: "09:30", state: "free" },
      { label: "10:00", state: "gone" },
      { label: "10:30", state: "gone" },
      { label: "11:00", state: "free" },
      { label: "11:30", state: "gone" },
    ],
  },
  {
    label: "Afternoon",
    meta: "3 free",
    slots: [
      { label: "12:00", state: "gone" },
      { label: "12:30", state: "gone" },
      { label: "13:00", state: "free" },
      { label: "14:00", state: "gone" },
      { label: "15:00", state: "picked" },
      { label: "15:30", state: "free" },
    ],
  },
  {
    label: "Evening",
    meta: "1 free",
    slots: [
      { label: "17:00", state: "gone" },
      { label: "18:00", state: "gone" },
      { label: "19:00", state: "gone" },
      { label: "19:30", state: "free" },
      { label: "20:00", state: "gone" },
      { label: "21:00", state: "gone" },
    ],
  },
];

export const servicePrices: Record<string, number> = {
  "Men's cut & beard trim": 7500,
  "Head shave & hot towel": 5500,
  "Beard sculpt": 5000,
};

export const serviceDurations: Record<string, number> = {
  "Men's cut & beard trim": 45,
  "Head shave & hot towel": 30,
  "Beard sculpt": 30,
};

export const defaultCart: Record<string, boolean> = {
  "Men's cut & beard trim": true,
  "Head shave & hot towel": false,
  "Beard sculpt": false,
};
