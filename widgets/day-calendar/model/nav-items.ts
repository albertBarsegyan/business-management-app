import {
  Banknote,
  BarChart3,
  Bell,
  CalendarCheck,
  Contact,
  Globe,
  type LucideIcon,
  Receipt,
  ScrollText,
  Settings as SettingsIcon,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  mono: string;
  icon: LucideIcon;
  showCount: boolean;
  divider: boolean;
};

const navItems: [string, string, string, LucideIcon, boolean, boolean?][] = [
  ["Reports", "/reports", "RP", BarChart3, false],
  ["Team", "/team", "TM", Users, false],
  ["Clients", "/clients", "CL", Contact, false],
  ["Online booking", "/booking", "OB", CalendarCheck, false],
  ["Website builder", "/landing-builder", "WB", Globe, false],
  ["Services", "/services", "SV", Sparkles, false],
  ["Finance", "/finance", "FN", Wallet, false],
  ["Payroll", "/payroll", "PY", Banknote, false],
  ["Notifications", "/notifications", "NT", Bell, true],
  ["Settings", "/settings", "ST", SettingsIcon, false, true],
  ["Billing", "/billing", "BL", Receipt, false],
  ["Audit log", "/audit-logs", "AL", ScrollText, false],
];

export function buildNavItems(): NavItem[] {
  return navItems.map(([label, href, mono, icon, showCount, divider]) => ({
    label,
    href,
    mono,
    icon,
    showCount,
    divider: !!divider,
  }));
}
