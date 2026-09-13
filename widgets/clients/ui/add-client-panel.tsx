"use client";

import { useState } from "react";
import { useCreateClientMutation } from "@/shared/api/clients/queries";
import type { ClientImportance } from "@/shared/api/clients/types";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "#5B6069",
};

function emptyState() {
  return {
    displayName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    importance: "regular" as ClientImportance,
    onlineBookingDisabled: false,
    note: "",
  };
}

export function AddClientPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState(emptyState);
  const createClient = useCreateClientMutation();

  if (!open) return null;

  function handleClose() {
    setForm(emptyState());
    createClient.reset();
    onClose();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    createClient.mutate(
      {
        client: {
          displayName: form.displayName,
          dateOfBirth: form.dateOfBirth || undefined,
          importance: form.importance,
          onlineBookingDisabled: form.onlineBookingDisabled,
        },
        phone: form.phone,
        email: form.email || undefined,
        note: form.note || undefined,
      },
      { onSuccess: handleClose },
    );
  }

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,26,0.42)",
          zIndex: 15,
        }}
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
          animation: "zhamo-teamclients-in 0.22s ease both",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            minHeight: 0,
          }}
        >
          <header
            style={{
              height: 52,
              flex: "0 0 auto",
              borderBottom: "1px solid #E6E8EB",
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.018em",
              }}
            >
              Add client
            </span>
            <span
              onClick={handleClose}
              style={{
                marginLeft: "auto",
                width: 28,
                height: 28,
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
              gap: 14,
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Name</span>
              <input
                required
                placeholder="Example: Anahit Grigoryan"
                value={form.displayName}
                onChange={(event) =>
                  setForm((f) => ({ ...f, displayName: event.target.value }))
                }
                style={inputStyle}
              />
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Phone</span>
                <input
                  required
                  placeholder="+374 77 000 000"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, phone: event.target.value }))
                  }
                  style={{
                    ...inputStyle,
                    fontFamily: "var(--font-zhamo-mono)",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Email</span>
                <input
                  type="email"
                  placeholder="optional"
                  value={form.email}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, email: event.target.value }))
                  }
                  style={inputStyle}
                />
              </label>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Date of birth</span>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, dateOfBirth: event.target.value }))
                  }
                  style={{
                    ...inputStyle,
                    fontFamily: "var(--font-zhamo-mono)",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Importance class</span>
                <select
                  value={form.importance}
                  onChange={(event) =>
                    setForm((f) => ({
                      ...f,
                      importance: event.target.value as ClientImportance,
                    }))
                  }
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  <option value="regular">Regular</option>
                  <option value="vip">VIP</option>
                </select>
              </label>
            </div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "11px 12px",
                border: "1px solid #E6E8EB",
                borderRadius: 8,
                background: "#FAFBFC",
                cursor: "pointer",
              }}
            >
              <span
                style={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>
                  Disable online booking
                </span>
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  They can still be booked by staff.
                </span>
              </span>
              <span
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    onlineBookingDisabled: !f.onlineBookingDisabled,
                  }))
                }
                style={{
                  width: 34,
                  height: 20,
                  flex: "0 0 auto",
                  borderRadius: 10,
                  background: form.onlineBookingDisabled
                    ? "#16161A"
                    : "#D5D9DE",
                  position: "relative",
                  display: "inline-block",
                  transition: "background 0.15s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: form.onlineBookingDisabled ? 16 : 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#FFFFFF",
                    transition: "left 0.15s ease",
                  }}
                />
              </span>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Note</span>
              <textarea
                placeholder="Anything the team should know before she sits down"
                value={form.note}
                onChange={(event) =>
                  setForm((f) => ({ ...f, note: event.target.value }))
                }
                style={{
                  minHeight: 68,
                  padding: "8px 10px",
                  border: "1px solid #D5D9DE",
                  borderRadius: 6,
                  fontFamily: "inherit",
                  fontSize: 13,
                  resize: "vertical",
                }}
              />
            </label>
            {createClient.isError ? (
              <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
                {createClient.error.message}
              </p>
            ) : null}
          </div>
          <footer
            style={{
              flex: "0 0 auto",
              height: 60,
              borderTop: "1px solid #E6E8EB",
              background: "#FAFBFC",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 18px",
            }}
          >
            <span style={{ fontSize: 11.5, color: "#8A9099" }}>
              Name and phone are required.
            </span>
            <button
              type="button"
              onClick={handleClose}
              style={{
                marginLeft: "auto",
                height: 36,
                padding: "0 14px",
                border: "1px solid #D5D9DE",
                borderRadius: 6,
                background: "#FFFFFF",
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createClient.isPending}
              className="zhamo-teamclients-primary-btn"
              style={{
                height: 36,
                padding: "0 18px",
                border: 0,
                borderRadius: 6,
                background: "#FFC935",
                color: "#17170F",
                fontFamily: "inherit",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: createClient.isPending ? "default" : "pointer",
                opacity: createClient.isPending ? 0.7 : 1,
              }}
            >
              {createClient.isPending ? "Saving…" : "Save client"}
            </button>
          </footer>
        </form>
      </section>
      <style>{`
        @keyframes zhamo-teamclients-in { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
      `}</style>
    </>
  );
}
