"use client";

import { useState } from "react";
import { useCompleteOnboardingMutation } from "@/shared/api/venue/queries";
import type { VerticalCode } from "@/shared/api/venue/types";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "#5B6069",
};

const VERTICAL_OPTIONS: { value: VerticalCode; label: string }[] = [
  { value: "beauty", label: "Beauty" },
  { value: "healthcare_admin", label: "Healthcare admin" },
  { value: "fitness", label: "Fitness" },
  { value: "education", label: "Education" },
  { value: "consumer_services", label: "Consumer services" },
  { value: "automotive", label: "Automotive" },
  { value: "other", label: "Other" },
];

function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function browserDefaults() {
  try {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      locale: navigator.language || "en",
    };
  } catch {
    return { timezone: "UTC", locale: "en" };
  }
}

export function VenueDetailsStep() {
  const [defaults] = useState(browserDefaults);
  const [form, setForm] = useState({
    name: "",
    verticalCode: "beauty" as VerticalCode,
    countryCode: "",
    baseCurrencyCode: "",
    defaultTimezone: defaults.timezone,
    defaultLocale: defaults.locale,
    locationName: "Main location",
  });
  const completeOnboarding = useCompleteOnboardingMutation();

  const slug = slugify(form.name);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    completeOnboarding.mutate({
      venue: {
        name: form.name,
        slug,
        verticalCode: form.verticalCode,
        countryCode: form.countryCode.toUpperCase(),
        baseCurrencyCode: form.baseCurrencyCode.toUpperCase(),
        defaultTimezone: form.defaultTimezone,
        defaultLocale: form.defaultLocale,
      },
      primaryLocation: {
        name: form.locationName,
      },
    });
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 12,
          padding: "clamp(20px, 5vw, 32px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-zhamo-display)",
              fontSize: "clamp(22px, 5vw, 30px)",
              lineHeight: 1.05,
              letterSpacing: "-0.024em",
              fontWeight: 700,
            }}
          >
            Tell us about your business
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 13.5,
              color: "#5B6069",
              lineHeight: 1.5,
            }}
          >
            This creates your venue and its first location — everything else in
            the calendar is scoped to it.
          </p>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelStyle}>Business name</span>
          <input
            required
            placeholder="Alden & Rowe Studio"
            value={form.name}
            onChange={(event) =>
              setForm((f) => ({ ...f, name: event.target.value }))
            }
            style={inputStyle}
          />
          {slug ? (
            <span style={{ fontSize: 11, color: "#8A9099" }}>
              URL slug: {slug}
            </span>
          ) : null}
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelStyle}>Business type</span>
          <select
            value={form.verticalCode}
            onChange={(event) =>
              setForm((f) => ({
                ...f,
                verticalCode: event.target.value as VerticalCode,
              }))
            }
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {VERTICAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Country code</span>
            <input
              required
              placeholder="AM"
              maxLength={2}
              value={form.countryCode}
              onChange={(event) =>
                setForm((f) => ({ ...f, countryCode: event.target.value }))
              }
              style={{
                ...inputStyle,
                fontFamily: "var(--font-zhamo-mono)",
                textTransform: "uppercase",
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Currency code</span>
            <input
              required
              placeholder="AMD"
              maxLength={3}
              value={form.baseCurrencyCode}
              onChange={(event) =>
                setForm((f) => ({ ...f, baseCurrencyCode: event.target.value }))
              }
              style={{
                ...inputStyle,
                fontFamily: "var(--font-zhamo-mono)",
                textTransform: "uppercase",
              }}
            />
          </label>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Timezone</span>
            <input
              required
              value={form.defaultTimezone}
              onChange={(event) =>
                setForm((f) => ({ ...f, defaultTimezone: event.target.value }))
              }
              style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={labelStyle}>Locale</span>
            <input
              required
              value={form.defaultLocale}
              onChange={(event) =>
                setForm((f) => ({ ...f, defaultLocale: event.target.value }))
              }
              style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
            />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelStyle}>Primary location name</span>
          <input
            required
            value={form.locationName}
            onChange={(event) =>
              setForm((f) => ({ ...f, locationName: event.target.value }))
            }
            style={inputStyle}
          />
        </label>

        {completeOnboarding.isError ? (
          <p style={{ margin: 0, fontSize: 12.5, color: "#C7302F" }}>
            {completeOnboarding.error.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={completeOnboarding.isPending}
          style={{
            height: 38,
            border: 0,
            borderRadius: 6,
            background: "#FFC935",
            color: "#17170F",
            fontFamily: "inherit",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: completeOnboarding.isPending ? "default" : "pointer",
            opacity: completeOnboarding.isPending ? 0.7 : 1,
          }}
        >
          {completeOnboarding.isPending ? "Creating your venue…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
