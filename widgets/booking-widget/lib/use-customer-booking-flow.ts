"use client";

import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import {
  catalogKeys,
  useServiceCategoriesQuery,
  useServicesQuery,
} from "@/shared/api/catalog/queries";
import type { ServiceVariant } from "@/shared/api/catalog/types";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import { useVenueQuery } from "@/shared/api/venue/queries";
import type { BookingFlow } from "./use-booking-flow";
import type {
  BookingStep,
  DateOption,
  ServiceCategory,
  TimeGroupDef,
} from "../model/types";

const ACCENT = "oklch(0.64 0.16 350)";

function formatPrice(minorAmount: number, currencyCode: string) {
  return `${(minorAmount / 100).toLocaleString()} ${currencyCode}`;
}

const stepTitles: Record<BookingStep, string> = {
  1: "Choose services",
  2: "Choose a specialist",
  3: "Choose date and time",
  4: "Your details",
  5: "Confirmed",
};

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function nextDays(count: number): DateOption[] {
  const out: DateOption[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    out.push({ dow: DOW[d.getDay()], day: String(d.getDate()), free: "" });
  }
  return out;
}

function genericTimeGroups(): TimeGroupDef[] {
  const group = (label: string, hours: number[]): TimeGroupDef => ({
    label,
    meta: "",
    slots: hours.map((h) => ({
      label: `${String(h).padStart(2, "0")}:00`,
      state: "free" as const,
    })),
  });
  return [
    group("Morning", [9, 10, 11]),
    group("Afternoon", [12, 13, 14, 15, 16]),
    group("Evening", [17, 18, 19]),
  ];
}

/**
 * Real-data variant of useBookingFlow for the actual customer-facing page.
 * Structurally matches BookingFlow so it can drop into the same shared step
 * components used by the (untouched) design-showcase page — services and
 * specialists are real; date/time stays a generic placeholder grid since
 * the backend has no availability-query endpoint (only "try to hold this
 * exact slot"); final submission is disabled rather than faked, since
 * there's no public booking-creation endpoint either.
 */
export function useCustomerBookingFlow(): BookingFlow {
  const [step, setStep] = useState<BookingStep>(1);
  const [sms, setSms] = useState(false);
  const [day, setDay] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, boolean>>({});
  const [any, setAny] = useState(true);
  const [pickedSpecialistId, setPickedSpecialistId] = useState<string | null>(
    null,
  );
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactComment, setContactComment] = useState("");

  const venueQuery = useVenueQuery();
  const categoriesQuery = useServiceCategoriesQuery();
  const servicesQuery = useServicesQuery();
  const teamQuery = useTeamMembersQuery();

  const activeServices = (servicesQuery.data ?? []).filter(
    (s) => s.status === "active",
  );
  const variantQueries = useQueries({
    queries: activeServices.map((service) => ({
      queryKey: catalogKeys.variants(service.id),
      queryFn: () =>
        unwrap<ServiceVariant[]>(
          apiClient.get(`services/${service.id}/variants`),
        ),
    })),
  });

  interface VariantRow {
    variantId: string;
    name: string;
    duration: string;
    price: string;
    priceMinor: number;
    minutes: number;
  }
  const variantsByService = new Map<string, VariantRow[]>();
  activeServices.forEach((service, i) => {
    const variants = (variantQueries[i]?.data ?? []).filter(
      (v) => v.status === "active",
    );
    variantsByService.set(
      service.id,
      variants.map((v) => ({
        variantId: v.id,
        name: v.name ? `${service.name} — ${v.name}` : service.name,
        duration: `${v.durationMinutes} min`,
        price: formatPrice(Number(v.priceMinor), v.currencyCode),
        priceMinor: Number(v.priceMinor),
        minutes: v.durationMinutes,
      })),
    );
  });

  const rawCategories = categoriesQuery.data ?? [];
  const uncategorized = activeServices.filter((s) => !s.categoryId);
  const categorySources: { id: string | null; name: string }[] = [
    ...rawCategories.map((c) => ({ id: c.id, name: c.name })),
    ...(uncategorized.length > 0 ? [{ id: null, name: "Other services" }] : []),
  ];

  const allVariantRows = new Map<string, VariantRow>();
  variantsByService.forEach((rows) =>
    rows.forEach((r) => allVariantRows.set(r.variantId, r)),
  );

  const toggleService = (variantId: string) =>
    setCart((c) => ({ ...c, [variantId]: !c[variantId] }));

  const rawCategoryModels: ServiceCategory[] = categorySources
    .map(({ id, name }) => {
      const services = activeServices
        .filter((s) => s.categoryId === id)
        .flatMap((s) => variantsByService.get(s.id) ?? []);
      return {
        name,
        count: `${services.length} service${services.length === 1 ? "" : "s"}`,
        glyph: "▾",
        open: true,
        services: services.map((v) => ({
          name: v.name,
          duration: v.duration,
          price: v.price,
        })),
      };
    })
    .filter((c) => c.services.length > 0);

  const categories = rawCategoryModels.map((c) => ({
    ...c,
    services: c.services.map((s) => {
      const row = [...allVariantRows.values()].find((v) => v.name === s.name);
      const variantId = row?.variantId ?? s.name;
      const on = !!cart[variantId];
      return {
        ...s,
        on,
        bg: on ? "oklch(0.98 0.012 350)" : "#FFFFFF",
        boxBorder: on ? ACCENT : "#C9CDD3",
        boxBg: on ? ACCENT : "#FFFFFF",
        check: on ? "✓" : "",
        toggle: () => toggleService(variantId),
      };
    }),
  }));

  const specialistsSource = (teamQuery.data ?? []).filter(
    (m) => m.publicProfileVisible,
  );
  const specialistsView = specialistsSource.map((m) => ({
    name: m.displayName,
    role: m.positionTitle,
    rating: "—",
    free: "",
    initials: "PHOTO",
    border: !any && pickedSpecialistId === m.id ? ACCENT : "#E6E8EB",
    pick: () => {
      setAny(false);
      setPickedSpecialistId(m.id);
    },
  }));

  const dateOptions = nextDays(7);
  const activeDay = day ?? dateOptions[0]?.day ?? "";
  const dates = dateOptions.map((d) => {
    const on = activeDay === d.day;
    return {
      ...d,
      border: on ? ACCENT : "#D5D9DE",
      bg: on ? ACCENT : "#FFFFFF",
      color: on ? "#FFFFFF" : "#16161A",
      pick: () => setDay(d.day),
    };
  });

  const timeGroupsView = genericTimeGroups().map((g) => ({
    ...g,
    slots: g.slots.map((t) => ({
      ...t,
      border: "#D5D9DE",
      bg: "#FFFFFF",
      color: "#16161A",
      weight: 400 as const,
      cursor: "pointer" as const,
      strike: "none" as const,
      pick: () => setStep(4),
    })),
  }));

  const cartVariantIds = Object.keys(cart).filter((id) => cart[id]);
  const cartCount = cartVariantIds.length;
  const total = cartVariantIds.reduce(
    (sum, id) => sum + (allVariantRows.get(id)?.priceMinor ?? 0),
    0,
  );
  const mins = cartVariantIds.reduce(
    (sum, id) => sum + (allVariantRows.get(id)?.minutes ?? 0),
    0,
  );
  const currencyCode = [...allVariantRows.values()][0] ? "AMD" : "AMD";

  const next = () => {
    if (step === 4 && !sms) {
      setSms(true);
      return;
    }
    setStep((s) => Math.min(5, s + 1) as BookingStep);
  };

  const isStep1 = step === 1;
  const isStep2 = step === 2;
  const isStep3 = step === 3;
  const isStep4 = step === 4;
  const isStep5 = step === 5;
  const smsStep = isStep4 && sms;
  const contactStep = isStep4 && !sms;

  const stepTitle = isStep4
    ? sms
      ? "Verify your number"
      : "Your details"
    : stepTitles[step];

  const venue = venueQuery.data;

  return {
    step,
    biz: {
      name: venue?.name ?? "",
      initial: venue?.name ? venue.name[0].toUpperCase() : "",
      address: "",
    },
    isStep1,
    isStep2,
    isStep3,
    isStep4,
    isStep5,
    smsStep,
    contactStep,
    taken: false,
    confirmed: false,
    dayFull: false,
    dayOpen: isStep3,
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
    cartTotal: step === 2 ? "Any specialist" : formatPrice(total, currencyCode),
    cartMeta: `${cartCount} service${cartCount === 1 ? "" : "s"} · ${mins} min`,
    ctaLabel:
      step === 1
        ? "Choose specialist"
        : step === 2
          ? "Choose a time"
          : "Send code by SMS",
    next,
    pickSunday: () => {},
    pickAny: () => {
      setAny(true);
      setPickedSpecialistId(null);
    },
    anyCheck: any ? "✓" : "",
    categories,
    specialists: specialistsView,
    dates,
    timeGroups: timeGroupsView,
    jumps: [],
    trustLine: "",
    anySpecialistMeta: "Book with the first available specialist",
    contactName,
    setContactName,
    contactPhone,
    setContactPhone,
    contactComment,
    setContactComment,
    smsTargetPhone: contactPhone ? `+374 ${contactPhone}` : "",
    bookingUnavailable: true,
    bookingUnavailableMessage:
      "Online booking isn't available yet — please call or message the business directly to book this appointment.",
  };
}
