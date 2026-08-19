import Link from "next/link";
import { buildCatalogue } from "../lib/build-catalogue";
import { principles } from "../model/static-content";

export function CatalogueSection({ accent }: { accent: string }) {
  const catalogue = buildCatalogue(accent);

  return (
    <div style={{ background: "#FFFFFF", borderTop: "1px solid #E6E8EB", padding: "clamp(32px, 8vw, 56px) clamp(16px, 5vw, 40px) clamp(48px, 10vw, 88px)", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", rowGap: 6, alignItems: "center", gap: 12, fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A9099" }}>
            <span>Template catalogue</span>
            <span style={{ color: "#C9CDD3" }}>/</span>
            <Link href="/screens">All screens</Link>
            <span style={{ color: "#C9CDD3" }}>/</span>
            <Link href="/booking">Booking widget</Link>
          </div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: "clamp(28px, 6vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700, maxWidth: "22ch" }}>
            Seven templates, one booking flow.
          </h2>
          <p style={{ margin: 0, maxWidth: "70ch", fontSize: 15, lineHeight: 1.6, color: "#5B6069" }}>
            A template decides the wrapper only: cover treatment, hero size, how services are listed, and which proof
            element carries the page. The five-step booking flow underneath never changes, so a template switch can
            never break a booking — and an owner can switch on a Tuesday afternoon without re-entering a single
            service.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 14 }}>
          {catalogue.map((c) => (
            <div key={c.id} style={{ border: "1px solid #E6E8EB", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ height: 8, background: c.stripe }} />
              <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 24, letterSpacing: "-0.02em", fontWeight: 700 }}>{c.name}</span>
                  <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A9AEB6" }}>{c.kicker}</span>
                </div>
                {c.specs.map((sp) => (
                  <div key={sp.k} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 12, paddingBottom: 8, borderBottom: "1px dashed #EEF0F2" }}>
                    <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A9AEB6", paddingTop: 2 }}>{sp.k}</span>
                    <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "#16161A" }}>{sp.v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #E6E8EB", borderRadius: 10, padding: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 22, background: "#FAFBFC" }}>
          {principles.map((p) => (
            <div key={p.k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.k}</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5B6069" }}>{p.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
