/**
 * Honest empty state for D3 screens (billing, payroll, reports, finance) —
 * widgets with no backend module today. Per D3, these must never show fake
 * numbers; this replaces the hardcoded data that previously filled them.
 */
export function NotAvailableNotice({ children }: { children: string }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E6E8EB",
        borderRadius: 8,
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: 12.5, color: "#8A9099" }}>{children}</p>
    </div>
  );
}
