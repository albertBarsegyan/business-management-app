export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type SlotState = "free" | "gone" | "picked";

export type ServiceOption = {
  name: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  name: string;
  count: string;
  glyph: string;
  open: boolean;
  services: ServiceOption[];
};

export type Specialist = {
  name: string;
  role: string;
  rating: string;
  free: string;
  initials: string;
};

export type DateOption = {
  dow: string;
  day: string;
  free: string;
};

export type TimeSlotDef = {
  label: string;
  state: SlotState;
};

export type TimeGroupDef = {
  label: string;
  meta: string;
  slots: TimeSlotDef[];
};
