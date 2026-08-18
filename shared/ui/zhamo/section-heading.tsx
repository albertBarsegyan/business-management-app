export function ZhamoSectionHeading({
  title,
  tag,
}: {
  title: string;
  tag: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        borderBottom: "1px solid #E6E8EB",
        paddingBottom: 14,
        gap: 16,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-zhamo-display)",
          fontSize: 34,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          fontWeight: 700,
        }}
      >
        {title}
      </h2>
      <span
        style={{
          fontFamily: "var(--font-zhamo-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8A9099",
          whiteSpace: "nowrap",
        }}
      >
        {tag}
      </span>
    </div>
  );
}
