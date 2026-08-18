export type NotificationRow = {
  label: string;
  description: string;
  sms: boolean;
  email: boolean;
  push: boolean;
};

export const clientNotifications: NotificationRow[] = [
  { label: "Appointment reminder", description: "Sent 24 hours before the appointment", sms: true, email: true, push: false },
  { label: "Booking confirmation", description: "Sent right after a client books online", sms: true, email: true, push: false },
  { label: "No-show follow-up", description: "Sent when a client misses their appointment", sms: false, email: true, push: false },
  { label: "Review request", description: "Sent one day after the appointment", sms: false, email: true, push: false },
];

export const teamNotifications: NotificationRow[] = [
  { label: "New booking", description: "Notify the assigned team member", sms: false, email: false, push: true },
  { label: "Cancellation", description: "Notify the assigned team member", sms: false, email: false, push: true },
  { label: "Waitlist match", description: "Notify front desk when a slot opens up", sms: false, email: true, push: true },
];
