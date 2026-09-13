"use client";

import { useState } from "react";
import { useCreateTeamMemberMutation } from "@/shared/api/team/queries";
import type { EmploymentType } from "@/shared/api/team/types";

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
    firstName: "",
    lastName: "",
    positionTitle: "",
    phone: "",
    email: "",
    employmentType: "employee" as EmploymentType,
    onlineBookable: true,
    bio: "",
  };
}

export function AddTeamMemberPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState(emptyState);
  const createTeamMember = useCreateTeamMemberMutation();

  if (!open) return null;

  function handleClose() {
    setForm(emptyState());
    createTeamMember.reset();
    onClose();
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const displayName = `${form.firstName} ${form.lastName}`.trim();
    createTeamMember.mutate(
      {
        firstName: form.firstName,
        lastName: form.lastName,
        displayName,
        positionTitle: form.positionTitle,
        phoneE164: form.phone || undefined,
        email: form.email || undefined,
        bio: form.bio || undefined,
        employmentType: form.employmentType,
        onlineBookable: form.onlineBookable,
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
          animation: "zhamo-team-in 0.22s ease both",
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
              Add team member
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
                <span style={labelStyle}>First name</span>
                <input
                  required
                  placeholder="Karen"
                  value={form.firstName}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, firstName: event.target.value }))
                  }
                  style={inputStyle}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span style={labelStyle}>Last name</span>
                <input
                  required
                  placeholder="Sahakyan"
                  value={form.lastName}
                  onChange={(event) =>
                    setForm((f) => ({ ...f, lastName: event.target.value }))
                  }
                  style={inputStyle}
                />
              </label>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Position title</span>
              <input
                required
                placeholder="Barber"
                value={form.positionTitle}
                onChange={(event) =>
                  setForm((f) => ({ ...f, positionTitle: event.target.value }))
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
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Employment type</span>
              <select
                value={form.employmentType}
                onChange={(event) =>
                  setForm((f) => ({
                    ...f,
                    employmentType: event.target.value as EmploymentType,
                  }))
                }
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="employee">Employee</option>
                <option value="contractor">Contractor</option>
                <option value="owner">Owner</option>
                <option value="other">Other</option>
              </select>
            </label>
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
                  Online bookable
                </span>
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  Clients can book this person online.
                </span>
              </span>
              <span
                onClick={() =>
                  setForm((f) => ({ ...f, onlineBookable: !f.onlineBookable }))
                }
                style={{
                  width: 34,
                  height: 20,
                  flex: "0 0 auto",
                  borderRadius: 10,
                  background: form.onlineBookable ? "#16161A" : "#D5D9DE",
                  position: "relative",
                  display: "inline-block",
                  transition: "background 0.15s ease",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: form.onlineBookable ? 16 : 2,
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
              <span style={labelStyle}>Bio</span>
              <textarea
                placeholder="Optional — shown on the public booking profile"
                value={form.bio}
                onChange={(event) =>
                  setForm((f) => ({ ...f, bio: event.target.value }))
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
            {createTeamMember.isError ? (
              <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
                {createTeamMember.error.message}
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
              Name and position title are required.
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
              disabled={createTeamMember.isPending}
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
                cursor: createTeamMember.isPending ? "default" : "pointer",
                opacity: createTeamMember.isPending ? 0.7 : 1,
              }}
            >
              {createTeamMember.isPending ? "Saving…" : "Save team member"}
            </button>
          </footer>
        </form>
      </section>
      <style>{`
        @keyframes zhamo-team-in { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: none; } }
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
      `}</style>
    </>
  );
}
