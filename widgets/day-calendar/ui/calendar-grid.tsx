"use client";

import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import { schedulingKeys } from "@/shared/api/scheduling/queries";
import type { Appointment } from "@/shared/api/scheduling/types";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import type { TeamMember } from "@/shared/api/team/types";
import { teamColumnAccents } from "../model/team";
import type { TimeSlot } from "../model/slots";
import { EmptyDayOverlay } from "./empty-day-overlay";
import { NowIndicator } from "./now-indicator";
import { TeamMemberColumn } from "./team-member-column";
import { TimeRail } from "./time-rail";

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );
}

function initialsOf(member: TeamMember): string {
  const parts = member.displayName.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function CalendarGrid({
  slots,
  date,
  onOpenNewAppointment,
  onOpenAppointment,
}: {
  slots: TimeSlot[];
  date: Date;
  onOpenNewAppointment: () => void;
  onOpenAppointment: (appointmentId: string) => void;
}) {
  const from = startOfDay(date).toISOString();
  const to = endOfDay(date).toISOString();

  const teamMembersQuery = useTeamMembersQuery();
  const teamMembers = teamMembersQuery.data ?? [];

  const appointmentQueries = useQueries({
    queries: teamMembers.map((member) => ({
      queryKey: schedulingKeys.appointmentsFiltered({
        teamMemberId: member.id,
        from,
        to,
      }),
      queryFn: () =>
        unwrap<Appointment[]>(
          apiClient.get("appointments", {
            searchParams: { teamMemberId: member.id, from, to },
          }),
        ),
      enabled: Boolean(member.id),
    })),
  });

  const isLoading =
    teamMembersQuery.isPending || appointmentQueries.some((q) => q.isPending);
  const hasAnyAppointment = appointmentQueries.some(
    (q) => (q.data?.length ?? 0) > 0,
  );
  const showEmpty = !isLoading && !hasAnyAppointment;

  return (
    <div
      style={{ flex: "1 1 auto", overflow: "auto", padding: "14px 16px 24px" }}
    >
      <div
        style={{
          minWidth: 900,
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `56px repeat(${Math.max(teamMembers.length, 1)}, 1fr) 56px`,
            borderBottom: "1px solid #E6E8EB",
            background: "#FAFBFC",
            position: "sticky",
            top: 0,
            zIndex: 3,
          }}
        >
          <span style={{ borderRight: "1px solid #E6E8EB" }} />
          {teamMembers.map((m, i) => (
            <div
              key={m.id}
              style={{
                padding: "10px 12px",
                borderRight: "1px solid #E6E8EB",
                display: "flex",
                alignItems: "center",
                gap: 9,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  background: teamColumnAccents[i % teamColumnAccents.length],
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {initialsOf(m)}
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.displayName}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: "#8A9099",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.positionTitle}
                </span>
              </span>
            </div>
          ))}
          <span />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `56px repeat(${Math.max(teamMembers.length, 1)}, 1fr) 56px`,
            position: "relative",
          }}
        >
          <TimeRail slots={slots} side="left" />

          {teamMembers.map((m, i) => (
            <TeamMemberColumn
              key={m.id}
              slots={slots}
              appointments={appointmentQueries[i]?.data ?? []}
              accent={teamColumnAccents[i % teamColumnAccents.length]}
              onOpenAppointment={onOpenAppointment}
            />
          ))}

          <TimeRail slots={slots} side="right" />

          <NowIndicator date={date} />
          {showEmpty && (
            <EmptyDayOverlay onScheduleFirstClient={onOpenNewAppointment} />
          )}
        </div>
      </div>
    </div>
  );
}
