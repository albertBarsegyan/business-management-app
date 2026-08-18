import type { TimeSlot } from "../model/slots";
import { team } from "../model/team";
import { AnnaColumn } from "./appointment-columns/anna-column";
import { DavitColumn } from "./appointment-columns/davit-column";
import { KarenColumn } from "./appointment-columns/karen-column";
import { MariamColumn } from "./appointment-columns/mariam-column";
import { EmptyDayOverlay } from "./empty-day-overlay";
import { NowIndicator } from "./now-indicator";
import { TimeRail } from "./time-rail";

export function CalendarGrid({
  slots,
  showAppointments,
  showEmpty,
}: {
  slots: TimeSlot[];
  showAppointments: boolean;
  showEmpty: boolean;
}) {
  return (
    <div style={{ flex: "1 1 auto", overflow: "auto", padding: "14px 16px 24px" }}>
      <div style={{ minWidth: 900, background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px repeat(4, 1fr) 56px", borderBottom: "1px solid #E6E8EB", background: "#FAFBFC", position: "sticky", top: 0, zIndex: 3 }}>
          <span style={{ borderRight: "1px solid #E6E8EB" }} />
          {team.map((m) => (
            <div key={m.name} style={{ padding: "10px 12px", borderRight: "1px solid #E6E8EB", display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <span style={{ width: 30, height: 30, flex: "0 0 auto", borderRadius: "50%", background: m.color, color: "#FFFFFF", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {m.initials}
              </span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</span>
                <span style={{ fontSize: 11.5, color: "#8A9099", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {m.role} · {m.hours}
                </span>
              </span>
            </div>
          ))}
          <span />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "56px repeat(4, 1fr) 56px", position: "relative" }}>
          <TimeRail slots={slots} side="left" />

          {showAppointments ? (
            <>
              <KarenColumn slots={slots} />
              <MariamColumn slots={slots} />
              <AnnaColumn slots={slots} />
              <DavitColumn slots={slots} />
            </>
          ) : (
            <>
              <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
                {slots.map((s, i) => (
                  <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fill }} />
                ))}
              </div>
              <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
                {slots.map((s, i) => (
                  <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fillLate }} />
                ))}
              </div>
              <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
                {slots.map((s, i) => (
                  <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fill }} />
                ))}
              </div>
              <div style={{ position: "relative", borderRight: "1px solid #E6E8EB" }}>
                {slots.map((s, i) => (
                  <div key={i} style={{ height: 34, borderBottom: `1px solid ${s.line}`, background: s.fillMorning }} />
                ))}
              </div>
            </>
          )}

          <TimeRail slots={slots} side="right" />

          <NowIndicator />
          {showEmpty && <EmptyDayOverlay />}
        </div>
      </div>
    </div>
  );
}
