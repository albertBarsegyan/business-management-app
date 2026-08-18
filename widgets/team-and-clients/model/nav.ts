export type ScreenKey = "team" | "clients" | "empty";

export type NavItem = {
  label: string;
  mono: string;
  indent: string;
  size: string;
  showTile: boolean;
  caret: boolean;
  bg: string;
  color: string;
  weight: string;
  marker: string;
  tileBg: string;
  tileColor: string;
};

const navSpec: [string, string, number, boolean?, boolean?, boolean?][] = [
  ["Reports", "RP", 0],
  ["Team", "TM", 0, true, true],
  ["Team members list", "", 1, false, false, true],
  ["Work schedule", "", 1],
  ["Positions", "", 1],
  ["Clients", "CL", 0, false, false, false],
  ["Online booking", "OB", 0],
  ["Services", "SV", 0],
  ["Finance", "FN", 0],
  ["Loyalty", "LY", 0],
];

export const teamAndClientsAccent = "oklch(0.64 0.16 350)";

export function buildNav(screen: ScreenKey): NavItem[] {
  const accent = teamAndClientsAccent;
  return navSpec.map(([label, mono, depth, caret, expanded, activeSpec]) => {
    const active = label === "Clients" ? screen !== "team" : !!activeSpec;
    return {
      label,
      mono,
      indent: depth ? "38px" : "8px",
      size: depth ? "12.5px" : "13px",
      showTile: !depth,
      caret: !!caret,
      bg: active ? "rgba(255,255,255,0.1)" : expanded ? "rgba(255,255,255,0.05)" : "transparent",
      color: active || expanded ? "#FFFFFF" : "#A7ADB8",
      weight: active ? "600" : "400",
      marker: active ? accent : "transparent",
      tileBg: expanded || active ? accent : "rgba(255,255,255,0.07)",
      tileColor: expanded || active ? "#FFFFFF" : "#7C818B",
    };
  });
}
