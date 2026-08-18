export function ZhamoLogoMark({ size = 22 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: "#FFC935",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-zhamo-display)",
        fontSize: Math.round(size * 0.6),
        fontWeight: 700,
        color: "#17170F",
        letterSpacing: 0,
        flexShrink: 0,
      }}
    >
      Z
    </span>
  );
}
