import type { ChipOption } from "../../model/use-landing-builder";

export function ChipRow({
  options,
  wide = false,
}: {
  options: ChipOption[];
  wide?: boolean;
}) {
  return (
    <div
      style={{ display: "flex", gap: 5, flexWrap: wide ? "wrap" : undefined }}
    >
      {options.map((o) => (
        <span
          key={o.label}
          onClick={o.onPick}
          style={{
            height: 30,
            flex: wide ? undefined : 1,
            padding: wide ? "0 11px" : undefined,
            borderRadius: 6,
            border: `1px solid ${o.active ? "#16161A" : "#D5D9DE"}`,
            background: o.active ? "#16161A" : "#FFFFFF",
            color: o.active ? "#FFFFFF" : "#16161A",
            fontSize: 12,
            fontWeight: o.active ? 600 : 400,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: wide ? undefined : "center",
            cursor: "pointer",
          }}
        >
          {o.label}
        </span>
      ))}
    </div>
  );
}
