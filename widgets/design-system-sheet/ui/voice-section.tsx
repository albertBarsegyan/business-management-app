import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { zhamoVoice } from "@/shared/config/zhamo-tokens";

export function VoiceSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <ZhamoSectionHeading title="Voice" tag="06 — copy rules" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 14,
        }}
      >
        {zhamoVoice.map((v) => (
          <div
            key={v.rule}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E6E8EB",
              borderRadius: 8,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>{v.rule}</span>
            <span style={{ fontSize: 12.5, color: "#17753C" }}>✓ {v.yes}</span>
            <span style={{ fontSize: 12.5, color: "#C7302F" }}>✕ {v.no}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
