"use client";

import { useQueries } from "@tanstack/react-query";
import {
  DataTable,
  type DataTableColumn,
  Toggle,
} from "@/widgets/day-calendar";
import { apiClient } from "@/shared/api/client";
import {
  catalogKeys,
  useUpdateServiceStatusMutation,
} from "@/shared/api/catalog/queries";
import type {
  Service,
  ServiceCategory,
  ServiceStatus,
  ServiceVariant,
} from "@/shared/api/catalog/types";
import { unwrap } from "@/shared/api/http";
import type { LocationSettingsPanelTarget } from "./location-settings-panel";
import type { StaffPanelTarget } from "./staff-assignments-panel";
import type { StepsPanelTarget } from "./service-steps-panel";

const STATUS_OPTIONS: ServiceStatus[] = ["draft", "active", "archived"];

const STATUS_PILL: Record<ServiceStatus, { bg: string; color: string }> = {
  draft: { bg: "#F1F2F4", color: "#5B6069" },
  active: { bg: "rgba(30,142,90,0.12)", color: "#1E8E5A" },
  archived: { bg: "#FCEAEA", color: "#C7302F" },
};

function formatPrice(variant: ServiceVariant | undefined) {
  if (!variant) return "—";
  const major = Number(variant.priceMinor) / 100;
  return `${major.toLocaleString()} ${variant.currencyCode}`;
}

function formatDuration(variant: ServiceVariant | undefined) {
  if (!variant) return "—";
  const hours = Math.floor(variant.durationMinutes / 60);
  const minutes = variant.durationMinutes % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

export function ServiceTable({
  services,
  categories,
  onManageStaff,
  onManageSteps,
  onManageLocations,
}: {
  services: Service[];
  categories: ServiceCategory[];
  onManageStaff: (target: StaffPanelTarget) => void;
  onManageSteps: (target: StepsPanelTarget) => void;
  onManageLocations: (target: LocationSettingsPanelTarget) => void;
}) {
  const variantQueries = useQueries({
    queries: services.map((service) => ({
      queryKey: catalogKeys.variants(service.id),
      queryFn: () =>
        unwrap<ServiceVariant[]>(
          apiClient.get(`services/${service.id}/variants`),
        ),
    })),
  });
  const updateStatus = useUpdateServiceStatusMutation();

  const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));
  const primaryVariantByServiceId = new Map(
    services.map((service, index) => [
      service.id,
      variantQueries[index].data?.[0],
    ]),
  );

  const columns: DataTableColumn<Service>[] = [
    {
      label: "Service",
      render: (row) => <span style={{ fontWeight: 600 }}>{row.name}</span>,
      width: "1.6fr",
    },
    {
      label: "Category",
      render: (row) =>
        row.categoryId ? (categoryNameById.get(row.categoryId) ?? "—") : "—",
      width: "0.9fr",
    },
    {
      label: "Duration",
      render: (row) => formatDuration(primaryVariantByServiceId.get(row.id)),
      width: "1fr",
    },
    {
      label: "Price",
      render: (row) => formatPrice(primaryVariantByServiceId.get(row.id)),
      align: "right",
      width: "1fr",
    },
    {
      label: "Status",
      render: (row) => (
        <select
          value={row.status}
          disabled={updateStatus.isPending}
          onChange={(event) =>
            updateStatus.mutate({
              serviceId: row.id,
              status: event.target.value as ServiceStatus,
            })
          }
          style={{
            height: 24,
            padding: "0 6px",
            borderRadius: 6,
            border: "1px solid transparent",
            background: STATUS_PILL[row.status].bg,
            color: STATUS_PILL[row.status].color,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      ),
      width: "1fr",
    },
    {
      label: "Online booking",
      render: (row) => <Toggle on={row.onlineBookable} />,
      width: "1fr",
    },
    {
      label: "Staff",
      render: (row) => {
        const variant = primaryVariantByServiceId.get(row.id);
        return (
          <button
            type="button"
            disabled={!variant}
            onClick={() =>
              variant &&
              onManageStaff({
                serviceId: row.id,
                serviceName: row.name,
                variantId: variant.id,
              })
            }
            style={{
              height: 26,
              padding: "0 10px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: variant ? "pointer" : "default",
              opacity: variant ? 1 : 0.5,
            }}
          >
            Manage
          </button>
        );
      },
      width: "0.8fr",
    },
    {
      label: "Steps",
      render: (row) => {
        const variant = primaryVariantByServiceId.get(row.id);
        return (
          <button
            type="button"
            disabled={!variant}
            onClick={() =>
              variant &&
              onManageSteps({
                serviceId: row.id,
                serviceName: row.name,
                variantId: variant.id,
                variantDurationMinutes: variant.durationMinutes,
              })
            }
            style={{
              height: 26,
              padding: "0 10px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: variant ? "pointer" : "default",
              opacity: variant ? 1 : 0.5,
            }}
          >
            Manage
          </button>
        );
      },
      width: "0.8fr",
    },
    {
      label: "Locations",
      render: (row) => {
        const variant = primaryVariantByServiceId.get(row.id);
        return (
          <button
            type="button"
            disabled={!variant}
            onClick={() =>
              variant &&
              onManageLocations({
                serviceId: row.id,
                serviceName: row.name,
                variantId: variant.id,
              })
            }
            style={{
              height: 26,
              padding: "0 10px",
              border: "1px solid #D5D9DE",
              borderRadius: 6,
              background: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: variant ? "pointer" : "default",
              opacity: variant ? 1 : 0.5,
            }}
          >
            Manage
          </button>
        );
      },
      width: "0.9fr",
    },
  ];

  return (
    <DataTable<Service>
      rowKey={(row) => row.id}
      columns={columns}
      rows={services}
    />
  );
}
