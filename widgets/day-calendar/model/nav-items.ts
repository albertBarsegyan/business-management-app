export type NavItem = {
  label: string;
  href: string;
  mono: string;
  showCount: boolean;
  divider: boolean;
};

const navItems: [string, string, string, boolean, boolean?][] = [
  ["Reports", "/reports", "RP", false],
  ["Team", "/team", "TM", false],
  ["Clients", "/clients", "CL", false],
  ["Online booking", "/booking", "OB", false],
  ["Website builder", "/landing-builder", "WB", false],
  ["Services", "/services", "SV", false],
  ["Products", "/products", "PR", false],
  ["Finance", "/finance", "FN", false],
  ["Payroll", "/payroll", "PY", false],
  ["Notifications", "/notifications", "NT", true],
  ["Loyalty", "/loyalty", "LY", false],
  ["Resources", "/resources", "RS", false],
  ["Integrations", "/integrations", "IN", false],
  ["Settings", "/settings", "ST", false, true],
  ["Billing", "/billing", "BL", false],
];

export function buildNavItems(): NavItem[] {
  return navItems.map(([label, href, mono, showCount, divider]) => ({
    label,
    href,
    mono,
    showCount,
    divider: !!divider,
  }));
}
