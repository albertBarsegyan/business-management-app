"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { ApiError, unwrap } from "@/shared/api/http";
import type {
  AssetUploadResponse,
  CreateSitePageRequest,
  CreateSiteRequest,
  CreateSiteSectionRequest,
  PublishSiteResult,
  ReorderSectionsRequest,
  Site,
  SitePage,
  SiteRevision,
  SiteSection,
  UpdateSitePageRequest,
  UpdateSiteRevisionRequest,
  UpdateSiteSectionRequest,
} from "./types";

export const siteKeys = {
  site: ["site"] as const,
  draft: ["site", "draft"] as const,
  pages: ["site", "pages"] as const,
  sections: (pageId: string) => ["site", "pages", pageId, "sections"] as const,
};

/** 404 means the venue has no site yet — that's a normal, expected state
 * (a fresh venue before its first save), not a query failure. */
export function useSiteQuery() {
  return useQuery({
    queryKey: siteKeys.site,
    queryFn: async () => {
      try {
        return await unwrap<Site>(apiClient.get("site"));
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
  });
}

export function useCreateSiteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSiteRequest) =>
      unwrap<Site>(apiClient.post("site", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.site });
      queryClient.invalidateQueries({ queryKey: siteKeys.draft });
      queryClient.invalidateQueries({ queryKey: siteKeys.pages });
    },
  });
}

export function useSiteDraftQuery(enabled = true) {
  return useQuery({
    queryKey: siteKeys.draft,
    queryFn: () => unwrap<SiteRevision>(apiClient.get("site/draft")),
    enabled,
  });
}

export function usePublishSiteMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => unwrap<PublishSiteResult>(apiClient.post("site/publish")),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.site });
      queryClient.invalidateQueries({ queryKey: siteKeys.draft });
      queryClient.invalidateQueries({ queryKey: siteKeys.pages });
    },
  });
}

export function useSitePagesQuery(enabled = true) {
  return useQuery({
    queryKey: siteKeys.pages,
    queryFn: () => unwrap<SitePage[]>(apiClient.get("site/pages")),
    enabled,
  });
}

export function useCreateSitePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSitePageRequest) =>
      unwrap<SitePage>(apiClient.post("site/pages", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.pages });
    },
  });
}

export function useUpdateSitePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      pageId,
      body,
    }: {
      pageId: string;
      body: UpdateSitePageRequest;
    }) =>
      unwrap<SitePage>(apiClient.patch(`site/pages/${pageId}`, { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.pages });
    },
  });
}

export function useDeleteSitePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pageId: string) =>
      unwrap<void>(apiClient.delete(`site/pages/${pageId}`)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.pages });
    },
  });
}

export function useUpdateDraftRevisionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateSiteRevisionRequest) =>
      unwrap<SiteRevision>(apiClient.patch("site/draft", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.draft });
    },
  });
}

export function useUploadSiteImageMutation() {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.set("file", file);
      return unwrap<AssetUploadResponse>(
        apiClient.post("site/images", { body: formData }),
      );
    },
  });
}

export function useSiteSectionsQuery(pageId: string | null) {
  return useQuery({
    queryKey: siteKeys.sections(pageId ?? ""),
    queryFn: () =>
      unwrap<SiteSection[]>(apiClient.get(`site/pages/${pageId}/sections`)),
    enabled: Boolean(pageId),
  });
}

export function useCreateSiteSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSiteSectionRequest) =>
      unwrap<SiteSection>(
        apiClient.post(`site/pages/${pageId}/sections`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.sections(pageId) });
    },
  });
}

export function useUpdateSiteSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      sectionId,
      body,
    }: {
      sectionId: string;
      body: UpdateSiteSectionRequest;
    }) =>
      unwrap<SiteSection>(
        apiClient.patch(`site/pages/${pageId}/sections/${sectionId}`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.sections(pageId) });
    },
  });
}

export function useDeleteSiteSectionMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sectionId: string) =>
      unwrap<void>(
        apiClient.delete(`site/pages/${pageId}/sections/${sectionId}`),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.sections(pageId) });
    },
  });
}

export function useReorderSectionsMutation(pageId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReorderSectionsRequest) =>
      unwrap<SiteSection[]>(
        apiClient.patch(`site/pages/${pageId}/sections/reorder`, {
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: siteKeys.sections(pageId) });
    },
  });
}
