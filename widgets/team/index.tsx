"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildNavItems,
  dayCalendarAccent,
  SidebarNav,
} from "@/widgets/day-calendar";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import type { TeamMember } from "@/shared/api/team/types";
import { AddTeamMemberPanel } from "./ui/add-team-member-panel";
import { TeamMemberDetailPanel } from "./ui/team-member-detail-panel";
import { TeamTable } from "./ui/team-table";
import { TopBar } from "./ui/top-bar";

export function TeamScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] =
    useState<TeamMember | null>(null);

  const expanded = !collapsed;
  const navItems = useMemo(() => buildNavItems(), []);
  const teamMembersQuery = useTeamMembersQuery();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        minHeight: 820,
        overflow: "hidden",
        position: "relative",
        background: "#F5F6F8",
        color: "#16161A",
      }}
    >
      <SidebarNav
        expanded={expanded}
        accent={dayCalendarAccent}
        navItems={navItems}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <main
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          background: "#F5F6F8",
        }}
      >
        <TopBar />
        <div
          className="zhamo-main-pad"
          style={{
            flex: "1 1 auto",
            overflow: "auto",
            padding: "20px 22px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            <Link href="/waitlist" style={{ fontSize: 12.5, color: "#5B6069" }}>
              Waitlist
            </Link>
            <Link
              href="/calendar-blocks"
              style={{ fontSize: 12.5, color: "#5B6069" }}
            >
              Calendar blocks
            </Link>
          </div>
          {teamMembersQuery.isPending ? (
            <p style={{ padding: 24, color: "#8A9099", fontSize: 13.5 }}>
              Loading team members…
            </p>
          ) : teamMembersQuery.isError ? (
            <p style={{ padding: 24, color: "#C7302F", fontSize: 13.5 }}>
              Couldn&apos;t load team members: {teamMembersQuery.error.message}
            </p>
          ) : (
            <TeamTable
              teamMembers={teamMembersQuery.data}
              onOpenPanel={() => setPanelOpen(true)}
              onSelectTeamMember={setSelectedTeamMember}
            />
          )}
        </div>
      </main>
      <AddTeamMemberPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      />
      <TeamMemberDetailPanel
        teamMember={selectedTeamMember}
        onClose={() => setSelectedTeamMember(null)}
      />
    </div>
  );
}
