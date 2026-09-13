"use client";

import dynamic from "next/dynamic";

const DayCalendarScreen = dynamic(
  () => import("@/widgets/day-calendar").then((m) => m.DayCalendarScreen),
  { ssr: false },
);

export default function BookingPage() {
  return <DayCalendarScreen />;
}
