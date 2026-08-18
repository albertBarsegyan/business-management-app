import type { LandingBuilderState } from "../model/use-landing-builder";

export function BuilderTopbar({ state }: { state: LandingBuilderState }) {
  const statusLabel = state.published ? "Published · live" : "Draft — unpublished changes";
  const statusBg = state.published ? "#E7F8EE" : "#FEF6E0";
  const statusColor = state.published ? "#17753C" : "#8A6A05";
  const publishLabel = state.published ? "Published" : "Publish changes";
  const publishBg = state.published ? "#EDEFF2" : "#FFC935";
  const publishColor = state.published ? "#A9AEB6" : "#17170F";

  return (
    <div style={{ height: 56, flex: "0 0 auto", minWidth: 1060, whiteSpace: "nowrap", background: "#FFFFFF", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 12, padding: "0 18px" }}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>Landing page</h1>
      <span style={{ height: 28, padding: "0 4px 0 10px", border: "1px solid #E6E8EB", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#5B6069" }}>
        zhamo.am/studio-aram
        <span title="Copy link" style={{ width: 20, height: 20, borderRadius: 4, background: "#F1F2F4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, cursor: "pointer" }}>
          ⧉
        </span>
      </span>
      <span style={{ height: 22, padding: "0 9px", borderRadius: 6, background: statusBg, color: statusColor, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
        {statusLabel}
      </span>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "inline-flex", padding: 2, background: "#EDEFF2", borderRadius: 7 }}>
          {(["desktop", "phone"] as const).map((d) => (
            <span
              key={d}
              onClick={() => state.setDevice(d)}
              style={{
                height: 26,
                padding: "0 13px",
                borderRadius: 5,
                background: state.device === d ? "#FFFFFF" : "transparent",
                color: state.device === d ? "#16161A" : "#5B6069",
                fontSize: 12.5,
                fontWeight: state.device === d ? 600 : 400,
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {d === "desktop" ? "Desktop" : "Phone"}
            </span>
          ))}
        </div>
        <button className="zhamo-landing-viewlive" style={{ height: 32, padding: "0 13px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          View live
        </button>
        <button
          onClick={state.publish}
          disabled={state.published}
          style={{ height: 32, padding: "0 15px", border: 0, borderRadius: 6, background: publishBg, color: publishColor, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: state.published ? "default" : "pointer" }}
        >
          {publishLabel}
        </button>
      </div>
      <style>{`.zhamo-landing-viewlive:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
