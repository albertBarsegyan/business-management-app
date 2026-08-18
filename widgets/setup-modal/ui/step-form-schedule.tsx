import { dayKeys, hourPresetValues, radioTile, type DayKey, type HourPreset } from "../model/types";

export function StepFormSchedule({
  days,
  hours,
  onToggleDay,
  onPickHours,
}: {
  days: Record<DayKey, boolean>;
  hours: HourPreset;
  onToggleDay: (d: DayKey) => void;
  onPickHours: (h: HourPreset) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 460 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Working days</span>
        <div style={{ display: "flex", gap: 5 }}>
          {dayKeys.map((k) => {
            const on = days[k];
            return (
              <span
                key={k}
                onClick={() => onToggleDay(k)}
                style={{
                  width: 42,
                  height: 34,
                  borderRadius: 6,
                  fontSize: 12.5,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: `1px solid ${on ? "#16161A" : "#D5D9DE"}`,
                  background: on ? "#16161A" : "#FFFFFF",
                  color: on ? "#FFFFFF" : "#8A9099",
                  fontWeight: on ? 600 : 400,
                }}
              >
                {k}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Opening hours</span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {hourPresetValues.map((label, i) => {
            const h = radioTile(label, hours === label);
            return (
              <span
                key={label}
                onClick={() => onPickHours(label)}
                className="zhamo-setup-tile"
                style={{
                  height: 34,
                  padding: "0 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  cursor: "pointer",
                  border: `1px solid ${h.border}`,
                  background: h.bg,
                  color: h.color,
                  fontWeight: h.weight,
                  gridColumn: i === 4 ? "span 2" : "auto",
                }}
              >
                <span style={{ width: 12, height: 12, borderRadius: "50%", border: `1px solid ${h.dotBorder}`, background: h.dotBg, flex: "0 0 auto" }} />
                {h.label}
              </span>
            );
          })}
        </div>
      </div>
      {hours === "Custom hours" && (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, padding: 14, border: "1px solid #E6E8EB", borderRadius: 8, background: "#FAFBFC" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Opens</span>
            <input defaultValue="08:30" style={{ height: 32, width: 90, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
          </label>
          <span style={{ height: 32, display: "inline-flex", alignItems: "center", color: "#A9AEB6" }}>—</span>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>Closes</span>
            <input defaultValue="21:00" style={{ height: 32, width: 90, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 13 }} />
          </label>
          <span style={{ fontSize: 11.5, color: "#8A9099", paddingBottom: 8 }}>Applies to every working day.</span>
        </div>
      )}
      <span style={{ fontSize: 12, color: "#8A9099", lineHeight: 1.5 }}>Sunday is closed by default — tap it to open.</span>
      <style>{`.zhamo-setup-tile:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
