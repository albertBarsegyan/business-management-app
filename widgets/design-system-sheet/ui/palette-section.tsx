import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { zhamoNeutrals, zhamoSemantics } from "@/shared/config/zhamo-tokens";

export function PaletteSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ZhamoSectionHeading title="Palette" tag="01 — foundations" />
      <p style={{ margin: 0, maxWidth: "66ch", fontSize: 15, lineHeight: 1.6, color: "#5B6069" }}>
        Refined from the brief: the sidebar goes one step deeper and cooler so the yellow reads
        as light rather than paint, and the neutrals gain a faint blue cast so white cards
        separate from the app background without a shadow.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 12 }}>
        {zhamoNeutrals.map((c) => (
          <div key={c.name} style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: 84, borderBottom: "1px solid #E6E8EB", background: c.hex }} />
            <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099" }}>{c.hex}</span>
              <span style={{ fontSize: 11, color: "#8A9099", lineHeight: 1.4 }}>{c.use}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 12 }}>
        {zhamoSemantics.map((c) => (
          <div key={c.name} style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: 84, borderBottom: "1px solid #E6E8EB", background: c.hex, display: "flex", alignItems: "flex-end", padding: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: c.on }}>{c.sample}</span>
            </div>
            <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099" }}>{c.hex}</span>
              <span style={{ fontSize: 11, color: "#8A9099", lineHeight: 1.4 }}>{c.use}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
