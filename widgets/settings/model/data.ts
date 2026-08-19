export type BusinessProfile = {
  name: string;
  address: string;
  timezone: string;
  currency: string;
};

export const businessProfile: BusinessProfile = {
  name: "Studio Aram",
  address: "14 Abovyan St, Yerevan",
  timezone: "GMT+4 · Yerevan",
  currency: "AMD",
};

export type HoursRow = {
  day: string;
  open: boolean;
  hours: string;
};

export const workingHours: HoursRow[] = [
  { day: "Monday", open: true, hours: "9:00 – 22:00" },
  { day: "Tuesday", open: true, hours: "9:00 – 22:00" },
  { day: "Wednesday", open: true, hours: "9:00 – 22:00" },
  { day: "Thursday", open: true, hours: "9:00 – 22:00" },
  { day: "Friday", open: true, hours: "9:00 – 22:00" },
  { day: "Saturday", open: true, hours: "10:00 – 18:00" },
  { day: "Sunday", open: false, hours: "Closed" },
];

export type PreferenceRow = {
  label: string;
  description: string;
  on: boolean;
};

export const bookingPreferences: PreferenceRow[] = [
  { label: "Online booking", description: "Allow clients to book appointments from your booking widget.", on: true },
  { label: "Auto-confirm bookings", description: "Skip manual approval and confirm new bookings instantly.", on: true },
  { label: "Allow cancellations", description: "Let clients cancel or reschedule up to 24 hours ahead.", on: true },
  { label: "Waitlist", description: "Offer a waitlist when a day is fully booked.", on: false },
];
