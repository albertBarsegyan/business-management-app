"use client";

const TITLE_FORMAT = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
  weekday: "long",
});

export function CalendarToolbar({
  date,
  onToday,
  onPrevDay,
  onNextDay,
}: {
  date: Date;
  onToday: () => void;
  onPrevDay: () => void;
  onNextDay: () => void;
}) {
  return (
    <div
      className="zhamo-toolbar-scroll"
      style={{
        height: 56,
        flex: "0 0 auto",
        background: "#FFFFFF",
        borderBottom: "1px solid #E6E8EB",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 16px",
      }}
    >
      <button
        onClick={onToday}
        className="zhamo-daycal-outline-btn"
        style={{
          height: 32,
          padding: "0 13px",
          border: "1px solid #D5D9DE",
          borderRadius: 6,
          background: "#FFFFFF",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Today
      </button>
      <div style={{ display: "flex", gap: 4 }}>
        <button
          onClick={onPrevDay}
          style={{
            width: 28,
            height: 28,
            border: "1px solid #E6E8EB",
            borderRadius: 6,
            background: "#FFFFFF",
            color: "#5B6069",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          ‹
        </button>
        <button
          onClick={onNextDay}
          style={{
            width: 28,
            height: 28,
            border: "1px solid #E6E8EB",
            borderRadius: 6,
            background: "#FFFFFF",
            color: "#5B6069",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          ›
        </button>
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-zhamo-display)",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          whiteSpace: "nowrap",
        }}
      >
        {TITLE_FORMAT.format(date)}
      </h1>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          style={{
            height: 32,
            padding: "0 12px",
            border: 0,
            borderRadius: 6,
            background: "#FFC935",
            color: "#17170F",
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          Sell <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
        </button>
        <span
          style={{
            height: 32,
            padding: "0 10px",
            border: "1px solid #E6E8EB",
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            fontSize: 12.5,
            color: "#5B6069",
            cursor: "pointer",
          }}
        >
          AMD ֏
        </span>
        <div
          style={{
            display: "inline-flex",
            padding: 2,
            background: "#EDEFF2",
            borderRadius: 7,
          }}
        >
          <span
            style={{
              height: 26,
              padding: "0 13px",
              borderRadius: 5,
              background: "#FFFFFF",
              fontSize: 12.5,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Day
          </span>
          <span
            style={{
              height: 26,
              padding: "0 13px",
              borderRadius: 5,
              fontSize: 12.5,
              color: "#5B6069",
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            Week
          </span>
        </div>
        <span
          title="Filter"
          style={{
            width: 32,
            height: 32,
            border: "1px solid #E6E8EB",
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#5B6069",
            cursor: "pointer",
          }}
        >
          ⌗
        </span>
        <span
          title="Zoom"
          style={{
            height: 32,
            padding: "0 8px",
            border: "1px solid #E6E8EB",
            borderRadius: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 12,
            color: "#5B6069",
          }}
        >
          −{" "}
          <span
            style={{
              width: 44,
              height: 3,
              borderRadius: 2,
              background: "#E6E8EB",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 26,
                borderRadius: 2,
                background: "#16161A",
              }}
            />
          </span>{" "}
          +
        </span>
      </div>
      <style>{`.zhamo-daycal-outline-btn:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
