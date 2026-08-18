import { navRows } from "../model/static-content";

export function buildNavItems(accent: string) {
  return navRows.map((n) => {
    const depth = n.depth ?? 0;
    const expanded = !!n.expanded;
    const active = !!n.active;
    return {
      label: n.label,
      mono: n.mono,
      indent: depth ? "38px" : "8px",
      size: depth ? "12.5px" : "13px",
      showTile: !depth,
      bg: active ? "rgba(255,255,255,0.1)" : expanded ? "rgba(255,255,255,0.05)" : "transparent",
      color: active || expanded ? "#FFFFFF" : "#A7ADB8",
      weight: active ? "600" : "400",
      marker: active ? accent : "transparent",
      tileBg: expanded ? accent : "rgba(255,255,255,0.07)",
      tileColor: expanded ? "#FFFFFF" : "#7C818B",
    };
  });
}
