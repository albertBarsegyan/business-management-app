export function StepFormTeam({
  name,
  onChangeName,
  specialization,
  onChangeSpecialization,
  serviceName,
}: {
  name: string;
  onChangeName: (value: string) => void;
  specialization: string;
  onChangeSpecialization: (value: string) => void;
  serviceName: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 420,
      }}
    >
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
          Team member name
        </span>
        <input
          required
          placeholder="Example: Karen Sahakyan"
          value={name}
          onChange={(event) => onChangeName(event.target.value)}
          style={{
            height: 32,
            padding: "0 10px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            fontFamily: "inherit",
            fontSize: 13,
          }}
        />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
          Specialization
        </span>
        <input
          required
          placeholder="Example: Barber"
          value={specialization}
          onChange={(event) => onChangeSpecialization(event.target.value)}
          style={{
            height: 32,
            padding: "0 10px",
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            fontFamily: "inherit",
            fontSize: 13,
          }}
        />
      </label>
      <div
        style={{
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#FAFBFC",
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            background: "#FFC935",
            color: "#17170F",
            fontSize: 11,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </span>
        <span style={{ fontSize: 12.5, color: "#5B6069" }}>
          Performs{" "}
          <span style={{ color: "#16161A", fontWeight: 600 }}>
            {serviceName}
          </span>{" "}
          — the service you just created.
        </span>
      </div>
    </div>
  );
}
