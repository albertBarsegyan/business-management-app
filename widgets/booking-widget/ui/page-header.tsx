import Link from "next/link";

export function PageHeader() {
  return (
    <div style={{ width: "100%", maxWidth: 1180, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", rowGap: 6, alignItems: "center", gap: 12, fontFamily: "var(--font-zhamo-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A9099" }}>
        <span>Zhamo — public booking</span>
        <span style={{ color: "#C9CDD3" }}>/</span>
        <Link href="/customer">Open customer page</Link>
        <span style={{ color: "#C9CDD3" }}>/</span>
        <Link href="/screens">All screens</Link>
      </div>
      <h1 style={{ margin: 0, fontFamily: "var(--font-zhamo-display)", fontSize: "clamp(28px, 7vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 700, maxWidth: "20ch" }}>
        Sixty seconds, no account.
      </h1>
      <p style={{ margin: 0, maxWidth: "64ch", fontSize: 15, lineHeight: 1.6, color: "#5B6069" }}>
        The client surface inherits Zhamo&apos;s type and yellow but drops all density: 48px targets, one decision per
        screen, name and phone only at the very end. The step indicator is a five-segment hairline under the business
        header — it never scrolls away.
      </p>
    </div>
  );
}
