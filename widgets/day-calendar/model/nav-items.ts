export type NavItem = {
  label: string;
  mono: string;
  showCount: boolean;
  count: string;
  bg: string;
  color: string;
  weight: "400" | "600";
  marker: string;
  tileBg: string;
  tileColor: string;
  divider: string;
};

const navItems: [string, string, boolean, boolean?][] = [
  ["Reports", "RP", false],
  ["Team", "TM", false],
  ["Clients", "CL", false],
  ["Online booking", "OB", false],
  ["Services", "SV", false],
  ["Products", "PR", false],
  ["Finance", "FN", false],
  ["Payroll", "PY", false],
  ["Notifications", "NT", true],
  ["Loyalty", "LY", false],
  ["Resources", "RS", false],
  ["Integrations", "IN", false],
  ["Settings", "ST", false, true],
  ["Billing", "BL", false],
];

export function buildNavItems(accent: string): NavItem[] {
  return navItems.map(([label, mono, badge, divider]) => {
    const active = label === "Reports";
    return {
      label,
      mono,
      showCount: !!badge,
      count: "3",
      bg: active ? "rgba(255,255,255,0.1)" : "transparent",
      color: active ? "#FFFFFF" : "#A7ADB8",
      weight: active ? "600" : "400",
      marker: active ? accent : "transparent",
      tileBg: active ? accent : "rgba(255,255,255,0.07)",
      tileColor: active ? "#FFFFFF" : "#7C818B",
      divider: divider ? "1px solid rgba(255,255,255,0.08)" : "0",
    };
  });
}
