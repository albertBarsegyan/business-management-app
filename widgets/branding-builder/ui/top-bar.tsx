import type { BrandingViewModel } from "../lib/build-view-model";

export function TopBar({
  vals,
  onPickDevice,
  onPublish,
}: {
  vals: BrandingViewModel;
  onPickDevice: (device: "desktop" | "phone") => void;
  onPublish: () => void;
}) {
  const devices: { key: "desktop" | "phone"; label: string }[] = [
    { key: "desktop", label: "Desktop" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <div style={{ height: 56, flex: "0 0 auto", minWidth: 1024, whiteSpace: "nowrap", background: "#FFFFFF", borderBottom: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 12, padding: "0 18px" }}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Branding page</h1>
      <span style={{ height: 28, padding: "0 4px 0 10px", border: "1px solid #E6E8EB", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#5B6069" }}>
        zhamo.am/studio-aram
        <span title="Copy link" style={{ width: 20, height: 20, borderRadius: 4, background: "#F1F2F4", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5B6069", cursor: "pointer" }}>
          ⧉
        </span>
      </span>
      <span style={{ height: 22, padding: "0 9px", borderRadius: 6, background: vals.statusBg, color: vals.statusColor, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center" }}>
        {vals.statusLabel}
      </span>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "inline-flex", padding: 2, background: "#EDEFF2", borderRadius: 7 }}>
          {devices.map((d) => (
            <span
              key={d.key}
              onClick={() => onPickDevice(d.key)}
              style={{
                height: 26,
                padding: "0 13px",
                borderRadius: 5,
                background: vals.device === d.key ? "#FFFFFF" : "transparent",
                color: vals.device === d.key ? "#16161A" : "#5B6069",
                fontSize: 12.5,
                fontWeight: vals.device === d.key ? 600 : 400,
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {d.label}
            </span>
          ))}
        </div>
        <button className="zhamo-branding-view-live" style={{ height: 32, padding: "0 13px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          View live
        </button>
        <button
          onClick={onPublish}
          style={{ height: 32, padding: "0 15px", border: 0, borderRadius: 6, background: vals.publishBg, color: vals.publishColor, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: vals.publishCursor }}
        >
          {vals.publishLabel}
        </button>
      </div>
      <style>{`.zhamo-branding-view-live:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
