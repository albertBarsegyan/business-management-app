"use client";

import { useState } from "react";
import {
  useCreateSitePageMutation,
  useDeleteSitePageMutation,
  useUpdateSitePageMutation,
} from "@/shared/api/site/queries";
import type { SitePage } from "@/shared/api/site/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function PageSidebar({
  pages,
  activePageId,
  onSelect,
}: {
  pages: SitePage[];
  activePageId: string | null;
  onSelect: (pageId: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const createPage = useCreateSitePageMutation();
  const updatePage = useUpdateSitePageMutation();
  const deletePage = useDeleteSitePageMutation();

  function handleCreate() {
    const title = newTitle.trim();
    if (!title) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    createPage.mutate(
      { slug: slug || `page-${Date.now()}`, title, pageType: "standard" },
      {
        onSuccess: (page) => {
          setNewTitle("");
          setCreating(false);
          onSelect(page.id);
        },
      },
    );
  }

  return (
    <div className="flex w-56 flex-col gap-2 border-r border-border p-3">
      {pages.map((page) => (
        <div key={page.id} className="group flex items-center gap-1">
          <button
            type="button"
            onClick={() => onSelect(page.id)}
            className="flex-1 truncate rounded-md px-2 py-1.5 text-left text-sm"
            style={{
              background:
                page.id === activePageId ? "var(--muted)" : "transparent",
              fontWeight: page.id === activePageId ? 600 : 400,
            }}
          >
            {page.title}
            {page.isHome && (
              <span className="ml-1.5 text-xs text-muted-foreground">
                (home)
              </span>
            )}
          </button>
          {!page.isHome && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => {
                if (page.id === activePageId) {
                  const remaining = pages.find((p) => p.id !== page.id);
                  if (remaining) onSelect(remaining.id);
                }
                deletePage.mutate(page.id);
              }}
            >
              ✕
            </Button>
          )}
        </div>
      ))}

      {creating ? (
        <div className="flex flex-col gap-2 pt-1">
          <Input
            autoFocus
            placeholder="Page name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") setCreating(false);
            }}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              disabled={createPage.isPending}
              onClick={handleCreate}
            >
              Add
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setCreating(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setCreating(true)}
        >
          + New page
        </Button>
      )}

      {activePageId && (
        <RenamePage
          key={activePageId}
          page={pages.find((p) => p.id === activePageId) ?? null}
          onRename={(title) =>
            activePageId &&
            updatePage.mutate({ pageId: activePageId, body: { title } })
          }
        />
      )}
    </div>
  );
}

function RenamePage({
  page,
  onRename,
}: {
  page: SitePage | null;
  onRename: (title: string) => void;
}) {
  const [title, setTitle] = useState(page?.title ?? "");
  if (!page) return null;
  return (
    <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3">
      <span className="text-xs font-medium text-muted-foreground">
        Rename page
      </span>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => title.trim() && onRename(title.trim())}
      />
    </div>
  );
}
