"use client";

import { toast } from "sonner";

export function EmptyDayOverlay({
  onScheduleFirstClient,
}: {
  onScheduleFirstClient: () => void;
}) {
  async function onCopyBookingLink() {
    const link = `${window.location.origin}/customer`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Booking link copied to clipboard");
    } catch {
      toast.error(`Couldn't copy automatically. Your booking link: ${link}`);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        top: 120,
        display: "flex",
        justifyContent: "center",
        zIndex: 5,
      }}
    >
      <div
        style={{
          maxWidth: 440,
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          boxShadow: "0 8px 32px rgba(20,20,26,0.1)",
          padding: "30px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
        }}
      >
        <span
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            background: "#FEF6E0",
            color: "#8A6A05",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          +
        </span>
        <span
          style={{
            fontFamily: "var(--font-zhamo-display)",
            fontSize: 30,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 700,
          }}
        >
          The day is yours to fill
        </span>
        <span
          style={{
            fontSize: 13.5,
            color: "#5B6069",
            lineHeight: 1.55,
            maxWidth: "38ch",
          }}
        >
          Click any free slot to book someone in, or send your booking link and
          let clients fill it themselves.
        </span>
        <span style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            onClick={onScheduleFirstClient}
            style={{
              height: 36,
              padding: "0 15px",
              border: 0,
              borderRadius: 6,
              background: "#FFC935",
              color: "#17170F",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Schedule first client
          </button>
          <button
            onClick={onCopyBookingLink}
            style={{
              height: 36,
              padding: "0 15px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Copy booking link
          </button>
        </span>
      </div>
    </div>
  );
}
