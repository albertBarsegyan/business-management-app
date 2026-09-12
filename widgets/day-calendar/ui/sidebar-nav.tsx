"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// Imported from its own module, not the `@/entities/session` barrel — that
// barrel also re-exports `get-current-user.ts`, which is `server-only` and
// would fail to bundle into this client component.
import { logoutAction } from "@/entities/session/model/actions";
import { useSessionUser } from "@/entities/session/ui/session-provider";
import { useInAppNotificationsQuery } from "@/shared/api/notifications/queries";
import { avatarUrl } from "@/shared/lib/avatar-url";
import { getInitials } from "@/shared/lib/get-initials";
import type { NavItem } from "../model/nav-items";

export function SidebarNav({
  expanded,
  accent,
  adminLabel,
  navItems,
  onToggle,
}: {
  expanded: boolean;
  accent: string;
  adminLabel: string;
  navItems: NavItem[];
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSessionUser();
  const initials = getInitials(user.displayName);
  const isProfileRoute = pathname === "/profile";
  const notificationsQuery = useInAppNotificationsQuery();
  const unreadCount = (notificationsQuery.data ?? []).filter(
    (n) => !n.readAt,
  ).length;

  return (
    <>
      <button
        type="button"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMobileOpen((v) => !v)}
        className="zhamo-sidebar-toggle"
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 41,
          width: 34,
          height: 34,
          border: 0,
          borderRadius: 7,
          background: "#14141A",
          color: "#FFFFFF",
          fontSize: 15,
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {mobileOpen && (
        <div
          className="zhamo-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`zhamo-sidebar${mobileOpen ? " zhamo-sidebar-open" : ""}`}
        style={{
          width: expanded ? 232 : 64,
          flex: "0 0 auto",
          background: "#14141A",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.15s ease",
        }}
      >
        <div
          style={{
            height: 56,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 14px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              flex: "0 0 auto",
              borderRadius: 7,
              background: "#FFC935",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 15,
              fontWeight: 700,
              color: "#17170F",
            }}
          >
            Z
          </span>
          {expanded && (
            <span
              style={{
                fontFamily: "var(--font-zhamo-display)",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Zhamo
            </span>
          )}
          <button
            onClick={onToggle}
            title="Collapse sidebar"
            style={{
              marginLeft: "auto",
              width: 24,
              height: 24,
              flex: "0 0 auto",
              border: 0,
              borderRadius: 5,
              background: "rgba(255,255,255,0.07)",
              color: "#A7ADB8",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
            }}
          >
            {expanded ? "«" : "»"}
          </button>
        </div>

        <nav
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  height: 34,
                  padding: "0 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                  position: "relative",
                  background: active ? "rgba(255,255,255,0.1)" : "transparent",
                  color: active ? "#FFFFFF" : "#A7ADB8",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  borderTop: item.divider
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "0",
                  textDecoration: "none",
                  justifyContent: expanded ? "left" : "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: -8,
                    top: 7,
                    bottom: 7,
                    width: 3,
                    borderRadius: "0 2px 2px 0",
                    background: active ? accent : "transparent",
                  }}
                />
                <span
                  style={{
                    width: 20,
                    height: 20,
                    flex: "0 0 auto",
                    borderRadius: 5,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: active ? accent : "rgba(255,255,255,0.07)",
                    color: active ? "#FFFFFF" : "#7C818B",
                  }}
                >
                  <item.icon size={13} strokeWidth={2} />
                </span>
                {expanded && (
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                    {item.label}
                  </span>
                )}
                {item.showCount && unreadCount > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      height: 18,
                      minWidth: 18,
                      padding: "0 5px",
                      borderRadius: 9,
                      background: "#FFC935",
                      color: "#17170F",
                      fontSize: 10.5,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            flex: "0 0 auto",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "12px 10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: "#1A1A21",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Link
              href="/profile"
              aria-label={`View profile: ${user.displayName}`}
              aria-current={isProfileRoute ? "page" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                overflow: "hidden",
                minWidth: 0,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {user.avatarAssetId ? (
                <Image
                  src={avatarUrl(user.avatarAssetId)}
                  alt={user.displayName}
                  width={28}
                  height={28}
                  style={{
                    width: 28,
                    height: 28,
                    flex: "0 0 auto",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 28,
                    height: 28,
                    flex: "0 0 auto",
                    borderRadius: "50%",
                    background: "oklch(0.64 0.16 350)",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {initials}
                </span>
              )}
              {expanded && (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "#FFFFFF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user.displayName}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#7C818B",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.primaryEmail ?? "No email on file"}
                  </span>
                </span>
              )}
            </Link>
            {expanded && (
              <button
                type="button"
                title="Log out"
                onClick={() => {
                  void logoutAction();
                }}
                style={{
                  marginLeft: "auto",
                  width: 24,
                  height: 24,
                  flex: "0 0 auto",
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.06)",
                  color: "#A7ADB8",
                  fontSize: 11,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                ⏻
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
