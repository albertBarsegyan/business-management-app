export function PreviewFinalCta({
  gutter,
  dark,
}: {
  gutter: string;
  dark: boolean;
}) {
  return (
    <div
      style={{
        padding: `22px ${gutter}`,
        background: dark ? "#1C1C23" : "#16161A",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-zhamo-display)",
          fontSize: 26,
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        Ready when you are.
      </span>
      <span
        style={{
          marginLeft: "auto",
          height: 44,
          padding: "0 20px",
          borderRadius: 8,
          background: "#FFC935",
          color: "#17170F",
          fontSize: 14.5,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        Book now
      </span>
    </div>
  );
}
