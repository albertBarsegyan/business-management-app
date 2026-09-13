"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useCreateServiceCategoryMutation,
  useCreateServiceMutation,
  useServiceCategoriesQuery,
  useUpsertTeamAssignmentMutation,
} from "@/shared/api/catalog/queries";
import { ApiError } from "@/shared/api/http";
import { useLocationsQuery } from "@/shared/api/locations/queries";
import {
  useCreateTeamMemberMutation,
  useCreateTeamWorkingHoursMutation,
} from "@/shared/api/team/queries";
import { useVenueQuery } from "@/shared/api/venue/queries";
import {
  type DayKey,
  type Duration,
  type HourPreset,
  type SetupStep,
} from "./model/types";
import { CompletionScreen } from "./ui/completion-screen";
import { SetupBackdrop } from "./ui/setup-backdrop";
import { SetupTopBar } from "./ui/setup-top-bar";
import { StepContentPane } from "./ui/step-content-pane";
import { StepPreviewPane } from "./ui/step-preview-pane";
import { VenueDetailsStep } from "./ui/venue-details-step";

const initialDays: Record<DayKey, boolean> = {
  Sun: false,
  Mon: true,
  Tue: true,
  Wed: true,
  Thu: true,
  Fri: true,
  Sat: true,
};

const DURATION_MINUTES: Record<Duration, number> = {
  "30 m": 30,
  "1 h": 60,
  "1 h 30 m": 90,
};

// TeamWorkingHours.weekday is ISO-8601 (1=Mon...7=Sun) — dayKeys in this
// widget is ordered Sun-first (JS Date.getDay() convention), so this needs
// an explicit map rather than a positional index.
const ISO_WEEKDAY: Record<DayKey, number> = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTime(raw: string) {
  const [hours, minutes] = raw.split(":");
  return `${hours.padStart(2, "0")}:${minutes}`;
}

function resolveHoursRange(
  hours: HourPreset,
  customOpensAt: string,
  customClosesAt: string,
): { start: string; end: string } | null {
  if (hours === "Custom hours") {
    if (!customOpensAt || !customClosesAt) return null;
    return { start: customOpensAt, end: customClosesAt };
  }
  const [start, end] = hours.split("–");
  if (!start || !end) return null;
  return { start: normalizeTime(start), end: normalizeTime(end) };
}

function errorMessageFrom(error: unknown) {
  return error instanceof ApiError ? error.message : "Something went wrong.";
}

export function SetupModalScreen() {
  const router = useRouter();
  const [step, setStep] = useState<SetupStep>(1);

  const [serviceName, setServiceName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [duration, setDuration] = useState<Duration>("1 h");
  const [createdVariantId, setCreatedVariantId] = useState<string | null>(null);

  const [teamMemberName, setTeamMemberName] = useState("");
  const [teamMemberSpecialization, setTeamMemberSpecialization] = useState("");
  const [createdTeamMemberId, setCreatedTeamMemberId] = useState<string | null>(
    null,
  );

  const [days, setDays] = useState<Record<DayKey, boolean>>(initialDays);
  const [hours, setHours] = useState<HourPreset>("9:00–22:00");
  const [customOpensAt, setCustomOpensAt] = useState("08:30");
  const [customClosesAt, setCustomClosesAt] = useState("21:00");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const venueQuery = useVenueQuery();
  const categoriesQuery = useServiceCategoriesQuery();
  const locationsQuery = useLocationsQuery();
  const createCategory = useCreateServiceCategoryMutation();
  const createService = useCreateServiceMutation();
  const createTeamMember = useCreateTeamMemberMutation();
  const upsertTeamAssignment = useUpsertTeamAssignmentMutation(
    createdVariantId ?? "",
  );
  const createWorkingHours = useCreateTeamWorkingHoursMutation(
    createdTeamMemberId ?? "",
  );

  const toggleDay = (k: DayKey) =>
    setDays((prev) => ({ ...prev, [k]: !prev[k] }));
  const back = () => {
    setStepError(null);
    setStep((s) => Math.max(1, s - 1) as SetupStep);
  };
  const start = () => router.push("/reports");

  async function handleContinue() {
    setStepError(null);

    if (step === 1) {
      if (!serviceName.trim() || !servicePrice.trim()) {
        setStepError("Service name and price are required.");
        return;
      }
      setIsSubmitting(true);
      try {
        let categoryId: string | undefined;
        const trimmedCategory = serviceCategory.trim();
        if (trimmedCategory) {
          const existing = categoriesQuery.data?.find(
            (c) => c.name.toLowerCase() === trimmedCategory.toLowerCase(),
          );
          categoryId = existing
            ? existing.id
            : (await createCategory.mutateAsync({ name: trimmedCategory })).id;
        }
        const priceMinor = Math.round(Number(servicePrice) * 100).toString();
        const { variant } = await createService.mutateAsync({
          service: {
            name: serviceName,
            slug: slugify(serviceName),
            categoryId,
          },
          variant: {
            durationMinutes: DURATION_MINUTES[duration],
            priceMinor,
            currencyCode: venueQuery.data?.baseCurrencyCode ?? "USD",
          },
        });
        setCreatedVariantId(variant.id);
        setStep(2);
      } catch (error) {
        setStepError(errorMessageFrom(error));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (step === 2) {
      if (!teamMemberName.trim() || !teamMemberSpecialization.trim()) {
        setStepError("Name and specialization are required.");
        return;
      }
      if (!createdVariantId) {
        setStepError(
          "Something went wrong — go back and recreate the service.",
        );
        return;
      }
      setIsSubmitting(true);
      try {
        const trimmedName = teamMemberName.trim();
        const [firstName, ...rest] = trimmedName.split(/\s+/);
        const lastName = rest.join(" ") || firstName;
        const member = await createTeamMember.mutateAsync({
          firstName,
          lastName,
          displayName: trimmedName,
          positionTitle: teamMemberSpecialization.trim(),
        });
        await upsertTeamAssignment.mutateAsync({
          teamMemberId: member.id,
          body: { enabled: true },
        });
        setCreatedTeamMemberId(member.id);
        setStep(3);
      } catch (error) {
        setStepError(errorMessageFrom(error));
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (step === 3) {
      if (!createdTeamMemberId) {
        setStepError(
          "Something went wrong — go back and recreate the team member.",
        );
        return;
      }
      const location = locationsQuery.data?.[0];
      if (!location) {
        setStepError("No location found for this venue.");
        return;
      }
      const range = resolveHoursRange(hours, customOpensAt, customClosesAt);
      if (!range) {
        setStepError("Enter both opening and closing times.");
        return;
      }
      const selectedDays = (Object.keys(days) as DayKey[]).filter(
        (day) => days[day],
      );
      setIsSubmitting(true);
      try {
        await Promise.all(
          selectedDays.map((day) =>
            createWorkingHours.mutateAsync({
              locationId: location.id,
              weekday: ISO_WEEKDAY[day],
              startsAtLocal: range.start,
              endsAtLocal: range.end,
            }),
          ),
        );
        setStep(4);
      } catch (error) {
        setStepError(errorMessageFrom(error));
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  if (venueQuery.isPending) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E9EBEE",
        }}
      >
        <p style={{ color: "#8A9099", fontSize: 13.5 }}>Loading…</p>
      </div>
    );
  }

  const needsOnboarding =
    venueQuery.isError &&
    venueQuery.error instanceof ApiError &&
    venueQuery.error.status === 403;

  if (venueQuery.isError && !needsOnboarding) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#E9EBEE",
        }}
      >
        <p style={{ color: "#C7302F", fontSize: 13.5 }}>
          Couldn&apos;t load your venue: {venueQuery.error.message}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "clamp(16px, 5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        background: "#E9EBEE",
        color: "#16161A",
      }}
    >
      {needsOnboarding ? (
        <VenueDetailsStep />
      ) : (
        <>
          <SetupTopBar step={step} onGo={setStep} />

          <div
            style={{
              width: "100%",
              maxWidth: 1100,
              background: "#14141A",
              borderRadius: 12,
              padding: "clamp(16px, 5vw, 44px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <SetupBackdrop />

            {step === 4 ? (
              <CompletionScreen onRestart={start} />
            ) : (
              <div
                className="zhamo-onboard-card"
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 940,
                  background: "#FFFFFF",
                  borderRadius: 10,
                  boxShadow: "0 24px 64px rgba(10,10,14,0.4)",
                  display: "grid",
                  gridTemplateColumns: "380px 1fr",
                  overflow: "hidden",
                }}
              >
                <StepPreviewPane step={step} days={days} hours={hours} />
                <StepContentPane
                  step={step}
                  serviceName={serviceName}
                  onChangeServiceName={setServiceName}
                  serviceCategory={serviceCategory}
                  onChangeServiceCategory={setServiceCategory}
                  servicePrice={servicePrice}
                  onChangeServicePrice={setServicePrice}
                  currencyCode={venueQuery.data?.baseCurrencyCode ?? "USD"}
                  duration={duration}
                  onPickDuration={setDuration}
                  teamMemberName={teamMemberName}
                  onChangeTeamMemberName={setTeamMemberName}
                  teamMemberSpecialization={teamMemberSpecialization}
                  onChangeTeamMemberSpecialization={setTeamMemberSpecialization}
                  days={days}
                  hours={hours}
                  onToggleDay={toggleDay}
                  onPickHours={setHours}
                  customOpensAt={customOpensAt}
                  onChangeCustomOpensAt={setCustomOpensAt}
                  customClosesAt={customClosesAt}
                  onChangeCustomClosesAt={setCustomClosesAt}
                  onBack={back}
                  onNext={handleContinue}
                  isSubmitting={isSubmitting}
                  errorMessage={stepError}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
