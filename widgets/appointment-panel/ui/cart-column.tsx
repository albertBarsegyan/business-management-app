"use client";

import { useState } from "react";
import { services, statusStyle, visitStatuses } from "../model/appointment-panel-data";
import type { VisitStatus } from "../model/types";

export function CartColumn({
  status,
  onSelectStatus,
}: {
  status: VisitStatus;
  onSelectStatus: (status: VisitStatus) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A9AEB6" }}>
          Visit status
        </span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {visitStatuses.map((label) => {
            const s = statusStyle[label];
            const on = status === label;
            return (
              <span
                key={label}
                onClick={() => onSelectStatus(label)}
                className="zhamo-apptpanel-status"
                style={{
                  height: 46,
                  borderRadius: 7,
                  border: `1.5px solid ${on ? s.dot : "#E6E8EB"}`,
                  background: on ? s.bg : "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  cursor: "pointer",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: s.dotRadius, background: s.dot }} />
                <span style={{ fontSize: 12, fontWeight: on ? 600 : 400, color: on ? s.color : "#5B6069" }}>{label}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#FFFFFF", border: "1px solid #E6E8EB", borderRadius: 8, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid #E6E8EB" }}>
          <span style={{ height: 42, display: "inline-flex", alignItems: "center", fontSize: 13, fontWeight: 600, boxShadow: "inset 0 -2px 0 #FFC935", cursor: "pointer" }}>
            Services
          </span>
          <span style={{ height: 42, display: "inline-flex", alignItems: "center", fontSize: 13, color: "#8A9099", cursor: "pointer" }}>
            Products
          </span>
          <span style={{ marginLeft: "auto", height: 42, display: "inline-flex", alignItems: "center", fontSize: 12, color: "#8A9099" }}>
            1 selected
          </span>
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            placeholder="Search services, or type a price"
            style={{ height: 32, padding: "0 10px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "inherit", fontSize: 13 }}
          />
          <span style={{ fontSize: 11.5, color: "#A9AEB6" }}>
            Only services Karen can perform are shown. Prices follow the Kentron price list.
          </span>
        </div>
        <div style={{ borderTop: "1px solid #EEF0F2" }}>
          {services.map((s) => {
            const expanded = expandedId === s.id;
            return (
              <div key={s.id} style={{ borderBottom: "1px solid #EEF0F2", background: s.selected ? "#FFFDF6" : "#FFFFFF" }}>
                <div
                  onClick={() => setExpandedId(expanded ? null : s.id)}
                  className="zhamo-apptpanel-service-row"
                  style={{ height: 44, padding: "0 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
                >
                  <span style={{ width: 14, textAlign: "center", fontSize: 10, color: "#A9AEB6" }}>{expanded ? "▾" : "▸"}</span>
                  <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                    <span style={{ fontSize: 13, fontWeight: s.selected ? 600 : 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: 11.5, color: "#8A9099" }}>{s.meta}</span>
                  </span>
                  <span style={{ fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5, color: "#16161A" }}>{s.price}</span>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: s.selected ? "#FFC935" : "#F3F4F6",
                      color: s.selected ? "#17170F" : "#5B6069",
                      fontSize: 12,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.selected ? "✓" : "+"}
                  </span>
                </div>
                {expanded && s.detail && (
                  <div style={{ padding: "0 16px 12px 40px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontSize: 11.5, color: "#5B6069" }}>Price</span>
                        <input readOnly defaultValue={s.detail.price} style={{ height: 30, padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5 }} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontSize: 11.5, color: "#5B6069" }}>Discount %</span>
                        <input readOnly defaultValue={s.detail.discountPercent} style={{ height: 30, padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, fontFamily: "var(--font-zhamo-mono)", fontSize: 12.5 }} />
                      </label>
                      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        <span style={{ fontSize: 11.5, color: "#5B6069" }}>Duration</span>
                        <input readOnly defaultValue={s.detail.duration} style={{ height: 30, padding: "0 9px", border: "1px solid #D5D9DE", borderRadius: 6, fontSize: 12.5 }} />
                      </label>
                    </div>
                    <span style={{ fontSize: 11.5, color: "#8A9099" }}>{s.detail.masterShare}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FAFBFC" }}>
          <span style={{ fontSize: 12.5, color: "#5B6069" }}>1 service · 45 min</span>
          <span style={{ fontFamily: "var(--font-zhamo-display)", fontSize: 20, fontWeight: 700, letterSpacing: "-0.018em" }}>7 500 ֏</span>
        </div>
      </div>
      <style>{`
        .zhamo-apptpanel-status:hover { border-color: #16161A; }
        .zhamo-apptpanel-service-row:hover { background: #FAFBFC; }
      `}</style>
    </div>
  );
}
