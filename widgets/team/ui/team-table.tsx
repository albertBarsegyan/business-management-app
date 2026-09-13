import type { TeamMember } from "@/shared/api/team/types";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

const STATUS_STYLES: Record<
  TeamMember["employmentStatus"],
  { bg: string; color: string }
> = {
  invited: { bg: "#F4F8FF", color: "#2C6CF6" },
  active: { bg: "#E7F8EE", color: "#17753C" },
  leave: { bg: "#FEF6E0", color: "#8A6A05" },
  inactive: { bg: "#F1F2F4", color: "#5B6069" },
  terminated: { bg: "#FCEAEA", color: "#C7302F" },
};

const GRID_COLUMNS = "2.2fr 1fr 1fr";

export function TeamTable({
  teamMembers,
  onOpenPanel,
  onSelectTeamMember,
}: {
  teamMembers: TeamMember[];
  onOpenPanel: () => void;
  onSelectTeamMember: (teamMember: TeamMember) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-zhamo-display)",
            fontSize: "clamp(24px, 5vw, 34px)",
            lineHeight: 1.05,
            letterSpacing: "-0.022em",
            fontWeight: 700,
          }}
        >
          Team members
        </h1>
        <button
          onClick={onOpenPanel}
          className="zhamo-teamclients-primary-btn"
          style={{
            height: 32,
            padding: "0 16px",
            border: 0,
            borderRadius: 6,
            background: "#FFC935",
            color: "#17170F",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div className="zhamo-table-scroll" style={{ overflowX: "auto" }}>
          <div
            className="zhamo-table-head"
            style={{
              display: "grid",
              gridTemplateColumns: GRID_COLUMNS,
              minWidth: 560,
              height: 34,
              alignItems: "center",
              padding: "0 16px",
              gap: 8,
              background: "#FAFBFC",
              borderBottom: "1px solid #E6E8EB",
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8A9099",
            }}
          >
            <span>Team member</span>
            <span>Employment status</span>
            <span>Online booking</span>
          </div>

          {teamMembers.map((member) => {
            const statusStyle = STATUS_STYLES[member.employmentStatus];
            const contactLine = [member.phoneE164, member.email]
              .filter(Boolean)
              .join(" · ");

            return (
              <div
                key={member.id}
                onClick={() => onSelectTeamMember(member)}
                className="zhamo-teamclients-row zhamo-table-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLUMNS,
                  minWidth: 560,
                  minHeight: 48,
                  alignItems: "center",
                  padding: "4px 16px",
                  gap: 8,
                  borderBottom: "1px solid #EEF0F2",
                  cursor: "pointer",
                }}
              >
                <span
                  data-label="Team member"
                  className="zhamo-table-cell"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      flex: "0 0 auto",
                      borderRadius: "50%",
                      background: "#8A9099",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {initialsOf(member.displayName)}
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
                      {member.displayName}{" "}
                      <span style={{ color: "#8A9099", fontWeight: 400 }}>
                        · {member.positionTitle}
                      </span>
                    </span>
                    {contactLine ? (
                      <span
                        style={{
                          fontFamily: "var(--font-zhamo-mono)",
                          fontSize: 11,
                          color: "#8A9099",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {contactLine}
                      </span>
                    ) : null}
                  </span>
                </span>
                <span
                  data-label="Employment status"
                  className="zhamo-table-cell"
                >
                  <span
                    style={{
                      height: 22,
                      padding: "0 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      textTransform: "capitalize",
                      background: statusStyle.bg,
                      color: statusStyle.color,
                    }}
                  >
                    {member.employmentStatus}
                  </span>
                </span>
                <span data-label="Online booking" className="zhamo-table-cell">
                  <span
                    style={{
                      height: 22,
                      padding: "0 8px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      background: member.onlineBookable ? "#E7F8EE" : "#F1F2F4",
                      color: member.onlineBookable ? "#17753C" : "#8A9099",
                    }}
                  >
                    {member.onlineBookable ? "Bookable" : "Not bookable"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            background: "#FAFBFC",
          }}
        >
          <span style={{ fontSize: 12.5, color: "#8A9099" }}>
            {teamMembers.length} team member
            {teamMembers.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <style>{`
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
        .zhamo-teamclients-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
