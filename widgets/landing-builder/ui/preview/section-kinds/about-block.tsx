export function AboutBlock({
  body,
  cols,
  order,
  photoOrder,
  ink,
  inkMuted,
  coverBg,
}: {
  body: string;
  cols: string;
  order: string;
  photoOrder: string;
  ink: string;
  inkMuted: string;
  coverBg: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: 18,
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: body ? ink : inkMuted,
          order,
        }}
      >
        {body || "No description added yet"}
      </span>
      <span
        style={{
          minHeight: 150,
          borderRadius: 10,
          background: coverBg,
          order: photoOrder,
        }}
      />
    </div>
  );
}
