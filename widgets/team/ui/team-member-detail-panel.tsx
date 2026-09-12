"use client";

import { useState } from "react";
import { useLocationsQuery } from "@/shared/api/locations/queries";
import {
  useAssignTeamLocationMutation,
  useCreateTeamAvailabilityExceptionMutation,
  useCreateTeamWorkingHoursMutation,
  useTeamAvailabilityExceptionsQuery,
  useTeamLocationAssignmentsQuery,
  useTeamWorkingHoursQuery,
} from "@/shared/api/team/queries";
import type { TeamMember } from "@/shared/api/team/types";
import { formatTime, WEEKDAYS, weekdayLabel } from "@/shared/lib/weekdays";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A9099",
};

const buttonStyle: React.CSSProperties = {
  alignSelf: "flex-start",
  height: 32,
  padding: "0 14px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  background: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
};

const entryCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: "8px 10px",
  border: "1px solid #EEF0F2",
  borderRadius: 6,
  fontSize: 12.5,
};

function WorkingHoursSection({ teamMemberId }: { teamMemberId: string }) {
  const hoursQuery = useTeamWorkingHoursQuery(teamMemberId);
  const locationsQuery = useLocationsQuery();
  const createHours = useCreateTeamWorkingHoursMutation(teamMemberId);

  const locations = locationsQuery.data ?? [];
  const locationNameById = new Map(locations.map((l) => [l.id, l.name]));

  const [locationId, setLocationId] = useState("");
  const [weekday, setWeekday] = useState(1);
  const [startsAtLocal, setStartsAtLocal] = useState("09:00");
  const [endsAtLocal, setEndsAtLocal] = useState("18:00");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");

  const selectedLocationId = locationId || locations[0]?.id || "";

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedLocationId) return;
    createHours.mutate({
      locationId: selectedLocationId,
      weekday,
      startsAtLocal,
      endsAtLocal,
      validFrom: validFrom || undefined,
      validUntil: validUntil || undefined,
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Working hours</h3>

      {hoursQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : hoursQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {hoursQuery.error.message}
        </p>
      ) : hoursQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No working hours set yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {hoursQuery.data.map((entry) => (
            <div
              key={entry.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: "8px 10px",
                border: "1px solid #EEF0F2",
                borderRadius: 6,
                fontSize: 12.5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>
                  {weekdayLabel(entry.weekday)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    color: "#5B6069",
                  }}
                >
                  {formatTime(entry.startsAtLocal)}–
                  {formatTime(entry.endsAtLocal)}
                </span>
              </div>
              <span style={{ fontSize: 11, color: "#8A9099" }}>
                {locationNameById.get(entry.locationId) ?? "Unknown location"}
                {entry.validFrom || entry.validUntil
                  ? ` · ${entry.validFrom ?? "…"} – ${entry.validUntil ?? "…"}`
                  : ""}
              </span>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <select
            value={selectedLocationId}
            onChange={(event) => setLocationId(event.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {locations.length === 0 ? (
              <option value="">No locations</option>
            ) : (
              locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))
            )}
          </select>
          <select
            value={weekday}
            onChange={(event) => setWeekday(Number(event.target.value))}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {WEEKDAYS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <input
            required
            type="time"
            value={startsAtLocal}
            onChange={(event) => setStartsAtLocal(event.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
          />
          <input
            required
            type="time"
            value={endsAtLocal}
            onChange={(event) => setEndsAtLocal(event.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
          />
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11, color: "#8A9099" }}>
              Valid from (optional)
            </span>
            <input
              type="date"
              value={validFrom}
              onChange={(event) => setValidFrom(event.target.value)}
              style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11, color: "#8A9099" }}>
              Valid until (optional)
            </span>
            <input
              type="date"
              value={validUntil}
              onChange={(event) => setValidUntil(event.target.value)}
              style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={createHours.isPending || !selectedLocationId}
          style={{
            alignSelf: "flex-start",
            height: 32,
            padding: "0 14px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            background: "#FFFFFF",
            fontFamily: "inherit",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {createHours.isPending ? "Adding…" : "Add working hours"}
        </button>
      </form>
      {createHours.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createHours.error.message}
        </p>
      ) : null}
    </div>
  );
}

function LocationAssignmentsSection({
  teamMemberId,
}: {
  teamMemberId: string;
}) {
  const assignmentsQuery = useTeamLocationAssignmentsQuery(teamMemberId);
  const locationsQuery = useLocationsQuery();
  const assignLocation = useAssignTeamLocationMutation(teamMemberId);

  const locations = locationsQuery.data ?? [];
  const locationNameById = new Map(locations.map((l) => [l.id, l.name]));
  const assignedLocationIds = new Set(
    (assignmentsQuery.data ?? []).map((a) => a.locationId),
  );
  const availableLocations = locations.filter(
    (l) => !assignedLocationIds.has(l.id),
  );

  const [locationId, setLocationId] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const selectedLocationId = locationId || availableLocations[0]?.id || "";

  function handleAssign(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedLocationId) return;
    assignLocation.mutate(
      { locationId: selectedLocationId, isPrimary },
      { onSuccess: () => setLocationId("") },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Location assignments</h3>

      {assignmentsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : assignmentsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {assignmentsQuery.error.message}
        </p>
      ) : assignmentsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          Not assigned to any location yet.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {assignmentsQuery.data.map((entry) => (
            <div key={entry.id} style={entryCardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>
                  {locationNameById.get(entry.locationId) ?? "Unknown location"}
                </span>
                {entry.isPrimary ? (
                  <span style={{ fontSize: 11, color: "#8A9099" }}>
                    Primary
                  </span>
                ) : null}
              </div>
              {entry.startsOn || entry.endsOn ? (
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  {entry.startsOn ?? "…"} – {entry.endsOn ?? "…"}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {availableLocations.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12, color: "#8A9099" }}>
          {locations.length === 0
            ? "No locations exist yet."
            : "Assigned to every location already."}
        </p>
      ) : (
        <form
          onSubmit={handleAssign}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <select
            value={selectedLocationId}
            onChange={(event) => setLocationId(event.target.value)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {availableLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "#5B6069",
            }}
          >
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(event) => setIsPrimary(event.target.checked)}
            />
            Primary location
          </label>
          <button
            type="submit"
            disabled={assignLocation.isPending || !selectedLocationId}
            style={buttonStyle}
          >
            {assignLocation.isPending ? "Assigning…" : "Assign location"}
          </button>
        </form>
      )}
      {assignLocation.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {assignLocation.error.message}
        </p>
      ) : null}
    </div>
  );
}

const EXCEPTION_KINDS = [
  { value: "unavailable", label: "Unavailable" },
  { value: "available_override", label: "Available override" },
] as const;

function AvailabilityExceptionsSection({
  teamMemberId,
}: {
  teamMemberId: string;
}) {
  const exceptionsQuery = useTeamAvailabilityExceptionsQuery(teamMemberId);
  const createException =
    useCreateTeamAvailabilityExceptionMutation(teamMemberId);

  const [localDate, setLocalDate] = useState("");
  const [kind, setKind] =
    useState<(typeof EXCEPTION_KINDS)[number]["value"]>("unavailable");
  const [reason, setReason] = useState("");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!localDate) return;
    createException.mutate(
      { localDate, kind, reason: reason || undefined },
      {
        onSuccess: () => {
          setLocalDate("");
          setReason("");
        },
      },
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <h3 style={sectionHeadingStyle}>Availability exceptions</h3>

      {exceptionsQuery.isPending ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
      ) : exceptionsQuery.isError ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
          {exceptionsQuery.error.message}
        </p>
      ) : exceptionsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No exceptions on record.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {exceptionsQuery.data.map((entry) => (
            <div key={entry.id} style={entryCardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: 600 }}>{entry.localDate}</span>
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  {EXCEPTION_KINDS.find((k) => k.value === entry.kind)?.label ??
                    entry.kind}
                </span>
              </div>
              {entry.reason ? (
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  {entry.reason}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <input
            required
            type="date"
            value={localDate}
            onChange={(event) => setLocalDate(event.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
          />
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value as typeof kind)}
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {EXCEPTION_KINDS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={createException.isPending || !localDate}
          style={buttonStyle}
        >
          {createException.isPending ? "Adding…" : "Add exception"}
        </button>
      </form>
      {createException.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createException.error.message}
        </p>
      ) : null}
    </div>
  );
}

export function TeamMemberDetailPanel({
  teamMember,
  onClose,
}: {
  teamMember: TeamMember | null;
  onClose: () => void;
}) {
  if (!teamMember) return null;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
        onClick={onClose}
      />
      <section
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: 460,
          maxWidth: "100%",
          background: "#FFFFFF",
          borderLeft: "1px solid #E6E8EB",
          boxShadow: "-20px 0 60px rgba(10,10,14,0.22)",
          zIndex: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            flex: "0 0 auto",
            borderBottom: "1px solid #E6E8EB",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "-0.016em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {teamMember.displayName}
            </span>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              {teamMember.positionTitle}
            </span>
          </div>
          <span
            onClick={onClose}
            style={{
              marginLeft: "auto",
              width: 28,
              height: 28,
              flex: "0 0 auto",
              borderRadius: 6,
              border: "1px solid #E6E8EB",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#5B6069",
              cursor: "pointer",
            }}
          >
            ✕
          </span>
        </header>

        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <LocationAssignmentsSection teamMemberId={teamMember.id} />
          <WorkingHoursSection teamMemberId={teamMember.id} />
          <AvailabilityExceptionsSection teamMemberId={teamMember.id} />
        </div>
      </section>
    </>
  );
}
