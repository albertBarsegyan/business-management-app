"use client";

import { useMemo, useState } from "react";
import {
  PageHeader,
  PageHeaderButton,
  PageShell,
} from "@/widgets/day-calendar";
import {
  useServiceCategoriesQuery,
  useServicesQuery,
} from "@/shared/api/catalog/queries";
import { AddServicePanel } from "./ui/add-service-panel";
import {
  LocationSettingsPanel,
  type LocationSettingsPanelTarget,
} from "./ui/location-settings-panel";
import {
  ServiceStepsPanel,
  type StepsPanelTarget,
} from "./ui/service-steps-panel";
import { ServiceTable } from "./ui/service-table";
import {
  StaffAssignmentsPanel,
  type StaffPanelTarget,
} from "./ui/staff-assignments-panel";

const ALL_CATEGORIES = "all";

export function ServicesScreen() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const [staffTarget, setStaffTarget] = useState<StaffPanelTarget | null>(null);
  const [stepsTarget, setStepsTarget] = useState<StepsPanelTarget | null>(null);
  const [locationTarget, setLocationTarget] =
    useState<LocationSettingsPanelTarget | null>(null);
  const categoriesQuery = useServiceCategoriesQuery();
  const servicesQuery = useServicesQuery();
  const categories = categoriesQuery.data ?? [];

  const filteredServices = useMemo(() => {
    if (!servicesQuery.data) return [];
    if (categoryFilter === ALL_CATEGORIES) return servicesQuery.data;
    return servicesQuery.data.filter(
      (service) => service.categoryId === categoryFilter,
    );
  }, [servicesQuery.data, categoryFilter]);

  return (
    <PageShell>
      <PageHeader
        title="Services"
        subtitle="Manage the services your business offers, along with pricing and duration."
        action={
          <PageHeaderButton onClick={() => setPanelOpen(true)}>
            Add service
          </PageHeaderButton>
        }
      />

      {categories.length > 0 ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[{ id: ALL_CATEGORIES, name: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              style={{
                height: 30,
                padding: "0 12px",
                border: `1px solid ${categoryFilter === c.id ? "#16161A" : "#D5D9DE"}`,
                borderRadius: 6,
                background: categoryFilter === c.id ? "#16161A" : "#FFFFFF",
                color: categoryFilter === c.id ? "#FFFFFF" : "#16161A",
                fontFamily: "inherit",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      ) : null}

      {servicesQuery.isPending ? (
        <p style={{ padding: 24, color: "#8A9099", fontSize: 13.5 }}>
          Loading services…
        </p>
      ) : servicesQuery.isError ? (
        <p style={{ padding: 24, color: "#C7302F", fontSize: 13.5 }}>
          Couldn&apos;t load services: {servicesQuery.error.message}
        </p>
      ) : (
        <ServiceTable
          services={filteredServices}
          categories={categories}
          onManageStaff={setStaffTarget}
          onManageSteps={setStepsTarget}
          onManageLocations={setLocationTarget}
        />
      )}

      <AddServicePanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        categories={categories}
      />
      <LocationSettingsPanel
        target={locationTarget}
        onClose={() => setLocationTarget(null)}
      />
      <ServiceStepsPanel
        target={stepsTarget}
        onClose={() => setStepsTarget(null)}
      />
      <StaffAssignmentsPanel
        target={staffTarget}
        onClose={() => setStaffTarget(null)}
      />
    </PageShell>
  );
}
