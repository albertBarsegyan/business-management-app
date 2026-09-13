import type { AppointmentPanelState } from "../model/use-appointment-panel";

export function ClientColumn({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A9AEB6",
          }}
        >
          Client
        </span>

        {state.selectedClient ? (
          <>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
                Name
              </span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {state.selectedClient.displayName}
              </span>
            </label>
            {state.selectedClientPhone && (
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}
                >
                  Phone
                </span>
                <span
                  style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }}
                >
                  {state.selectedClientPhone}
                </span>
              </label>
            )}
            {state.selectedClientEmail && (
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}
                >
                  Email
                </span>
                <span style={{ fontSize: 13 }}>
                  {state.selectedClientEmail}
                </span>
              </label>
            )}
            {!state.isEdit && (
              <span
                onClick={() => state.onSelectClient(null)}
                style={{ fontSize: 12, color: "#2C6CF6", cursor: "pointer" }}
              >
                Change client
              </span>
            )}
          </>
        ) : (
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
              Search clients
            </span>
            <input
              value={state.clientSearch}
              onChange={(e) => state.setClientSearch(e.target.value)}
              placeholder="Name…"
              style={{
                height: 32,
                padding: "0 10px",
                border: "1px solid #D5D9DE",
                borderRadius: 6,
                fontFamily: "inherit",
                fontSize: 13,
              }}
            />
          </label>
        )}
      </div>

      {!state.selectedClient && (
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E6E8EB",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "13px 16px 11px",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-mono)",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#A9AEB6",
              }}
            >
              Clients
            </span>
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              {state.clientMatches.length} match
              {state.clientMatches.length === 1 ? "" : "es"}
            </span>
          </div>
          {state.clientMatches.map((c) => (
            <div
              key={c.id}
              onClick={() => state.onSelectClient(c.id)}
              className="zhamo-apptpanel-match"
              style={{
                padding: "9px 16px",
                borderTop: "1px solid #EEF0F2",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  background: "#8A9099",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.displayName
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 600 }}>
                {c.displayName}
              </span>
            </div>
          ))}
        </div>
      )}
      <style>{`.zhamo-apptpanel-match:hover { background: #FAFBFC; }`}</style>
    </div>
  );
}
