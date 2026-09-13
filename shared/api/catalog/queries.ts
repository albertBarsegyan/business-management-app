"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  CreateServiceCategoryRequest,
  CreateServiceRequest,
  CreateServiceStepRequest,
  CreateServiceVariantRequest,
  Service,
  ServiceCategory,
  ServiceLocationSetting,
  ServiceStatus,
  ServiceStep,
  ServiceVariant,
  TeamServiceAssignment,
  UpdateServiceStatusRequest,
  UpsertServiceLocationSettingRequest,
  UpsertTeamServiceAssignmentRequest,
} from "./types";

export const catalogKeys = {
  categories: ["service-categories"] as const,
  services: ["services"] as const,
  variants: (serviceId: string) => ["services", serviceId, "variants"] as const,
  teamAssignments: (variantId: string) =>
    ["service-variants", variantId, "team-assignments"] as const,
  steps: (variantId: string) =>
    ["service-variants", variantId, "steps"] as const,
  locationSettings: (variantId: string) =>
    ["service-variants", variantId, "location-settings"] as const,
};

export function useServiceCategoriesQuery() {
  return useQuery({
    queryKey: catalogKeys.categories,
    queryFn: () =>
      unwrap<ServiceCategory[]>(apiClient.get("service-categories")),
  });
}

export function useCreateServiceCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateServiceCategoryRequest) =>
      unwrap<ServiceCategory>(
        apiClient.post("service-categories", { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.categories });
    },
  });
}

export function useServicesQuery() {
  return useQuery({
    queryKey: catalogKeys.services,
    queryFn: () => unwrap<Service[]>(apiClient.get("services")),
  });
}

export function useServiceVariantsQuery(serviceId: string) {
  return useQuery({
    queryKey: catalogKeys.variants(serviceId),
    queryFn: () =>
      unwrap<ServiceVariant[]>(apiClient.get(`services/${serviceId}/variants`)),
  });
}

interface CreateServiceInput {
  service: CreateServiceRequest;
  variant: CreateServiceVariantRequest;
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ service, variant }: CreateServiceInput) => {
      const createdService = await unwrap<Service>(
        apiClient.post("services", { json: service }),
      );
      const createdVariant = await unwrap<ServiceVariant>(
        apiClient.post(`services/${createdService.id}/variants`, {
          json: variant,
        }),
      );
      return { service: createdService, variant: createdVariant };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.services });
    },
  });
}

export function useUpdateServiceStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      serviceId,
      status,
    }: {
      serviceId: string;
      status: ServiceStatus;
    }) =>
      unwrap<Service>(
        apiClient.patch(`services/${serviceId}/status`, {
          json: { status } satisfies UpdateServiceStatusRequest,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.services });
    },
  });
}

export function useTeamAssignmentsQuery(variantId: string) {
  return useQuery({
    queryKey: catalogKeys.teamAssignments(variantId),
    queryFn: () =>
      unwrap<TeamServiceAssignment[]>(
        apiClient.get(`service-variants/${variantId}/team-assignments`),
      ),
  });
}

export function useUpsertTeamAssignmentMutation(variantId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      teamMemberId,
      body,
    }: {
      teamMemberId: string;
      body: UpsertTeamServiceAssignmentRequest;
    }) =>
      unwrap<TeamServiceAssignment>(
        apiClient.put(
          `service-variants/${variantId}/team-assignments/${teamMemberId}`,
          { json: body },
        ),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: catalogKeys.teamAssignments(variantId),
      });
    },
  });
}

export function useServiceStepsQuery(variantId: string) {
  return useQuery({
    queryKey: catalogKeys.steps(variantId),
    queryFn: () =>
      unwrap<ServiceStep[]>(
        apiClient.get(`service-variants/${variantId}/steps`),
      ),
  });
}

export function useCreateServiceStepMutation(variantId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<CreateServiceStepRequest, "position">) => {
      const existingSteps = queryClient.getQueryData<ServiceStep[]>(
        catalogKeys.steps(variantId),
      );
      return unwrap<ServiceStep>(
        apiClient.post(`service-variants/${variantId}/steps`, {
          json: {
            ...body,
            position: existingSteps?.length ?? 0,
          } satisfies CreateServiceStepRequest,
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogKeys.steps(variantId) });
    },
  });
}

export function useLocationSettingsQuery(variantId: string) {
  return useQuery({
    queryKey: catalogKeys.locationSettings(variantId),
    queryFn: () =>
      unwrap<ServiceLocationSetting[]>(
        apiClient.get(`service-variants/${variantId}/location-settings`),
      ),
  });
}

export function useUpsertLocationSettingMutation(variantId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      locationId,
      body,
    }: {
      locationId: string;
      body: UpsertServiceLocationSettingRequest;
    }) =>
      unwrap<ServiceLocationSetting>(
        apiClient.put(
          `service-variants/${variantId}/location-settings/${locationId}`,
          { json: body },
        ),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: catalogKeys.locationSettings(variantId),
      });
    },
  });
}
