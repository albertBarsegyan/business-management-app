"use client";

import type { LocationDetails } from "@/entities/location/api/get-locations";
import type {
  TeamMemberDetails,
  TeamWorkingHoursDetails,
} from "@/entities/team-member/api/list-team-members";
import type { VenueDetails } from "@/entities/venue/api/get-venue";
import { formatAddress } from "@/shared/lib/format-address";
import { formatTime, weekdayLabel } from "@/shared/lib/weekdays";
import { PageHeader, PageShell } from "@/widgets/day-calendar";
import { TeamAccessSection } from "./ui/team-access-section";

export function SettingsScreen({
  venue,
  primaryLocation,
  teamWorkingHours,
}: {
  venue: VenueDetails;
  primaryLocation: LocationDetails | null;
  teamWorkingHours: {
    member: TeamMemberDetails;
    hours: TeamWorkingHoursDetails[];
  }[];
}) {
  const address = primaryLocation ? formatAddress(primaryLocation) : null;

  return (
    <PageShell>
      <PageHeader
        title="Settings"
        subtitle="Your business profile, team working hours, and booking preferences."
      />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A9099",
          }}
        >
          Business profile
        </span>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              Business name
            </span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{venue.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Address</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {address ?? "No location set yet"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Timezone</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {venue.defaultTimezone}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>Currency</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {venue.baseCurrencyCode}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A9099",
          }}
        >
          Team working hours
        </span>
        {teamWorkingHours.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "#8A9099" }}>
            No team members yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {teamWorkingHours.map(({ member, hours }) => (
              <div
                key={member.id}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  {member.displayName}
                </span>
                {hours.length === 0 ? (
                  <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
                    No working hours set yet.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {hours.map((entry) => (
                      <span
                        key={entry.id}
                        style={{
                          fontSize: 12,
                          padding: "4px 8px",
                          border: "1px solid #EEF0F2",
                          borderRadius: 6,
                          color: "#5B6069",
                        }}
                      >
                        {weekdayLabel(entry.weekday)}{" "}
                        <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>
                          {formatTime(entry.startsAtLocal)}–
                          {formatTime(entry.endsAtLocal)}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <TeamAccessSection />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A9099",
          }}
        >
          Booking preferences
        </span>
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Not configurable yet — this needs backend support that doesn&apos;t
          exist yet.
        </p>
      </div>
    </PageShell>
  );
}
