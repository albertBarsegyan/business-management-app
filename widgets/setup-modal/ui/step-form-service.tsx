import type { Duration } from "../model/types";
import { radioTile } from "../model/types";

const durations: Duration[] = ["30 m", "1 h", "1 h 30 m"];

export function StepFormService({
  name,
  onChangeName,
  category,
  onChangeCategory,
  price,
  onChangePrice,
  currencyCode,
  duration,
  onPickDuration,
}: {
  name: string;
  onChangeName: (value: string) => void;
  category: string;
  onChangeCategory: (value: string) => void;
  price: string;
  onChangePrice: (value: string) => void;
  currencyCode: string;
  duration: Duration;
  onPickDuration: (d: Duration) => void;
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
          Service name
        </span>
        <input
          required
          placeholder="Example: Haircut"
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
          Category
        </span>
        <input
          placeholder="Example: Haircuts (optional)"
          value={category}
          onChange={(event) => onChangeCategory(event.target.value)}
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
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          maxWidth: 180,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
          Price
        </span>
        <span
          style={{
            display: "flex",
            height: 32,
            border: "1px solid #D5D9DE",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <input
            required
            type="number"
            min={0}
            step="0.01"
            placeholder="6000"
            value={price}
            onChange={(event) => onChangePrice(event.target.value)}
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              padding: "0 10px",
              fontFamily: "inherit",
              fontSize: 13,
              outline: "none",
            }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0 10px",
              borderLeft: "1px solid #E6E8EB",
              background: "#FAFBFC",
              fontSize: 13,
              color: "#5B6069",
            }}
          >
            {currencyCode}
          </span>
        </span>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#5B6069" }}>
          Duration
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {durations.map((label) => {
            const d = radioTile(label, duration === label);
            return (
              <span
                key={label}
                onClick={() => onPickDuration(label)}
                className="zhamo-setup-tile"
                style={{
                  height: 32,
                  padding: "0 15px",
                  borderRadius: 6,
                  fontSize: 13,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  cursor: "pointer",
                  border: `1px solid ${d.border}`,
                  background: d.bg,
                  color: d.color,
                  fontWeight: d.weight,
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: `1px solid ${d.dotBorder}`,
                    background: d.dotBg,
                  }}
                />
                {d.label}
              </span>
            );
          })}
        </div>
      </div>
      <style>{`.zhamo-setup-tile:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
