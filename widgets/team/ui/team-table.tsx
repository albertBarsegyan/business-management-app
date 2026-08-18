import { teamFilters, teamRows } from "../model/team";

export function TeamTable({ groupOpen, onToggleGroup }: { groupOpen: boolean; onToggleGroup: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.022em", fontWeight: 700 }}>
            Team members
          </h1>
          <span title="About this page" style={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #D5D9DE", color: "#8A9099", fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            i
          </span>
          <span title="Add to favorites" style={{ color: "#FFC935", fontSize: 16, cursor: "pointer" }}>★</span>
        </div>
        <button className="zhamo-teamclients-outline-btn" style={{ height: 32, padding: "0 14px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Subscription management
        </button>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", display: "flex", gap: 10, alignItems: "center", borderBottom: "1px solid #EEF0F2" }}>
          <input readOnly placeholder="Search by name, phone or email" style={{ height: 32, flex: 1, maxWidth: 380, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
          <button className="zhamo-teamclients-primary-btn" style={{ height: 32, padding: "0 16px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Add
          </button>
        </div>

        <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", background: "#FAFBFC", borderBottom: "1px solid #EEF0F2" }}>
          {teamFilters.map((f) => (
            <span key={f} className="zhamo-teamclients-filter-chip" style={{ height: 30, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontSize: 12.5, color: "#5B6069", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              {f}<span style={{ fontSize: 8, color: "#A9AEB6" }}>▾</span>
            </span>
          ))}
          <button style={{ height: 30, padding: "0 12px", border: "1px solid #16161A", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Find</button>
          <button style={{ height: 30, padding: "0 10px", border: 0, borderRadius: 6, background: "transparent", color: "#2C6CF6", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Reset</button>
          <span style={{ marginLeft: "auto", fontSize: 12.5, color: "#8A9099" }}>Found: <span style={{ color: "#16161A", fontWeight: 600 }}>6</span></span>
        </div>

        <div style={{ display: "flex", gap: 20, padding: "0 16px", borderBottom: "1px solid #E6E8EB" }}>
          <span style={{ height: 40, display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 600, boxShadow: "inset 0 -2px 0 #FFC935", cursor: "pointer" }}>Position</span>
          <span style={{ height: 40, display: "inline-flex", alignItems: "center", fontSize: 13, color: "#8A9099", cursor: "pointer" }}>Specialization</span>
          <span style={{ height: 40, display: "inline-flex", alignItems: "center", fontSize: 13, color: "#8A9099", cursor: "pointer" }}>System users</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1.1fr 0.8fr 0.7fr 0.9fr 1fr 40px", height: 34, alignItems: "center", padding: "0 16px", gap: 8, background: "#FAFBFC", borderBottom: "1px solid #E6E8EB", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A9099" }}>
          <span>Team member</span><span>Schedule</span><span>Online booking</span><span>Services</span><span>Role</span><span>Subscription</span><span></span>
        </div>

        <div onClick={onToggleGroup} style={{ height: 36, padding: "0 16px", display: "flex", alignItems: "center", gap: 8, background: "#F7F8FA", borderBottom: "1px solid #EEF0F2", cursor: "pointer" }}>
          <span style={{ fontSize: 10, color: "#8A9099" }}>{groupOpen ? "▾" : "▸"}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>Without position</span>
          <span style={{ fontSize: 12.5, color: "#8A9099" }}>— 2 team members</span>
        </div>

        {groupOpen ? (
          <div>
            {teamRows.map((r) => (
              <div
                key={r.name}
                className="zhamo-teamclients-row"
                style={{ display: "grid", gridTemplateColumns: "2.2fr 1.1fr 0.8fr 0.7fr 0.9fr 1fr 40px", minHeight: 48, alignItems: "center", padding: "4px 16px", gap: 8, borderBottom: "1px solid #EEF0F2", background: r.bg }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <span style={{ width: 32, height: 32, flex: "0 0 auto", borderRadius: "50%", background: r.avatar, color: "#FFFFFF", fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    {r.initials}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {r.name} <span style={{ color: "#8A9099", fontWeight: 400 }}>{r.position}</span>
                    </span>
                    <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, color: "#8A9099", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {r.phone} · {r.email}
                    </span>
                  </span>
                </span>
                <span>
                  <span style={{ height: 22, padding: "0 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", background: r.schedBg, color: r.schedColor, cursor: "pointer" }}>
                    {r.schedule}
                  </span>
                </span>
                <span>
                  <span style={{ width: 34, height: 20, borderRadius: 10, background: r.toggleBg, position: "relative", display: "inline-block", cursor: "pointer" }}>
                    <span style={{ position: "absolute", top: 2, left: r.knob, width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} />
                  </span>
                </span>
                <span style={{ fontSize: 13, color: "#5B6069" }}>{r.services}</span>
                <span style={{ fontSize: 12.5, color: "#16161A" }}>{r.role}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: r.subColor }}>
                  {r.subscription}<span title="Edit" style={{ color: "#8A9099", fontSize: 11, cursor: "pointer" }}>✎</span>
                </span>
                <span title="More" className="zhamo-teamclients-more-btn" style={{ justifySelf: "end", width: 26, height: 26, borderRadius: 6, color: "#8A9099", fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  ⋯
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <style>{`
        .zhamo-teamclients-outline-btn:hover { border-color: #16161A; }
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
        .zhamo-teamclients-filter-chip:hover { border-color: #16161A; }
        .zhamo-teamclients-row:hover { background: #FAFBFC; }
        .zhamo-teamclients-more-btn:hover { background: #F1F2F4; }
      `}</style>
    </div>
  );
}
