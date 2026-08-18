import type { LandingBuilderState } from "../../model/use-landing-builder";

export function PreviewFooter({ state }: { state: LandingBuilderState }) {
  const { footer, footerColumns, footerOutline, gutter, dark, device, selectFooter } = state;
  const footerBg = dark ? "#101016" : "#FAFBFC";
  const footerHairline = dark ? "rgba(255,255,255,0.1)" : "#E6E8EB";
  const footerInk = dark ? "rgba(255,255,255,0.82)" : "#16161A";
  const footerMuted = dark ? "rgba(255,255,255,0.45)" : "#8A9099";
  const footerInputBg = dark ? "#1C1C23" : "#FFFFFF";
  const footerInputBorder = dark ? "rgba(255,255,255,0.16)" : "#D5D9DE";
  const cols = device === "phone" ? 1 : footer.cols;

  return (
    <div onClick={selectFooter} style={{ padding: `20px ${gutter} 16px`, background: footerBg, borderTop: `1px solid ${footerHairline}`, cursor: "pointer", outline: footerOutline, outlineOffset: -2, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
        {footerColumns.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, letterSpacing: "0.12em", textTransform: "uppercase", color: footerMuted }}>{col.title}</span>
            {col.items.map((i) => (
              <span key={i} style={{ fontSize: 12.5, color: footerInk }}>
                {i}
              </span>
            ))}
          </div>
        ))}
      </div>
      {footer.signup && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", paddingTop: 4, borderTop: `1px solid ${footerHairline}` }}>
          <span style={{ fontSize: 12.5, color: footerInk, paddingTop: 12 }}>Get offers by SMS</span>
          <span style={{ height: 36, minWidth: 180, borderRadius: 7, border: `1px solid ${footerInputBorder}`, background: footerInputBg, display: "inline-flex", alignItems: "center", padding: "0 11px", fontFamily: "var(--font-zhamo-mono)", fontSize: 12, color: footerMuted, marginTop: 12 }}>
            +374 …
          </span>
          <span style={{ height: 36, padding: "0 14px", borderRadius: 7, background: "#FFC935", color: "#17170F", fontSize: 12.5, fontWeight: 600, display: "inline-flex", alignItems: "center", marginTop: 12 }}>
            Sign up
          </span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", paddingTop: 12, borderTop: `1px solid ${footerHairline}` }}>
        <span style={{ fontSize: 11.5, color: footerMuted }}>© 2026 Studio Aram · Privacy · Terms · Cancellation policy</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {["IG", "TG", "FB"].map((s) => (
            <span key={s} style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${footerInputBorder}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, color: footerInk }}>
              {s}
            </span>
          ))}
        </span>
        {footer.badge && <span style={{ fontSize: 11.5, color: footerMuted }}>Powered by Zhamo</span>}
      </div>
    </div>
  );
}
