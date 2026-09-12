"use client";

import { useState } from "react";
import { PageHeader, PageShell } from "@/widgets/day-calendar";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import {
  useCalendarBlocksQuery,
  useCreateCalendarBlockMutation,
} from "@/shared/api/scheduling/queries";
import type {
  CalendarBlockKind,
  CreateCalendarBlockRequest,
} from "@/shared/api/scheduling/types";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const KINDS: CalendarBlockKind[] = ["break", "time_off", "external", "other"];

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function CalendarBlocksScreen() {
  const blocksQuery = useCalendarBlocksQuery();
  const teamMembersQuery = useTeamMembersQuery();
  const createBlock = useCreateCalendarBlockMutation();

  const [teamMemberId, setTeamMemberId] = useState("");
  const [kind, setKind] = useState<CalendarBlockKind>("time_off");
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState(() => toLocalInputValue(new Date()));
  const [endsAt, setEndsAt] = useState(() =>
    toLocalInputValue(new Date(Date.now() + 60 * 60 * 1000)),
  );

  const teamMembers = teamMembersQuery.data ?? [];
  const selectedTeamMemberId = teamMemberId || teamMembers[0]?.id || "";

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedTeamMemberId || !title.trim()) return;
    const body: CreateCalendarBlockRequest = {
      teamMemberIds: [selectedTeamMemberId],
      kind,
      title,
      startsAt: new Date(startsAt).toISOString(),
      endsAt: new Date(endsAt).toISOString(),
    };
    createBlock.mutate(body, { onSuccess: () => setTitle("") });
  }

  return (
    <PageShell>
      <PageHeader
        title="Calendar blocks"
        subtitle="Breaks, time off, and other non-service busy time."
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
        {blocksQuery.isPending ? (
          <p style={{ margin: 0, fontSize: 13, color: "#8A9099" }}>Loading…</p>
        ) : blocksQuery.isError ? (
          <p style={{ margin: 0, fontSize: 13, color: "#C7302F" }}>
            {blocksQuery.error.message}
          </p>
        ) : blocksQuery.data.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "#8A9099" }}>
            No blocks on the calendar.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {blocksQuery.data.map((block) => (
              <div
                key={block.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "10px 12px",
                  border: "1px solid #EEF0F2",
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{block.title}</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#8A9099",
                      textTransform: "capitalize",
                    }}
                  >
                    {block.kind.replace("_", " ")}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  {new Date(block.startsAt).toLocaleString()} –{" "}
                  {new Date(block.endsAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
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
          Add a block
        </span>
        <form
          onSubmit={handleAdd}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <select
              value={selectedTeamMemberId}
              onChange={(event) => setTeamMemberId(event.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {teamMembers.length === 0 ? (
                <option value="">No team members yet</option>
              ) : (
                teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.displayName}
                  </option>
                ))
              )}
            </select>
            <select
              value={kind}
              onChange={(event) =>
                setKind(event.target.value as CalendarBlockKind)
              }
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
          <input
            required
            placeholder="Title (e.g. Lunch break)"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={inputStyle}
          />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#8A9099" }}>Starts</span>
              <input
                type="datetime-local"
                value={startsAt}
                onChange={(event) => setStartsAt(event.target.value)}
                style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#8A9099" }}>Ends</span>
              <input
                type="datetime-local"
                value={endsAt}
                onChange={(event) => setEndsAt(event.target.value)}
                style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={
              createBlock.isPending || !selectedTeamMemberId || !title.trim()
            }
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
            {createBlock.isPending ? "Adding…" : "Add block"}
          </button>
        </form>
        {createBlock.isError ? (
          <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
            {createBlock.error.message}
          </p>
        ) : null}
      </div>
    </PageShell>
  );
}
