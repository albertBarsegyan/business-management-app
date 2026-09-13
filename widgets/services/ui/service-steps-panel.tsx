"use client";

import { useState } from "react";
import {
  useCreateServiceStepMutation,
  useServiceStepsQuery,
} from "@/shared/api/catalog/queries";
import type { StaffOccupancy } from "@/shared/api/catalog/types";

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

const OCCUPANCY_LABEL: Record<StaffOccupancy, string> = {
  required: "Staff required",
  optional: "Staff optional",
  none: "Unattended",
};

const OCCUPANCY_STYLE: Record<StaffOccupancy, { bg: string; color: string }> = {
  required: { bg: "#F1F2F4", color: "#5B6069" },
  optional: { bg: "#F4F8FF", color: "#2C6CF6" },
  none: { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
};

export interface StepsPanelTarget {
  serviceId: string;
  serviceName: string;
  variantId: string;
  variantDurationMinutes: number;
}

function StepsList({
  variantId,
  variantDurationMinutes,
}: {
  variantId: string;
  variantDurationMinutes: number;
}) {
  const stepsQuery = useServiceStepsQuery(variantId);
  const createStep = useCreateServiceStepMutation(variantId);
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("15");
  const [staffOccupancy, setStaffOccupancy] =
    useState<StaffOccupancy>("required");

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    createStep.mutate(
      { name, durationMinutes: Number(durationMinutes), staffOccupancy },
      { onSuccess: () => setName("") },
    );
  }

  if (stepsQuery.isPending) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>Loading…</p>
    );
  }
  if (stepsQuery.isError) {
    return (
      <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
        {stepsQuery.error.message}
      </p>
    );
  }

  const totalStepMinutes = stepsQuery.data.reduce(
    (sum, step) => sum + step.durationMinutes,
    0,
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {stepsQuery.data.length === 0 ? (
        <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>
          No steps yet — the whole duration consumes the assigned staff member.
        </p>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {stepsQuery.data.map((step, index) => {
              const occupancyStyle = OCCUPANCY_STYLE[step.staffOccupancy];
              return (
                <div
                  key={step.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    border: "1px solid #EEF0F2",
                    borderRadius: 6,
                    fontSize: 12.5,
                  }}
                >
                  <span style={{ color: "#8A9099", flex: "0 0 auto" }}>
                    {index + 1}.
                  </span>
                  <span style={{ flex: "1 1 auto", fontWeight: 600 }}>
                    {step.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-zhamo-mono)",
                      color: "#5B6069",
                      flex: "0 0 auto",
                    }}
                  >
                    {step.durationMinutes} min
                  </span>
                  <span
                    style={{
                      height: 18,
                      padding: "0 6px",
                      borderRadius: 5,
                      fontSize: 10,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      flex: "0 0 auto",
                      background: occupancyStyle.bg,
                      color: occupancyStyle.color,
                    }}
                  >
                    {OCCUPANCY_LABEL[step.staffOccupancy]}
                  </span>
                </div>
              );
            })}
          </div>
          <p style={{ margin: 0, fontSize: 11, color: "#8A9099" }}>
            Steps total {totalStepMinutes} min · variant duration{" "}
            {variantDurationMinutes} min
            {totalStepMinutes !== variantDurationMinutes
              ? " — these don't match"
              : ""}
          </p>
        </>
      )}

      <form
        onSubmit={handleAdd}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          required
          placeholder="Step name, e.g. Apply colour"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={inputStyle}
        />
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
        >
          <input
            required
            type="number"
            min={1}
            value={durationMinutes}
            onChange={(event) => setDurationMinutes(event.target.value)}
            style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
          />
          <select
            value={staffOccupancy}
            onChange={(event) =>
              setStaffOccupancy(event.target.value as StaffOccupancy)
            }
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="required">Staff required</option>
            <option value="optional">Staff optional</option>
            <option value="none">Unattended</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={createStep.isPending}
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
          {createStep.isPending ? "Adding…" : "Add step"}
        </button>
      </form>
      {createStep.isError ? (
        <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
          {createStep.error.message}
        </p>
      ) : null}
    </div>
  );
}

export function ServiceStepsPanel({
  target,
  onClose,
}: {
  target: StepsPanelTarget | null;
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
              Steps
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
          <h3 style={sectionHeadingStyle}>Stages of this service</h3>
          <StepsList
            variantId={target.variantId}
            variantDurationMinutes={target.variantDurationMinutes}
          />
        </div>
      </section>
    </>
  );
}
