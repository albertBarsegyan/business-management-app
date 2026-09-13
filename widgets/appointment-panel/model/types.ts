import type { AppointmentStatus } from "@/shared/api/scheduling/types";

/** The four statuses this panel exposes as clickable pills — a subset of
 * the full AppointmentStatus enum chosen to match the original design's
 * Pending/Arrived/No-show/Confirmed pills. */
export const PANEL_STATUSES: AppointmentStatus[] = [
  "tentative",
  "confirmed",
  "checked_in",
  "no_show",
];

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  tentative: "Pending",
  confirmed: "Confirmed",
  checked_in: "Arrived",
  in_progress: "In progress",
  completed: "Completed",
  canceled: "Canceled",
  no_show: "No-show",
};
