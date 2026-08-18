export function ZhamoSectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-zhamo-mono)",
        fontSize: 11,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#8A9099",
      }}
    >
      {children}
    </span>
  );
}
