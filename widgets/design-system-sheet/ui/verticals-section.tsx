import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { zhamoVerticals } from "@/shared/config/zhamo-tokens";

export function VerticalsSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ZhamoSectionHeading title="Vertical accents" tag="02 — nine verticals, one codebase" />
      <p style={{ margin: 0, maxWidth: "68ch", fontSize: 15, lineHeight: 1.6, color: "#5B6069" }}>
        Yellow always owns the primary action — it never changes. The vertical accent owns
        identity: the Administration button, the active nav marker, selection states, chart
        series, and appointment-block tinting. All six sit at one lightness and chroma, varying
        only in hue, so the back office never changes weight when a barbershop and a dental
        clinic sit side by side.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(196px, 1fr))", gap: 14 }}>
        {zhamoVerticals.map((v) => (
          <div key={v.id} style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#14141A", padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 9px", borderRadius: 6, background: "rgba(255,255,255,0.06)" }}>
                <span style={{ width: 3, height: 16, borderRadius: 2, background: v.accent }} />
                <span style={{ fontSize: 12, color: "#FFFFFF", fontWeight: 500 }}>{v.nav}</span>
              </div>
              <div style={{ height: 30, borderRadius: 6, background: v.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>
                Administration
              </div>
            </div>
            <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{v.name}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10.5, color: "#8A9099" }}>{v.accent}</span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ height: 22, padding: "0 9px", borderRadius: 6, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", background: v.tint, color: v.accent }}>
                  {v.example}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
