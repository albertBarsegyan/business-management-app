"use client";

import { useState } from "react";
import { TEMPLATE_KEYS, getTemplate } from "@/entities/site-section/templates";
import { parseVariables } from "@/entities/site-section/model/parse-variables";
import { useDebouncedCallback } from "@/shared/lib/use-debounced-callback";
import {
  useCreateSiteSectionMutation,
  useDeleteSiteSectionMutation,
  useReorderSectionsMutation,
  useUpdateSiteSectionMutation,
} from "@/shared/api/site/queries";
import {
  SITE_SECTION_TYPES,
  type SiteSection,
  type SiteSectionType,
} from "@/shared/api/site/types";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SchemaForm } from "./schema-form";

/** `sectionType` stays a coarse category (D4); most template keys map
 * directly onto one of its 9 values, everything else is "custom". */
function toSectionType(templateKey: string): SiteSectionType {
  return (SITE_SECTION_TYPES as readonly string[]).includes(templateKey)
    ? (templateKey as SiteSectionType)
    : "custom";
}

const AUTOSAVE_DELAY_MS = 800;

export function SectionPanel({
  pageId,
  sections,
}: {
  pageId: string;
  sections: SiteSection[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    sections[0]?.id ?? null,
  );
  const [pickerKey, setPickerKey] = useState("");
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const createSection = useCreateSiteSectionMutation(pageId);
  const updateSection = useUpdateSiteSectionMutation(pageId);
  const deleteSection = useDeleteSiteSectionMutation(pageId);
  const reorderSections = useReorderSectionsMutation(pageId);

  const selected = sections.find((s) => s.id === selectedId) ?? null;
  const selectedTemplate = selected?.templateKey
    ? getTemplate(selected.templateKey)
    : undefined;

  const debouncedSave = useDebouncedCallback(
    (sectionId: string, propsJson: Record<string, unknown>) => {
      setSaveState("saving");
      updateSection.mutate(
        { sectionId, body: { propsJson } },
        {
          onSuccess: () => setSaveState("saved"),
          onError: () => setSaveState("error"),
        },
      );
    },
    AUTOSAVE_DELAY_MS,
  );

  function handleAdd() {
    const template = getTemplate(pickerKey);
    if (!template) return;
    createSection.mutate(
      {
        sectionType: toSectionType(template.meta.templateKey),
        templateKey: template.meta.templateKey,
        propsJson: template.defaults,
        position: sections.length,
      },
      { onSuccess: (section) => setSelectedId(section.id) },
    );
    setPickerKey("");
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= sections.length) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(target, 0, moved!);
    reorderSections.mutate({
      sections: reordered.map((s, i) => ({ id: s.id, position: i })),
    });
  }

  return (
    <div className="flex w-72 flex-col gap-3 border-r border-border p-3">
      <div className="flex flex-col gap-1.5">
        {sections.map((section, index) => (
          <div key={section.id} className="group flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSelectedId(section.id)}
              className="flex-1 truncate rounded-md px-2 py-1.5 text-left text-sm"
              style={{
                background:
                  section.id === selectedId ? "var(--muted)" : "transparent",
                fontWeight: section.id === selectedId ? 600 : 400,
                opacity: section.enabled ? 1 : 0.5,
              }}
            >
              {getTemplate(section.templateKey ?? "")?.meta.name ??
                section.templateKey ??
                "Unknown template"}
            </button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={index === 0}
              onClick={() => move(index, -1)}
            >
              ↑
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={index === sections.length - 1}
              onClick={() => move(index, 1)}
            >
              ↓
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => {
                if (section.id === selectedId) setSelectedId(null);
                deleteSection.mutate(section.id);
              }}
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-t border-border pt-3">
        <Select value={pickerKey} onValueChange={setPickerKey}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Add a section…" />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATE_KEYS.map((key) => (
              <SelectItem key={key} value={key}>
                {getTemplate(key)?.meta.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          size="sm"
          disabled={!pickerKey}
          onClick={handleAdd}
        >
          Add
        </Button>
      </div>

      {selected && selectedTemplate && (
        <div className="flex flex-col gap-3 border-t border-border pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedTemplate.meta.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {saveState === "saving"
                ? "Saving…"
                : saveState === "saved"
                  ? "Saved"
                  : saveState === "error"
                    ? "Couldn't save"
                    : ""}
            </span>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={selected.enabled}
              onChange={(e) =>
                updateSection.mutate({
                  sectionId: selected.id,
                  body: { enabled: e.target.checked },
                })
              }
            />
            Visible on published site
          </label>
          <SchemaForm
            fields={selectedTemplate.fields}
            value={
              parseVariables(selected.templateKey, selected.propsJson).variables
            }
            onChange={(next) => debouncedSave(selected.id, next)}
          />
        </div>
      )}
    </div>
  );
}
