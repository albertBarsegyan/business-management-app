import type { AppointmentPanelState } from "../model/use-appointment-panel";

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E6E8EB",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};
const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
const captionStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "#5B6069",
};
const fieldStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};
const kickerStyle: React.CSSProperties = {
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#A9AEB6",
};

export function TimingColumn({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={cardStyle}>
        <span style={kickerStyle}>Timing</span>

        {!state.isEdit && (
          <>
            <label style={labelStyle}>
              <span style={captionStyle}>Location</span>
              <select
                value={state.locationId}
                onChange={(e) => state.setLocationId(e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select a location…</option>
                {state.locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={labelStyle}>
              <span style={captionStyle}>Team member</span>
              <select
                value={state.teamMemberId}
                onChange={(e) => state.setTeamMemberId(e.target.value)}
                style={fieldStyle}
              >
                <option value="">Select a team member…</option>
                {state.teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.displayName}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <label style={labelStyle}>
          <span style={captionStyle}>
            {state.isEdit ? "Reschedule to" : "Start"}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="datetime-local"
              value={state.startsAtLocal}
              onChange={(e) => state.setStartsAtLocal(e.target.value)}
              style={{ ...fieldStyle, flex: 1 }}
            />
            {state.isEdit && (
              <button
                onClick={state.onReschedule}
                disabled={state.isRescheduling || !state.startsAtLocal}
                style={{
                  height: 32,
                  padding: "0 12px",
                  border: "1px solid #D5D9DE",
                  borderRadius: 6,
                  background: "#FFFFFF",
                  fontFamily: "inherit",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: state.isRescheduling ? "default" : "pointer",
                  flex: "0 0 auto",
                }}
              >
                {state.isRescheduling ? "Moving…" : "Move"}
              </button>
            )}
          </div>
        </label>

        {!state.isEdit && (
          <label style={labelStyle}>
            <span style={captionStyle}>Notes</span>
            <textarea
              value={state.notes}
              onChange={(e) => state.setNotes(e.target.value)}
              placeholder="Visible to staff only"
              style={{
                minHeight: 70,
                padding: "8px 10px",
                border: "1px solid #D5D9DE",
                borderRadius: 6,
                fontFamily: "inherit",
                fontSize: 13,
                resize: "vertical",
                lineHeight: 1.45,
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}
