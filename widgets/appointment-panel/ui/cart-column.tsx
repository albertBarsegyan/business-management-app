"use client";

import { statusStyle } from "../model/appointment-panel-data";
import type { AppointmentPanelState } from "../model/use-appointment-panel";

const cardStyle: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #E6E8EB",
  borderRadius: 8,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
const kickerStyle: React.CSSProperties = {
  fontFamily: "var(--font-zhamo-mono)",
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#A9AEB6",
};

function StatusPills({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={cardStyle}>
      <span style={kickerStyle}>Visit status</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6,
        }}
      >
        {state.statusOptions.map((option) => {
          const s = statusStyle[option];
          const on = state.status === option;
          return (
            <span
              key={option}
              onClick={() =>
                !state.isStatusSaving && state.onSelectStatus(option)
              }
              className="zhamo-apptpanel-status"
              style={{
                height: 46,
                borderRadius: 7,
                border: `1.5px solid ${on ? s.dot : "#E6E8EB"}`,
                background: on ? s.bg : "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                cursor: state.isStatusSaving ? "default" : "pointer",
                opacity: state.isStatusSaving ? 0.6 : 1,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: s.dotRadius,
                  background: s.dot,
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: on ? 600 : 400,
                  color: on ? s.color : "#5B6069",
                }}
              >
                {state.statusLabels[option]}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function NewServicePicker({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "13px 16px 0" }}>
        <span style={kickerStyle}>Service</span>
      </div>
      <div style={{ borderTop: "1px solid #EEF0F2", marginTop: 10 }}>
        {state.serviceOptions.length === 0 && (
          <p
            style={{ padding: 16, fontSize: 12.5, color: "#8A9099", margin: 0 }}
          >
            No active services yet.
          </p>
        )}
        {state.serviceOptions.map((s) => {
          const selected = state.selectedVariantId === s.variantId;
          return (
            <div
              key={s.variantId}
              onClick={() => state.setSelectedVariantId(s.variantId)}
              className="zhamo-apptpanel-service-row"
              style={{
                height: 44,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                borderBottom: "1px solid #EEF0F2",
                background: selected ? "#FFFDF6" : "#FFFFFF",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: selected ? 600 : 400,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.label}
                </span>
                <span style={{ fontSize: 11.5, color: "#8A9099" }}>
                  {s.meta}
                </span>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-zhamo-mono)",
                  fontSize: 12.5,
                  color: "#16161A",
                }}
              >
                {s.price}
              </span>
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: selected ? "#FFC935" : "#F3F4F6",
                  color: selected ? "#17170F" : "#5B6069",
                  fontSize: 12,
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {selected ? "✓" : "+"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EditCart({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "13px 16px 0" }}>
        <span style={kickerStyle}>Services</span>
      </div>
      <div style={{ borderTop: "1px solid #EEF0F2", marginTop: 10 }}>
        {state.cartItems.length === 0 && (
          <p
            style={{ padding: 16, fontSize: 12.5, color: "#8A9099", margin: 0 }}
          >
            No services on this booking.
          </p>
        )}
        {state.cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              height: 44,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              borderBottom: "1px solid #EEF0F2",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.variantNameSnapshot
                  ? `${item.serviceNameSnapshot} — ${item.variantNameSnapshot}`
                  : item.serviceNameSnapshot}
              </span>
              <span style={{ fontSize: 11.5, color: "#8A9099" }}>
                {item.durationMinutesSnapshot} min
              </span>
            </span>
            <span
              style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5 }}
            >
              {(Number(item.lineTotalMinor) / 100).toLocaleString()}{" "}
              {item.currencyCode}
            </span>
            <span
              onClick={() => state.onRemoveCartItem(item.id)}
              style={{
                fontSize: 13,
                color: "#8A9099",
                cursor: "pointer",
                padding: 4,
              }}
            >
              ✕
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: "#FAFBFC",
        }}
      >
        <span style={{ fontSize: 11.5, fontWeight: 600, color: "#5B6069" }}>
          Add another service
        </span>
        <select
          value={state.newItemVariantId}
          onChange={(e) => state.setNewItemVariantId(e.target.value)}
          style={{
            height: 30,
            padding: "0 8px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            fontSize: 12.5,
          }}
        >
          <option value="">Service…</option>
          {state.serviceOptions.map((s) => (
            <option key={s.variantId} value={s.variantId}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          value={state.newItemTeamMemberId}
          onChange={(e) => state.setNewItemTeamMemberId(e.target.value)}
          style={{
            height: 30,
            padding: "0 8px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            fontSize: 12.5,
          }}
        >
          <option value="">Team member…</option>
          {state.teamMembers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.displayName}
            </option>
          ))}
        </select>
        <button
          onClick={state.onAddCartItem}
          disabled={
            state.isAddingItem ||
            !state.newItemVariantId ||
            !state.newItemTeamMemberId
          }
          style={{
            height: 30,
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            background: "#FFFFFF",
            fontFamily: "inherit",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {state.isAddingItem ? "Adding…" : "Add"}
        </button>
      </div>
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FAFBFC",
          borderTop: "1px solid #EEF0F2",
        }}
      >
        <span style={{ fontSize: 12.5, color: "#5B6069" }}>
          {state.cartItems.length} service
          {state.cartItems.length === 1 ? "" : "s"}
        </span>
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.018em",
          }}
        >
          {state.cartTotal}
        </span>
      </div>
    </div>
  );
}

export function CartColumn({ state }: { state: AppointmentPanelState }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {state.isEdit && <StatusPills state={state} />}
      {state.isEdit ? (
        <EditCart state={state} />
      ) : (
        <NewServicePicker state={state} />
      )}
      <style>{`
        .zhamo-apptpanel-status:hover { border-color: #16161A; }
        .zhamo-apptpanel-service-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
