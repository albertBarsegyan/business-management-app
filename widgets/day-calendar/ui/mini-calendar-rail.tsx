"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useWaitlistEntriesQuery } from "@/shared/api/scheduling/queries";
import { buildMonthDays } from "../model/month-days";
import { quickActions, weekdayLabels } from "../model/team";

const MONTH_LABEL_FORMAT = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
});

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function MiniCalendarRail({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}) {
  const waitlistQuery = useWaitlistEntriesQuery();
  const waitlistCount = waitlistQuery.data?.length ?? 0;
  const [monthAnchor, setMonthAnchor] = useState(() =>
    startOfMonth(selectedDate),
  );

  const monthDays = useMemo(
    () => buildMonthDays(monthAnchor, selectedDate),
    [monthAnchor, selectedDate],
  );

  function goToPrevMonth() {
    setMonthAnchor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setMonthAnchor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function selectDay(date: Date) {
    onSelectDate(date);
    setMonthAnchor(startOfMonth(date));
  }

  return (
    <div
      className="zhamo-daycal-rail"
      style={{
        width: 232,
        flex: "0 0 auto",
        background: "#FFFFFF",
        borderRight: "1px solid #E6E8EB",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: 14,
          borderBottom: "1px solid #E6E8EB",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-zhamo-display)",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {MONTH_LABEL_FORMAT.format(monthAnchor)}
          </span>
          <span style={{ display: "flex", gap: 4 }}>
            <span
              onClick={goToPrevMonth}
              style={{
                width: 20,
                height: 20,
                border: "1px solid #E6E8EB",
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#5B6069",
                cursor: "pointer",
              }}
            >
              ‹
            </span>
            <span
              onClick={goToNextMonth}
              style={{
                width: 20,
                height: 20,
                border: "1px solid #E6E8EB",
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "#5B6069",
                cursor: "pointer",
              }}
            >
              ›
            </span>
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 2,
          }}
        >
          {weekdayLabels.map((d, i) => (
            <span
              key={`${d}-${i}`}
              style={{
                height: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-zhamo-mono)",
                fontSize: 9.5,
                letterSpacing: "0.06em",
                color: "#A9AEB6",
              }}
            >
              {d}
            </span>
          ))}
          {monthDays.map((d) => (
            <span
              key={d.date.toISOString()}
              onClick={() => selectDay(d.date)}
              style={{
                height: 28,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: d.isSelected
                  ? "#16161A"
                  : d.isToday
                    ? "#FEF6E0"
                    : "transparent",
                color: d.isSelected
                  ? "#FFFFFF"
                  : !d.inCurrentMonth
                    ? "#C9CDD3"
                    : "#16161A",
                fontSize: 11.5,
                fontWeight: d.isSelected || d.isToday ? "700" : "400",
              }}
            >
              {d.n}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: 14,
          borderBottom: "1px solid #E6E8EB",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A9AEB6",
          }}
        >
          Quick actions
        </span>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}
        >
          {quickActions.map((q) => {
            const label =
              q.href === "/waitlist"
                ? `${q.label} · ${waitlistCount}`
                : q.label;
            const tileStyle: React.CSSProperties = {
              border: "1px solid #E6E8EB",
              borderRadius: 8,
              padding: 9,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              cursor: q.href ? "pointer" : "default",
              gridColumn: q.span,
              background: "#FFFFFF",
              textDecoration: "none",
              color: "inherit",
            };
            const content = (
              <>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: "#FEF6E0",
                    color: "#8A6A05",
                    fontFamily: "var(--font-zhamo-mono)",
                    fontSize: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {q.mono}
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}
                >
                  {label}
                </span>
              </>
            );
            return q.href ? (
              <Link
                key={q.label}
                href={q.href}
                className="zhamo-daycal-quick-action"
                style={tileStyle}
              >
                {content}
              </Link>
            ) : (
              <div
                key={q.label}
                className="zhamo-daycal-quick-action"
                style={tileStyle}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .zhamo-daycal-quick-action:hover { border-color: #16161A; background: #FAFBFC; }
      `}</style>
    </div>
  );
}
