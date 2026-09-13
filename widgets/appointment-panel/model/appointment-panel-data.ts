import type { AppointmentStatus } from "@/shared/api/scheduling/types";

export const statusStyle: Record<
  AppointmentStatus,
  { dot: string; border: string; bg: string; color: string; dotRadius: string }
> = {
  tentative: {
    dot: "#F59E0B",
    border: "#F5DFA0",
    bg: "#FFFDF6",
    color: "#8A6A05",
    dotRadius: "50%",
  },
  checked_in: {
    dot: "#22C55E",
    border: "#BBF0CE",
    bg: "#F1FCF5",
    color: "#17753C",
    dotRadius: "50%",
  },
  no_show: {
    dot: "#EF4444",
    border: "#F3C7C7",
    bg: "#FFF5F5",
    color: "#C7302F",
    dotRadius: "1px",
  },
  confirmed: {
    dot: "#2C6CF6",
    border: "#C8D9FD",
    bg: "#F4F8FF",
    color: "#1B4FCB",
    dotRadius: "2px",
  },
  in_progress: {
    dot: "#2C6CF6",
    border: "#C8D9FD",
    bg: "#F4F8FF",
    color: "#1B4FCB",
    dotRadius: "2px",
  },
  completed: {
    dot: "#8A9099",
    border: "#D5D9DE",
    bg: "#F7F8FA",
    color: "#5B6069",
    dotRadius: "2px",
  },
  canceled: {
    dot: "#8A9099",
    border: "#D5D9DE",
    bg: "#F7F8FA",
    color: "#5B6069",
    dotRadius: "2px",
  },
};
