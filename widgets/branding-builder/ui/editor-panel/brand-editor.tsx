import { accentSwatchColors } from "../../model/template-catalog";

export function BrandEditor({
  coverBg,
  accent,
  onPickAccent,
}: {
  coverBg: string;
  accent: string;
  onPickAccent: (hex: string) => void;
}) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid #EEF0F2", display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600 }}>Brand</span>
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ width: 52, height: 52, flex: "0 0 auto", borderRadius: 9, border: "1px dashed #D5D9DE", background: "#FAFBFC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, cursor: "pointer", fontSize: 9.5, color: "#8A9099" }}>
          <span style={{ fontSize: 13, color: "#16161A" }}>A</span>logo
        </span>
        <span style={{ flex: 1, height: 52, borderRadius: 9, border: "1px dashed #D5D9DE", background: coverBg, display: "flex", alignItems: "flex-end", padding: "6px 8px", cursor: "pointer", fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, color: "rgba(255,255,255,0.9)" }}>
          replace cover
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <span style={{ fontSize: 12, color: "#5B6069" }}>Accent — inherited from your vertical</span>
        <div style={{ display: "flex", gap: 6 }}>
          {accentSwatchColors.map((hex) => (
            <span
              key={hex}
              onClick={() => onPickAccent(hex)}
              style={{ width: 30, height: 30, borderRadius: 7, background: hex, border: `2px solid ${accent === hex ? "#16161A" : "transparent"}`, cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Page address</span>
        <span style={{ display: "flex", height: 32, border: "1px solid #D5D9DE", borderRadius: 6, overflow: "hidden" }}>
          <span style={{ padding: "0 8px", borderRight: "1px solid #E6E8EB", background: "#FAFBFC", fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, display: "inline-flex", alignItems: "center", color: "#8A9099" }}>
            zhamo.am/
          </span>
          <input readOnly defaultValue="studio-aram" style={{ flex: 1, minWidth: 0, border: 0, padding: "0 9px", fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, outline: "none" }} />
        </span>
      </label>
    </div>
  );
}
