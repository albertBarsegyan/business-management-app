import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { ZhamoSurfaceCard } from "@/shared/ui/zhamo/surface-card";
import { zhamoTypeScale } from "@/shared/config/zhamo-tokens";

export function TypeScaleSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ZhamoSectionHeading title="Type" tag="03 — Familjen Grotesk / Instrument Sans" />
      <ZhamoSurfaceCard>
        {zhamoTypeScale.map((t) => (
          <div
            key={t.name}
            style={{
              display: "grid",
              gridTemplateColumns: "168px 1fr",
              gap: 24,
              padding: "22px 24px",
              borderBottom: "1px solid #EEF0F2",
              alignItems: "baseline",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099", lineHeight: 1.5 }}>{t.spec}</span>
              <span style={{ fontSize: 11, color: "#8A9099" }}>{t.use}</span>
            </div>
            <div
              style={{
                overflow: "hidden",
                fontFamily: t.family,
                fontSize: t.size,
                lineHeight: t.lh,
                letterSpacing: t.ls,
                fontWeight: t.weight,
                color: "#16161A",
              }}
            >
              {t.sample}
            </div>
          </div>
        ))}
      </ZhamoSurfaceCard>
    </section>
  );
}
