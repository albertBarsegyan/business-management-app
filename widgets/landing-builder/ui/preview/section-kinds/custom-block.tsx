export function CustomBlock({
  body,
  ink,
  inkMuted,
  coverBg,
}: {
  body: string;
  ink: string;
  inkMuted: string;
  coverBg: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 18,
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 13.5,
          lineHeight: 1.65,
          color: body ? ink : inkMuted,
        }}
      >
        {body || "No description added yet"}
      </span>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            minHeight: 120,
            width: "100%",
            borderRadius: 10,
            background: coverBg,
          }}
        />
        <span
          style={{
            height: 40,
            padding: "0 17px",
            borderRadius: 8,
            background: "#FFC935",
            color: "#17170F",
            fontSize: 13.5,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Learn more
        </span>
      </span>
    </div>
  );
}
