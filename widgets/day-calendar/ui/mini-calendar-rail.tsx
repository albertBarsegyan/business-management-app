"use client";

import type { MonthDay } from "../model/month-days";
import { favorites, quickActions, weekdayLabels } from "../model/team";

export function MiniCalendarRail({
  monthDays,
  favoritesOpen,
  onToggleFavorites,
}: {
  monthDays: MonthDay[];
  favoritesOpen: boolean;
  onToggleFavorites: () => void;
}) {
  return (
    <div className="zhamo-daycal-rail" style={{ width: 232, flex: "0 0 auto", background: "#FFFFFF", borderRight: "1px solid #E6E8EB", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <div style={{ padding: 14, borderBottom: "1px solid #E6E8EB", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>August 2026</span>
          <span style={{ display: "flex", gap: 4 }}>
            <span style={{ width: 20, height: 20, border: "1px solid #E6E8EB", borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5B6069", cursor: "pointer" }}>‹</span>
            <span style={{ width: 20, height: 20, border: "1px solid #E6E8EB", borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5B6069", cursor: "pointer" }}>›</span>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {weekdayLabels.map((d, i) => (
            <span key={`${d}-${i}`} style={{ height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-zhamo-mono)", fontSize: 9.5, letterSpacing: "0.06em", color: "#A9AEB6" }}>
              {d}
            </span>
          ))}
          {monthDays.map((d, i) => (
            <span
              key={i}
              style={{
                height: 28,
                borderRadius: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                cursor: "pointer",
                background: d.bg,
                color: d.color,
                fontSize: 11.5,
                fontWeight: d.weight,
              }}
            >
              {d.n}
              <span style={{ height: 3, width: d.load, borderRadius: 2, background: d.loadColor }} />
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: 14, borderBottom: "1px solid #E6E8EB", display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Quick actions
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {quickActions.map((q) => (
            <div
              key={q.label}
              className="zhamo-daycal-quick-action"
              style={{ border: "1px solid #E6E8EB", borderRadius: 8, padding: 9, display: "flex", flexDirection: "column", gap: 8, cursor: "pointer", gridColumn: q.span, background: "#FFFFFF" }}
            >
              <span style={{ width: 22, height: 22, borderRadius: 6, background: "#FEF6E0", color: "#8A6A05", fontFamily: "var(--font-zhamo-mono)", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                {q.mono}
              </span>
              <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <div onClick={onToggleFavorites} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
          <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
            Favorites
          </span>
          <span style={{ fontSize: 10, color: "#A9AEB6" }}>{favoritesOpen ? "▾" : "▸"}</span>
        </div>
        {favoritesOpen && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {favorites.map((f) => (
              <span key={f} className="zhamo-daycal-favorite" style={{ display: "flex", alignItems: "center", gap: 8, height: 30, padding: "0 8px", borderRadius: 6, fontSize: 12.5, color: "#16161A", cursor: "pointer" }}>
                <span style={{ color: "#FFC935", fontSize: 11 }}>★</span>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .zhamo-daycal-quick-action:hover { border-color: #16161A; background: #FAFBFC; }
        .zhamo-daycal-favorite:hover { background: #F5F6F8; }
      `}</style>
    </div>
  );
}
