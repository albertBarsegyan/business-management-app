import type { LandingBuilderState } from "../../model/use-landing-builder";

export function PublishChecklist({ state }: { state: LandingBuilderState }) {
  return (
    <div
      style={{
        padding: "14px 16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 12.5, fontWeight: 600 }}>
        Before you publish
      </span>
      {state.checks.map((c) => (
        <div
          key={c.text}
          style={{ display: "flex", gap: 9, alignItems: "flex-start" }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              flex: "0 0 auto",
              marginTop: 1,
              borderRadius: "50%",
              background: c.bg,
              color: "#FFFFFF",
              fontSize: 10,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {c.glyph}
          </span>
          <span style={{ fontSize: 12, lineHeight: 1.45, color: c.color }}>
            {c.text}
          </span>
        </div>
      ))}
    </div>
  );
}
