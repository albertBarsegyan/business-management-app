"use client";

import { useEffect, useState } from "react";
import {
  DAY_END_MINUTES,
  DAY_START_MINUTES,
  SLOT_HEIGHT_PX,
  SLOT_MINUTES,
} from "../model/slots";

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function NowIndicator({ date }: { date: Date }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!isSameDay(now, date)) return null;

  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  if (
    minutesSinceMidnight < DAY_START_MINUTES ||
    minutesSinceMidnight > DAY_END_MINUTES
  ) {
    return null;
  }

  const top =
    ((minutesSinceMidnight - DAY_START_MINUTES) / SLOT_MINUTES) *
    SLOT_HEIGHT_PX;

  return (
    <div
      style={{
        position: "absolute",
        left: 56,
        right: 56,
        top,
        height: 0,
        zIndex: 4,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background: "#EF4444",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: -46,
          top: -8,
          height: 17,
          padding: "0 5px",
          borderRadius: 4,
          background: "#EF4444",
          color: "#FFFFFF",
          fontFamily: "var(--font-zhamo-mono)",
          fontSize: 9.5,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {TIME_FORMAT.format(now)}
      </span>
    </div>
  );
}
