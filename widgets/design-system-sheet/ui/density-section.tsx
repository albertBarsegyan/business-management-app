import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { zhamoDensity, zhamoSpacing } from "@/shared/config/zhamo-tokens";

export function DensitySection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ZhamoSectionHeading title="Density & space" tag="04 — a data product" />
      <div
        className="zhamo-grid-2"
        style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }}
      >
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E6E8EB",
            borderRadius: 8,
            padding: 24,
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              width: "100%",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-zhamo-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8A9099",
              }}
            >
              Spacing scale — 4px base
            </span>
            {zhamoSpacing.map((s) => (
              <div
                key={s.token}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 11,
                    color: "#8A9099",
                    width: 54,
                  }}
                >
                  {s.token}
                </span>
                <span
                  style={{
                    height: 10,
                    borderRadius: 2,
                    background: "#FFC935",
                    width: s.px,
                  }}
                />
                <span style={{ fontSize: 12, color: "#5B6069" }}>
                  {s.px} · {s.use}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E6E8EB",
            borderRadius: 8,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-mono)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8A9099",
            }}
          >
            Density contract
          </span>
          {zhamoDensity.map((d) => (
            <div
              key={d.k}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                paddingBottom: 9,
                borderBottom: "1px dashed #EEF0F2",
              }}
            >
              <span style={{ fontSize: 13, color: "#16161A" }}>{d.k}</span>
              <span
                style={{
                  fontFamily: "var(--font-zhamo-mono)",
                  fontSize: 12,
                  color: "#5B6069",
                }}
              >
                {d.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
