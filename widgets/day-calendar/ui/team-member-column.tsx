import type { Appointment } from "@/shared/api/scheduling/types";
import {
  DAY_END_MINUTES,
  DAY_START_MINUTES,
  SLOT_HEIGHT_PX,
  SLOT_MINUTES,
  type TimeSlot,
} from "../model/slots";

const CANCELED_STATUSES = new Set(["canceled", "no_show"]);

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function minutesSinceMidnight(iso: string): number {
  const d = new Date(iso);
  return d.getHours() * 60 + d.getMinutes();
}

export function TeamMemberColumn({
  slots,
  appointments,
  accent,
  onOpenAppointment,
}: {
  slots: TimeSlot[];
  appointments: Appointment[];
  accent: string;
  onOpenAppointment: (appointmentId: string) => void;
}) {
  return (
    <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
      {slots.map((s, i) => (
        <div
          key={i}
          style={{
            height: SLOT_HEIGHT_PX,
            borderBottom: `1px solid ${s.line}`,
            background: s.fill,
          }}
        />
      ))}

      {appointments.map((appt) => {
        const startMin = Math.max(
          minutesSinceMidnight(appt.startsAt),
          DAY_START_MINUTES,
        );
        const endMin = Math.min(
          minutesSinceMidnight(appt.endsAt),
          DAY_END_MINUTES,
        );
        if (endMin <= DAY_START_MINUTES || startMin >= DAY_END_MINUTES) {
          return null;
        }

        const top =
          ((startMin - DAY_START_MINUTES) / SLOT_MINUTES) * SLOT_HEIGHT_PX;
        const height = Math.max(
          ((endMin - startMin) / SLOT_MINUTES) * SLOT_HEIGHT_PX,
          20,
        );
        const canceled = CANCELED_STATUSES.has(appt.status);

        return (
          <div
            key={appt.id}
            onClick={() => onOpenAppointment(appt.id)}
            style={
              canceled
                ? {
                    position: "absolute",
                    left: 4,
                    right: 4,
                    top,
                    height,
                    borderRadius: 6,
                    border: "1px dashed #EF4444",
                    background: "#FFF7F7",
                    padding: "0 8px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    overflow: "hidden",
                    cursor: "pointer",
                  }
                : {
                    position: "absolute",
                    left: 4,
                    right: 4,
                    top,
                    height,
                    borderRadius: 6,
                    background: "oklch(0.975 0.018 350)",
                    border: "1px solid oklch(0.9 0.05 350)",
                    borderLeft: `3px solid ${accent}`,
                    padding: "5px 8px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }
            }
          >
            {canceled ? (
              <>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#EF4444",
                    flex: "0 0 auto",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#C7302F",
                    textDecoration: "line-through",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {appt.titleSnapshot}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#C7302F",
                    opacity: 0.75,
                    whiteSpace: "nowrap",
                  }}
                >
                  · {appt.status === "no_show" ? "no-show" : "canceled"}
                </span>
              </>
            ) : (
              <>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 6 }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-zhamo-mono)",
                      fontSize: 10.5,
                      color: "oklch(0.5 0.13 350)",
                    }}
                  >
                    {TIME_FORMAT.format(new Date(appt.startsAt))}
                  </span>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {appt.titleSnapshot}
                  </span>
                </div>
                {appt.customerVisibleNote && (
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#5B6069",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {appt.customerVisibleNote}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
