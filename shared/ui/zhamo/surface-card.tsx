import type { CSSProperties, ReactNode } from "react";

export function ZhamoSurfaceCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E6E8EB",
        borderRadius: 8,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
