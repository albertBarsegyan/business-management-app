"use client";

import {
  useTeamAssignmentsQuery,
  useUpsertTeamAssignmentMutation,
} from "@/shared/api/catalog/queries";
import { useTeamMembersQuery } from "@/shared/api/team/queries";

const sectionHeadingStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A9099",
};

export interface StaffPanelTarget {
  serviceId: string;
  serviceName: string;
  variantId: string;
}

function StaffAssignmentsList({ variantId }: { variantId: string }) {
  const teamMembersQuery = useTeamMembersQuery();
  const assignmentsQuery = useTeamAssignmentsQuery(variantId);
  const upsert = useUpsertTeamAssignmentMutation(variantId);
  const pendingMemberId = upsert.isPending
    ? upsert.variables?.teamMemberId
    : undefined;

  if (teamMembersQuery.isPending || assignmentsQuery.isPending) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
    );
  }
  if (teamMembersQuery.isError) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
        {teamMembersQuery.error.message}
      </p>
    );
  }
  if (assignmentsQuery.isError) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
        {assignmentsQuery.error.message}
      </p>
    );
  }
  if (teamMembersQuery.data.length === 0) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
        No team members yet — add one in the Team section first.
      </p>
    );
  }

  const enabledByMemberId = new Map(
    assignmentsQuery.data.map((assignment) => [
      assignment.teamMemberId,
      assignment.enabled,
    ]),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {teamMembersQuery.data.map((member) => {
        const enabled = enabledByMemberId.get(member.id) ?? false;
        const isPendingRow = pendingMemberId === member.id;
        return (
          <div
            key={member.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              border: "1px solid #EEF0F2",
              borderRadius: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                flex: "1 1 auto",
              }}
            >
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {member.displayName}
              </span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>
                {member.positionTitle}
              </span>
            </div>
            <span
              onClick={() => {
                if (isPendingRow) return;
                upsert.mutate({
                  teamMemberId: member.id,
                  body: { enabled: !enabled },
                });
              }}
              style={{
                width: 34,
                height: 20,
                flex: "0 0 auto",
                borderRadius: 10,
                background: enabled ? "#16161A" : "#D5D9DE",
                position: "relative",
                display: "inline-block",
                cursor: isPendingRow ? "default" : "pointer",
                opacity: isPendingRow ? 0.5 : 1,
                transition: "background 0.15s ease",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  left: enabled ? 16 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  transition: "left 0.15s ease",
                }}
              />
            </span>
          </div>
        );
      })}
      {upsert.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {upsert.error.message}
        </p>
      ) : null}
    </div>
  );
}

export function StaffAssignmentsPanel({
  target,
  onClose,
}: {
  target: StaffPanelTarget | null;
  onClose: () => void;
}) {
  if (!target) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
        onClick={onClose}
      />
      <section
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 420,
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
              Staff
            </span>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              {target.serviceName}
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
            gap: 10,
          }}
        >
          <h3 style={sectionHeadingStyle}>Who can perform this service</h3>
          <StaffAssignmentsList variantId={target.variantId} />
        </div>
      </section>
    </>
  );
}
