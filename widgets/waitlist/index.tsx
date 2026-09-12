"use client";

import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { PageHeader, PageShell } from "@/widgets/day-calendar";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import { catalogKeys, useServicesQuery } from "@/shared/api/catalog/queries";
import type { ServiceVariant } from "@/shared/api/catalog/types";
import { useClientsQuery } from "@/shared/api/clients/queries";
import {
  useCreateWaitlistEntryMutation,
  useWaitlistEntriesQuery,
} from "@/shared/api/scheduling/queries";
import type { CreateWaitlistEntryRequest } from "@/shared/api/scheduling/types";

const inputStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  border: "1px solid #D5D9DE",
  borderRadius: 6,
  fontFamily: "inherit",
  fontSize: 13,
};

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function WaitlistScreen() {
  const entriesQuery = useWaitlistEntriesQuery();
  const clientsQuery = useClientsQuery();
  const servicesQuery = useServicesQuery();
  const createEntry = useCreateWaitlistEntryMutation();

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
  const variantOptions = useMemo(() => {
    const options: { id: string; label: string }[] = [];
    activeServices.forEach((service, i) => {
      (variantQueries[i]?.data ?? [])
        .filter((v) => v.status === "active")
        .forEach((v) => {
          options.push({
            id: v.id,
            label: v.name ? `${service.name} — ${v.name}` : service.name,
          });
        });
    });
    return options;
  }, [activeServices, variantQueries]);

  const clientNameById = new Map(
    (clientsQuery.data ?? []).map((c) => [c.id, c.displayName]),
  );
  const variantLabelById = new Map(variantOptions.map((v) => [v.id, v.label]));

  const [clientId, setClientId] = useState("");
  const [serviceVariantId, setServiceVariantId] = useState("");
  const [earliestAt, setEarliestAt] = useState(() =>
    toLocalInputValue(new Date()),
  );
  const [latestAt, setLatestAt] = useState(() =>
    toLocalInputValue(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
  );

  const selectedClientId = clientId || (clientsQuery.data ?? [])[0]?.id || "";
  const selectedVariantId = serviceVariantId || variantOptions[0]?.id || "";

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedClientId || !selectedVariantId) return;
    const body: CreateWaitlistEntryRequest = {
      clientId: selectedClientId,
      serviceVariantId: selectedVariantId,
      earliestAt: new Date(earliestAt).toISOString(),
      latestAt: new Date(latestAt).toISOString(),
    };
    createEntry.mutate(body);
  }

  return (
    <PageShell>
      <PageHeader
        title="Waitlist"
        subtitle="Clients waiting for a slot that isn't available yet."
      />

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {entriesQuery.isPending ? (
          <p style={{ margin: 0, fontSize: 13, color: "#8A9099" }}>Loading…</p>
        ) : entriesQuery.isError ? (
          <p style={{ margin: 0, fontSize: 13, color: "#C7302F" }}>
            {entriesQuery.error.message}
          </p>
        ) : entriesQuery.data.length === 0 ? (
          <p style={{ margin: 0, fontSize: 13, color: "#8A9099" }}>
            No one is on the waitlist right now.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {entriesQuery.data.map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: "10px 12px",
                  border: "1px solid #EEF0F2",
                  borderRadius: 6,
                  fontSize: 13,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>
                    {clientNameById.get(entry.clientId) ?? "Unknown client"}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#8A9099",
                      textTransform: "capitalize",
                    }}
                  >
                    {entry.status}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#5B6069" }}>
                  {variantLabelById.get(entry.serviceVariantId) ??
                    "Unknown service"}
                </span>
                <span style={{ fontSize: 11, color: "#8A9099" }}>
                  {new Date(entry.earliestAt).toLocaleString()} –{" "}
                  {new Date(entry.latestAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E6E8EB",
          borderRadius: 8,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-zhamo-mono)",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A9099",
          }}
        >
          Add to waitlist
        </span>
        <form
          onSubmit={handleAdd}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <select
              value={selectedClientId}
              onChange={(event) => setClientId(event.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {(clientsQuery.data ?? []).length === 0 ? (
                <option value="">No clients yet</option>
              ) : (
                clientsQuery.data!.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.displayName}
                  </option>
                ))
              )}
            </select>
            <select
              value={selectedVariantId}
              onChange={(event) => setServiceVariantId(event.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {variantOptions.length === 0 ? (
                <option value="">No services yet</option>
              ) : (
                variantOptions.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))
              )}
            </select>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#8A9099" }}>Earliest</span>
              <input
                type="datetime-local"
                value={earliestAt}
                onChange={(event) => setEarliestAt(event.target.value)}
                style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#8A9099" }}>Latest</span>
              <input
                type="datetime-local"
                value={latestAt}
                onChange={(event) => setLatestAt(event.target.value)}
                style={{ ...inputStyle, fontFamily: "var(--font-zhamo-mono)" }}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={
              createEntry.isPending || !selectedClientId || !selectedVariantId
            }
            style={{
              alignSelf: "flex-start",
              height: 32,
              padding: "0 14px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {createEntry.isPending ? "Adding…" : "Add to waitlist"}
          </button>
        </form>
        {createEntry.isError ? (
          <p style={{ margin: 0, fontSize: 12, color: "#C7302F" }}>
            {createEntry.error.message}
          </p>
        ) : null}
      </div>
    </PageShell>
  );
}
