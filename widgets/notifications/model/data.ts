import type {
  NotificationAudience,
  NotificationChannel,
} from "@/shared/api/notifications/types";

/**
 * The channel-toggle matrix is UI copy over real NotificationRule rows —
 * eventKey/audience identify which rule (if any) a cell corresponds to;
 * label/description are just display copy, not backend data.
 */
export interface NotificationRuleRow {
  eventKey: string;
  audience: NotificationAudience;
  label: string;
  description: string;
}

export const NOTIFICATION_LOCALE = "en";

export const NOTIFICATION_CHANNELS: {
  channel: NotificationChannel;
  label: string;
}[] = [
  { channel: "sms", label: "SMS" },
  { channel: "email", label: "Email" },
  { channel: "push", label: "Push" },
];

export const clientNotificationRows: NotificationRuleRow[] = [
  {
    eventKey: "client.appointment_reminder",
    audience: "client",
    label: "Appointment reminder",
    description: "Sent 24 hours before the appointment",
  },
  {
    eventKey: "client.booking_confirmation",
    audience: "client",
    label: "Booking confirmation",
    description: "Sent right after a client books online",
  },
  {
    eventKey: "client.no_show_followup",
    audience: "client",
    label: "No-show follow-up",
    description: "Sent when a client misses their appointment",
  },
  {
    eventKey: "client.review_request",
    audience: "client",
    label: "Review request",
    description: "Sent one day after the appointment",
  },
];

export const teamNotificationRows: NotificationRuleRow[] = [
  {
    eventKey: "team.new_booking",
    audience: "assigned_team",
    label: "New booking",
    description: "Notify the assigned team member",
  },
  {
    eventKey: "team.cancellation",
    audience: "assigned_team",
    label: "Cancellation",
    description: "Notify the assigned team member",
  },
  {
    eventKey: "team.waitlist_match",
    audience: "assigned_team",
    label: "Waitlist match",
    description: "Notify the assigned team member when a slot opens up",
  },
];
