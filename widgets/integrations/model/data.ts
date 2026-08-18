export type IntegrationRow = {
  name: string;
  category: string;
  description: string;
  mono: string;
  connected: boolean;
};

export const integrations: IntegrationRow[] = [
  { name: "Google Calendar", category: "Calendar", description: "Two-way sync for appointments and team schedules.", mono: "GC", connected: true },
  { name: "Instagram Booking", category: "Marketing", description: "Let clients book straight from your Instagram profile.", mono: "IG", connected: true },
  { name: "Stripe", category: "Payments", description: "Accept card payments and store client cards on file.", mono: "ST", connected: true },
  { name: "SMS Gateway", category: "Notifications", description: "Send appointment reminders and confirmations by SMS.", mono: "SMS", connected: false },
  { name: "Mailchimp", category: "Marketing", description: "Sync clients to email lists for campaigns.", mono: "MC", connected: false },
  { name: "QuickBooks", category: "Accounting", description: "Export revenue and payroll to your books.", mono: "QB", connected: false },
];
