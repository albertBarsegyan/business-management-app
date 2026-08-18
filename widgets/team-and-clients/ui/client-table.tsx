import { clientFilters, clientRows, pages, segments } from "../model/clients";

export function ClientTable({ onOpenPanel }: { onOpenPanel: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 34, lineHeight: 1.05, letterSpacing: "-0.022em", fontWeight: 700 }}>
          Client base
        </h1>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ display: "flex", height: 32, border: "1px solid #D5D9DE", borderRadius: 6, overflow: "hidden", background: "#FFFFFF" }}>
            <span className="zhamo-teamclients-export-btn" style={{ padding: "0 12px", display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Export to Excel</span>
            <span style={{ padding: "0 9px", borderLeft: "1px solid #E6E8EB", display: "inline-flex", alignItems: "center", fontSize: 8, color: "#8A9099", cursor: "pointer" }}>▾</span>
          </span>
          <button onClick={onOpenPanel} className="zhamo-teamclients-primary-btn" style={{ height: 32, padding: "0 14px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Add client
          </button>
        </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px 12px", display: "flex", flexDirection: "column", gap: 12, borderBottom: "1px solid #EEF0F2" }}>
          <input readOnly placeholder="Search by name, phone, email or card number" style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {segments.map((s) => (
              <span key={s.label} className="zhamo-teamclients-filter-chip" style={{ height: 28, padding: "0 11px", borderRadius: 6, border: `1px solid ${s.border}`, background: s.bg, color: s.color, fontSize: 12.5, fontWeight: s.weight, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                {s.label}<span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11, opacity: 0.7 }}>{s.count}</span>
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: "11px 16px", display: "flex", gap: 8, alignItems: "center", background: "#FAFBFC", borderBottom: "1px solid #EEF0F2" }}>
          {clientFilters.map((f) => (
            <span key={f} className="zhamo-teamclients-filter-chip" style={{ height: 30, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontSize: 12.5, color: "#5B6069", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              {f}<span style={{ fontSize: 8, color: "#A9AEB6" }}>▾</span>
            </span>
          ))}
          <span title="Clear filters" style={{ width: 30, height: 30, border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#8A9099", cursor: "pointer" }}>⌫</span>
          <button style={{ height: 30, padding: "0 14px", border: "1px solid #16161A", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Show</button>
          <span title="Configure columns" style={{ marginLeft: "auto", width: 30, height: 30, border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#5B6069", cursor: "pointer" }}>⚙</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "34px 1.7fr 1.1fr 1.3fr 0.9fr 0.9fr 0.6fr 0.7fr 0.9fr 0.9fr", height: 34, alignItems: "center", padding: "0 16px", gap: 8, background: "#FAFBFC", borderBottom: "1px solid #E6E8EB", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A9099" }}>
          <span style={{ width: 16, height: 16, borderRadius: 4, border: "1px solid #C9CDD3", background: "#FFFFFF", cursor: "pointer" }} />
          <span>Name</span><span>Phone</span><span>Email</span><span>Sold 🔒</span><span>Balance 🔒</span><span>Visits</span><span>Disc.</span><span>Last visit</span><span>First visit</span>
        </div>

        {clientRows.map((c) => (
          <div key={c.name} className="zhamo-teamclients-row" style={{ display: "grid", gridTemplateColumns: "34px 1.7fr 1.1fr 1.3fr 0.9fr 0.9fr 0.6fr 0.7fr 0.9fr 0.9fr", height: 40, alignItems: "center", padding: "0 16px", gap: 8, borderBottom: "1px solid #EEF0F2", fontSize: 12.5, background: c.bg, cursor: "pointer" }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${c.checkBorder}`, background: c.checkBg, color: "#17170F", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {c.check}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ width: 24, height: 24, flex: "0 0 auto", borderRadius: "50%", background: c.avatar, color: "#FFFFFF", fontSize: 9.5, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {c.initials}
              </span>
              <span style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
              {c.vip ? (
                <span style={{ height: 18, padding: "0 6px", borderRadius: 5, background: "#FEF6E0", color: "#8A6A05", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", flex: "0 0 auto" }}>
                  VIP
                </span>
              ) : null}
            </span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#5B6069" }}>{c.phone}</span>
            <span style={{ color: "#5B6069", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.email}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5 }}>{c.sold}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: c.balanceColor }}>{c.balance}</span>
            <span>{c.visits}</span>
            <span style={{ color: "#5B6069" }}>{c.discount}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#5B6069" }}>{c.last}</span>
            <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 11.5, color: "#8A9099" }}>{c.first}</span>
          </div>
        ))}

        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, background: "#FAFBFC" }}>
          <span style={{ height: 30, padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
            25 per page<span style={{ fontSize: 8, color: "#A9AEB6" }}>▾</span>
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {pages.map((p, i) => (
              <span key={`${p.label}-${i}`} style={{ minWidth: 28, height: 28, padding: "0 8px", borderRadius: 6, border: `1px solid ${p.border}`, background: p.bg, color: p.color, fontSize: 12.5, fontWeight: p.weight, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                {p.label}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 12.5, color: "#8A9099" }}>1 246 clients</span>
          <button style={{ marginLeft: "auto", height: 30, padding: "0 12px", border: "1px solid #D5D9DE", borderRadius: 6, background: "#FFFFFF", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
            Bulk actions · 2 selected
          </button>
        </div>
      </div>
      <style>{`
        .zhamo-teamclients-export-btn:hover { background: #FAFBFC; }
        .zhamo-teamclients-primary-btn:hover { background: #F0B81F; }
        .zhamo-teamclients-filter-chip:hover { border-color: #16161A; }
        .zhamo-teamclients-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
