import { classes, weekStripBase } from "../../model/static-content";
import type { BrandingViewModel } from "../../lib/build-view-model";

const spotsColor: Record<"ok" | "warn" | "danger", { light: string; dark: string }> = {
  ok: { light: "#17753C", dark: "#5FD68C" },
  warn: { light: "#8A6A05", dark: "#FFC935" },
  danger: { light: "#C7302F", dark: "#C7302F" },
};

export function PreviewServices({ vals }: { vals: BrandingViewModel }) {
  if (!vals.sections.services) return null;

  return (
    <div style={{ padding: "0 16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingTop: 4, borderTop: `1px solid ${vals.hairline}` }}>
        <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: vals.sectionSize, letterSpacing: "-0.02em", fontWeight: 700, color: vals.inkStrong, paddingTop: 12 }}>
          {vals.servicesHeading}
        </span>
        <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{vals.servicesMeta}</span>
      </div>

      {vals.servicesList && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {vals.services.map((sv) => (
            <div key={sv.name} style={{ minHeight: 52, padding: "11px 0", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${vals.hairline}` }}>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: vals.inkStrong }}>{sv.name}</span>
                <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{sv.meta}</span>
              </span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 13, color: vals.inkStrong }}>{sv.price}</span>
              <button style={{ height: 34, padding: "0 13px", border: `1px solid ${vals.ghostBorder}`, borderRadius: 7, background: "transparent", color: vals.inkStrong, fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                Book
              </button>
            </div>
          ))}
        </div>
      )}

      {vals.servicesCards && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${vals.cardCols}, 1fr)`, gap: 8 }}>
          {vals.services.map((sv) => (
            <div key={sv.name} style={{ border: `1px solid ${vals.hairline}`, borderRadius: 9, overflow: "hidden", background: vals.cardBg }}>
              <span style={{ display: "block", height: 66, background: sv.thumb }} />
              <span style={{ display: "flex", flexDirection: "column", gap: 3, padding: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: vals.inkStrong }}>{sv.name}</span>
                <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{sv.meta}</span>
                <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, color: vals.inkStrong }}>{sv.price}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      {vals.servicesTable && (
        <div style={{ border: `1px solid ${vals.hairline}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 84px 96px 78px", height: 32, alignItems: "center", padding: "0 12px", gap: 8, background: vals.tableHeadBg, fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, letterSpacing: "0.08em", textTransform: "uppercase", color: vals.inkMuted }}>
            <span>Service</span>
            <span>Duration</span>
            <span>Price</span>
            <span></span>
          </div>
          {vals.services.map((sv) => (
            <div key={sv.name} style={{ display: "grid", gridTemplateColumns: "1fr 84px 96px 78px", minHeight: 42, alignItems: "center", padding: "0 12px", gap: 8, borderTop: `1px solid ${vals.hairline}`, fontSize: 12.5, color: vals.inkStrong }}>
              <span>{sv.name}</span>
              <span style={{ color: vals.inkMuted }}>{sv.duration}</span>
              <span style={{ fontFamily: "var(--font-zhamo-mono)" }}>{sv.price}</span>
              <span style={{ justifySelf: "end", height: 28, padding: "0 11px", border: `1px solid ${vals.ghostBorder}`, borderRadius: 6, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                Book
              </span>
            </div>
          ))}
        </div>
      )}

      {vals.servicesTimetable && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 5, overflowX: "auto" }}>
            {weekStripBase.map((d, i) => (
              <span
                key={d.dow}
                style={{
                  minWidth: 54,
                  flex: "0 0 auto",
                  padding: "7px 0",
                  borderRadius: 8,
                  border: `1px solid ${i === 0 ? vals.accent : vals.hairline}`,
                  background: i === 0 ? vals.accent : vals.cardBg,
                  color: i === 0 ? "#FFFFFF" : vals.inkStrong,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span style={{ fontSize: 10, opacity: 0.75 }}>{d.dow}</span>
                <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 15, fontWeight: 700 }}>{d.day}</span>
              </span>
            ))}
          </div>
          {classes.map((c) => (
            <div key={c.time + c.name} style={{ minHeight: 48, padding: "9px 12px", border: `1px solid ${vals.hairline}`, borderRadius: 8, display: "flex", alignItems: "center", gap: 12, background: vals.cardBg }}>
              <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, color: vals.inkStrong, flex: "0 0 auto" }}>{c.time}</span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: vals.inkStrong }}>{c.name}</span>
                <span style={{ fontSize: 11.5, color: vals.inkMuted }}>{c.who}</span>
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: vals.dark ? spotsColor[c.spotsKind].dark : spotsColor[c.spotsKind].light }}>{c.spots}</span>
              <span style={{ height: 30, padding: "0 12px", borderRadius: 6, background: "#FFC935", color: "#17170F", fontSize: 12.5, fontWeight: 600, display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                Join
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
