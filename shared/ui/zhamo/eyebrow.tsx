import type { CSSProperties, ReactNode } from "react";

export function ZhamoEyebrow({
  children,
  color = "#7C818B",
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 6,
        gap: 12,
        fontFamily: "var(--font-zhamo-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
