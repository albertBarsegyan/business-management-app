export function ChoiceShowcase() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E6E8EB",
        borderRadius: 8,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-zhamo-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#8A9099",
        }}
      >
        Chips, toggles, choice
      </span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span
          style={{
            height: 30,
            padding: "0 13px",
            borderRadius: 6,
            border: "1px solid #16161A",
            background: "#16161A",
            color: "#FFFFFF",
            fontSize: 13,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          One
        </span>
        <span
          className="zhamo-chip"
          style={{
            height: 30,
            padding: "0 13px",
            borderRadius: 6,
            border: "1px solid #D5D9DE",
            background: "#FFFFFF",
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          Multiple
        </span>
        <span
          className="zhamo-chip"
          style={{
            height: 30,
            padding: "0 13px",
            borderRadius: 6,
            border: "1px solid #D5D9DE",
            background: "#FFFFFF",
            fontSize: 13,
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          I&apos;m self-employed
        </span>
      </div>
      <div
        style={{
          display: "inline-flex",
          padding: 2,
          background: "#EDEFF2",
          borderRadius: 7,
          width: "fit-content",
        }}
      >
        <span
          style={{
            height: 28,
            padding: "0 16px",
            borderRadius: 5,
            background: "#FFFFFF",
            fontSize: 13,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            boxShadow: "0 1px 2px rgba(22,22,26,0.08)",
          }}
        >
          Day
        </span>
        <span
          style={{
            height: 28,
            padding: "0 16px",
            borderRadius: 5,
            fontSize: 13,
            color: "#5B6069",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          Week
        </span>
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              background: "#FFC935",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#17170F",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✓
          </span>
          Included in plan
        </label>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#5B6069",
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: "1px solid #C9CDD3",
              background: "#FFFFFF",
            }}
          />
          Disable online booking
        </label>
        <span
          style={{
            width: 34,
            height: 20,
            borderRadius: 10,
            background: "#22C55E",
            position: "relative",
            display: "inline-block",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: 16,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#FFFFFF",
            }}
          />
        </span>
        <span
          style={{
            width: 34,
            height: 20,
            borderRadius: 10,
            background: "#D5D9DE",
            position: "relative",
            display: "inline-block",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#FFFFFF",
            }}
          />
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span
          style={{
            height: 22,
            padding: "0 8px",
            borderRadius: 6,
            background: "#FEF6E0",
            color: "#8A6A05",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Pending
        </span>
        <span
          style={{
            height: 22,
            padding: "0 8px",
            borderRadius: 6,
            background: "#E7F8EE",
            color: "#17753C",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Arrived
        </span>
        <span
          style={{
            height: 22,
            padding: "0 8px",
            borderRadius: 6,
            background: "#FFF0F0",
            color: "#C7302F",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          No-show
        </span>
        <span
          style={{
            height: 22,
            padding: "0 8px",
            borderRadius: 6,
            background: "#EEF3FE",
            color: "#1B4FCB",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Confirmed
        </span>
        <span
          style={{
            height: 22,
            padding: "0 8px",
            borderRadius: 6,
            background: "#F1F2F4",
            color: "#5B6069",
            fontSize: 11,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Invite sent
        </span>
      </div>
      <style>{`.zhamo-chip:hover { border-color: #16161A; }`}</style>
    </div>
  );
}
