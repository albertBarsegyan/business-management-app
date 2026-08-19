import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="zhamo-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: 30, lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 700 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: 0, maxWidth: 560, fontSize: 13, color: "#7C818B", lineHeight: 1.5 }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function PageHeaderButton({ children }: { children: ReactNode }) {
  return (
    <>
      <button
        className="zhamo-page-header-btn"
        style={{ height: 34, padding: "0 16px", border: 0, borderRadius: 6, background: "#FFC935", color: "#17170F", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        {children}
      </button>
      <style>{`.zhamo-page-header-btn:hover { background: #F0B81F; }`}</style>
    </>
  );
}
