"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type {
  AssignClientTagRequest,
  Client,
  ClientAddress,
  ClientConsent,
  ClientContact,
  ClientNote,
  CreateClientAddressRequest,
  CreateClientConsentRequest,
  CreateClientContactRequest,
  CreateClientNoteRequest,
  CreateClientRequest,
  CreateTagRequest,
  Tag,
  UpdateClientRequest,
} from "./types";

export const clientKeys = {
  all: ["clients"] as const,
  detail: (clientId: string) => ["clients", clientId] as const,
  contacts: (clientId: string) => ["clients", clientId, "contacts"] as const,
  notes: (clientId: string) => ["clients", clientId, "notes"] as const,
  addresses: (clientId: string) => ["clients", clientId, "addresses"] as const,
  consents: (clientId: string) => ["clients", clientId, "consents"] as const,
  tags: (clientId: string) => ["clients", clientId, "tags"] as const,
  allTags: ["tags"] as const,
};

export function useClientsQuery() {
  return useQuery({
    queryKey: clientKeys.all,
    queryFn: () => unwrap<Client[]>(apiClient.get("clients")),
  });
}

export function useUpdateClientMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateClientRequest) =>
      unwrap<Client>(apiClient.patch(`clients/${clientId}`, { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(clientId) });
    },
  });
}

export function useClientContactsQuery(clientId: string) {
  return useQuery({
    queryKey: clientKeys.contacts(clientId),
    queryFn: () =>
      unwrap<ClientContact[]>(apiClient.get(`clients/${clientId}/contacts`)),
  });
}

export function useClientNotesQuery(clientId: string) {
  return useQuery({
    queryKey: clientKeys.notes(clientId),
    queryFn: () =>
      unwrap<ClientNote[]>(apiClient.get(`clients/${clientId}/notes`)),
  });
}

export function useCreateClientContactMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateClientContactRequest) =>
      unwrap<ClientContact>(
        apiClient.post(`clients/${clientId}/contacts`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientKeys.contacts(clientId),
      });
    },
  });
}

export function useCreateClientNoteMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateClientNoteRequest) =>
      unwrap<ClientNote>(
        apiClient.post(`clients/${clientId}/notes`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.notes(clientId) });
    },
  });
}

export function useClientAddressesQuery(clientId: string) {
  return useQuery({
    queryKey: clientKeys.addresses(clientId),
    queryFn: () =>
      unwrap<ClientAddress[]>(apiClient.get(`clients/${clientId}/addresses`)),
  });
}

export function useCreateClientAddressMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateClientAddressRequest) =>
      unwrap<ClientAddress>(
        apiClient.post(`clients/${clientId}/addresses`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientKeys.addresses(clientId),
      });
    },
  });
}

export function useClientConsentsQuery(clientId: string) {
  return useQuery({
    queryKey: clientKeys.consents(clientId),
    queryFn: () =>
      unwrap<ClientConsent[]>(apiClient.get(`clients/${clientId}/consents`)),
  });
}

export function useCreateClientConsentMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateClientConsentRequest) =>
      unwrap<ClientConsent>(
        apiClient.post(`clients/${clientId}/consents`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientKeys.consents(clientId),
      });
    },
  });
}

export function useClientTagsQuery(clientId: string) {
  return useQuery({
    queryKey: clientKeys.tags(clientId),
    queryFn: () => unwrap<Tag[]>(apiClient.get(`clients/${clientId}/tags`)),
  });
}

export function useAssignClientTagMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AssignClientTagRequest) =>
      unwrap<void>(apiClient.post(`clients/${clientId}/tags`, { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.tags(clientId) });
    },
  });
}

export function useUnassignClientTagMutation(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tagId: string) =>
      unwrap<void>(apiClient.delete(`clients/${clientId}/tags/${tagId}`)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.tags(clientId) });
    },
  });
}

export function useTagsQuery() {
  return useQuery({
    queryKey: clientKeys.allTags,
    queryFn: () => unwrap<Tag[]>(apiClient.get("tags")),
  });
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateTagRequest) =>
      unwrap<Tag>(apiClient.post("tags", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.allTags });
    },
  });
}

interface CreateClientInput {
  client: CreateClientRequest;
  phone: string;
  email?: string;
  note?: string;
}

export function useCreateClientMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ client, phone, email, note }: CreateClientInput) => {
      const created = await unwrap<Client>(
        apiClient.post("clients", { json: client }),
      );

      const phoneContact: CreateClientContactRequest = {
        type: "phone",
        valueDisplay: phone,
        valueNormalized: phone.replace(/[^\d+]/g, ""),
        isPrimary: true,
      };
      await unwrap<ClientContact>(
        apiClient.post(`clients/${created.id}/contacts`, {
          json: phoneContact,
        }),
      );

      if (email) {
        const emailContact: CreateClientContactRequest = {
          type: "email",
          valueDisplay: email,
          valueNormalized: email.trim().toLowerCase(),
          isPrimary: true,
        };
        await unwrap<ClientContact>(
          apiClient.post(`clients/${created.id}/contacts`, {
            json: emailContact,
          }),
        );
      }

      if (note) {
        const noteBody: CreateClientNoteRequest = { body: note };
        await unwrap(
          apiClient.post(`clients/${created.id}/notes`, { json: noteBody }),
        );
      }

      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
}
