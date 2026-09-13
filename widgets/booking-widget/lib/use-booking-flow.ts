"use client";

import { useState } from "react";
import {
  bizAddress,
  bizInitial,
  bizName,
  dateOptions,
  defaultCart,
  serviceCategories,
  serviceDurations,
  servicePrices,
  specialists,
  timeGroups,
} from "../model/mobile-data";
import { jumpDefs, type JumpKey } from "../model/misc-data";
import type { BookingStep, SlotState } from "../model/types";

export const ACCENT = "oklch(0.64 0.16 350)";
export const ACCENT_DEEP = "oklch(0.42 0.12 350)";
export const ACCENT_TINT = "oklch(0.97 0.02 350)";
export const COVER_A = "oklch(0.5 0.1 350)";
export const COVER_B = "oklch(0.44 0.1 350)";

function formatPrice(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ֏";
}

const stepTitles: Record<BookingStep, string> = {
  1: "Choose services",
  2: "Choose a specialist",
  3: "Choose date and time",
  4: "Your details",
  5: "Confirmed",
};

function slotAppearance(state: SlotState) {
  const picked = state === "picked";
  const gone = state === "gone";
  return {
    border: picked ? ACCENT : gone ? "#EEF0F2" : "#D5D9DE",
    bg: picked ? ACCENT : gone ? "#F7F8FA" : "#FFFFFF",
    color: picked ? "#FFFFFF" : gone ? "#C0C5CB" : "#16161A",
    weight: picked ? 700 : 400,
    cursor: gone ? "not-allowed" : "pointer",
    strike: gone ? "line-through" : "none",
  };
}

export function useBookingFlow() {
  const [step, setStep] = useState<BookingStep>(1);
  const [sms, setSms] = useState(false);
  const [day, setDay] = useState("14");
  const [taken, setTaken] = useState(false);
  const [cart, setCart] = useState<Record<string, boolean>>(defaultCart);
  const [any, setAny] = useState(true);
  const [pickedSpecialist, setPickedSpecialist] = useState<string | null>(null);
  const [contactName, setContactName] = useState("Anahit");
  const [contactPhone, setContactPhone] = useState("77 214 508");
  const [contactComment, setContactComment] = useState("");

  const toggleService = (name: string) =>
    setCart((c) => ({ ...c, [name]: !c[name] }));

  const next = () => {
    if (step === 4 && !sms) {
      setSms(true);
      return;
    }
    if (step === 4 && sms) {
      setStep(5);
      setSms(false);
      return;
    }
    setStep((s) => Math.min(5, s + 1) as BookingStep);
  };

  const pickSunday = () => setDay("16");
  const pickAny = () => {
    setAny(true);
    setPickedSpecialist(null);
  };
  const pickSpecialist = (name: string) => {
    setAny(false);
    setPickedSpecialist(name);
  };
  const pickSlot = () => setStep(4);
  const pickDay = (d: string) => setDay(d);

  const jump = (key: JumpKey) => {
    if (key === 31) {
      setStep(3);
      setDay("15");
    } else if (key === 41) {
      setStep(4);
      setSms(true);
    } else if (key === 51) {
      setStep(5);
      setTaken(true);
    } else if (key === 3) {
      setStep(3);
      setDay("14");
    } else if (key === 4) {
      setStep(4);
      setSms(false);
    } else if (key === 5) {
      setStep(5);
      setTaken(false);
    } else {
      setStep(key);
    }
  };

  const categories = serviceCategories.map((cat) => ({
    ...cat,
    services: cat.services.map((s) => {
      const on = !!cart[s.name];
      return {
        ...s,
        on,
        bg: on ? "oklch(0.98 0.012 350)" : "#FFFFFF",
        boxBorder: on ? ACCENT : "#C9CDD3",
        boxBg: on ? ACCENT : "#FFFFFF",
        check: on ? "✓" : "",
        toggle: () => toggleService(s.name),
      };
    }),
  }));

  const specialistsView = specialists.map((p) => ({
    ...p,
    border: !any && pickedSpecialist === p.name ? ACCENT : "#E6E8EB",
    pick: () => pickSpecialist(p.name),
  }));

  const dates = dateOptions.map((d) => {
    const on = day === d.day;
    const full = d.free === "full";
    return {
      ...d,
      border: on ? ACCENT : full ? "#EEF0F2" : "#D5D9DE",
      bg: on ? ACCENT : full ? "#F7F8FA" : "#FFFFFF",
      color: on ? "#FFFFFF" : full ? "#C0C5CB" : "#16161A",
      pick: () => pickDay(d.day),
    };
  });

  const timeGroupsView = timeGroups.map((g) => ({
    ...g,
    slots: g.slots.map((t) => ({
      ...t,
      ...slotAppearance(t.state),
      pick: pickSlot,
    })),
  }));

  const cartCount = Object.keys(cart).filter((k) => cart[k]).length;
  const total = Object.keys(cart)
    .filter((k) => cart[k])
    .reduce((a, k) => a + servicePrices[k], 0);
  const mins = Object.keys(cart)
    .filter((k) => cart[k])
    .reduce((a, k) => a + serviceDurations[k], 0);

  const isStep1 = step === 1;
  const isStep2 = step === 2;
  const isStep3 = step === 3;
  const isStep4 = step === 4;
  const isStep5 = step === 5;
  const smsStep = isStep4 && sms;
  const contactStep = isStep4 && !sms;
  const takenView = isStep5 && taken;
  const confirmedView = isStep5 && !taken;
  const dayFull = isStep3 && day === "15";
  const dayOpen = isStep3 && day !== "15";

  const stepTitle = isStep4
    ? sms
      ? "Verify your number"
      : "Your details"
    : isStep5
      ? taken
        ? "That slot went"
        : "Confirmed"
      : stepTitles[step];

  const jumps = jumpDefs.map((j) => ({ ...j, go: () => jump(j.key) }));

  return {
    step,
    biz: { name: bizName, initial: bizInitial, address: bizAddress },
    isStep1,
    isStep2,
    isStep3,
    isStep4,
    isStep5,
    smsStep,
    contactStep,
    taken: takenView,
    confirmed: confirmedView,
    dayFull,
    dayOpen,
    stepNum: String(step),
    stepTitle,
    indicator: [1, 2, 3, 4, 5].map((n) => ({
      n,
      bg: n < step ? ACCENT : n === step ? "#FFC935" : "#E6E8EB",
    })),
    embedIndicator: [1, 2, 3, 4, 5].map((n) => ({
      n,
      bg: n < 3 ? ACCENT : n === 3 ? "#FFC935" : "#E6E8EB",
    })),
    showBar: step === 1 || step === 2 || (step === 4 && !sms),
    cartTotal: step === 2 ? "Any specialist" : formatPrice(total),
    cartMeta: `${cartCount} services · ${mins} min`,
    ctaLabel:
      step === 1
        ? "Choose specialist"
        : step === 2
          ? "Choose a time"
          : "Send code by SMS",
    next,
    pickSunday,
    pickAny,
    anyCheck: any ? "✓" : "",
    categories,
    specialists: specialistsView,
    dates,
    timeGroups: timeGroupsView,
    jumps,
    trustLine: "★ 4.9 · 218 reviews · Open till 22:00",
    anySpecialistMeta: "Fastest — 9 free times today",
    contactName,
    setContactName,
    contactPhone,
    setContactPhone,
    contactComment,
    setContactComment,
    smsTargetPhone: "+374 77 214 508",
    bookingUnavailable: false,
    bookingUnavailableMessage: undefined as string | undefined,
  };
}

export type BookingFlow = ReturnType<typeof useBookingFlow>;
