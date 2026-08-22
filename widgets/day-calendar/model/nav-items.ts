import {
  BarChart3,
  Users,
  Contact,
  CalendarCheck,
  Globe,
  Sparkles,
  Package,
  Wallet,
  Banknote,
  Bell,
  Heart,
  Folder,
  Settings as SettingsIcon,
  Receipt,
  type LucideIcon,
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
  ["Products", "/products", "PR", Package, false],
  ["Finance", "/finance", "FN", Wallet, false],
  ["Payroll", "/payroll", "PY", Banknote, false],
  ["Notifications", "/notifications", "NT", Bell, true],
  ["Loyalty", "/loyalty", "LY", Heart, false],
  ["Resources", "/resources", "RS", Folder, false],
  ["Settings", "/settings", "ST", SettingsIcon, false, true],
  ["Billing", "/billing", "BL", Receipt, false],
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
