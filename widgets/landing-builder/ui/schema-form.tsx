"use client";

import { useRef } from "react";
import type { FieldConfig } from "@/entities/site-section/model/field-config";
import { useUploadSiteImageMutation } from "@/shared/api/site/queries";
import { Button } from "@/shared/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";

/**
 * The one generic renderer every template's variables form shares — driven
 * entirely by the template's own `fields: FieldConfig[]` (Phase 5: "auto-
 * built from each template's zod schema"). Plain controlled state rather
 * than react-hook-form: a fully generic renderer over a variable, runtime-
 * determined shape (including nested arrays-of-objects for "list" fields)
 * doesn't fit RHF's statically-registered-field model without real
 * per-template glue code, which defeats the point of a single shared
 * renderer — `zod` validation still runs (`schema.safeParse`) before a
 * save, in the parent that owns this form.
 */
export function SchemaForm({
  fields,
  value,
  onChange,
}: {
  fields: FieldConfig[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  function setField(name: string, fieldValue: unknown) {
    onChange({ ...value, [name]: fieldValue });
  }

  return (
    <FieldGroup>
      {fields.map((field) => (
        <FieldRenderer
          key={field.name}
          field={field}
          value={value[field.name]}
          onChange={(v) => setField(field.name, v)}
        />
      ))}
    </FieldGroup>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  switch (field.kind) {
    case "text":
    case "link":
      return (
        <Field>
          <FieldLabel>{field.label}</FieldLabel>
          <Input
            type={field.kind === "link" ? "url" : "text"}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </Field>
      );
    case "longtext":
      return (
        <Field>
          <FieldLabel>{field.label}</FieldLabel>
          <Textarea
            rows={4}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </Field>
      );
    case "number":
      return (
        <Field>
          <FieldLabel>{field.label}</FieldLabel>
          <Input
            type="number"
            value={typeof value === "number" ? value : 0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </Field>
      );
    case "boolean":
      return (
        <Field
          orientation="horizontal"
          className="flex items-center justify-between"
        >
          <FieldLabel>{field.label}</FieldLabel>
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked)}
          />
        </Field>
      );
    case "color":
      return (
        <Field>
          <FieldLabel>{field.label}</FieldLabel>
          <Input
            type="color"
            value={typeof value === "string" ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-16 p-1"
          />
        </Field>
      );
    case "enum":
      return (
        <Field>
          <FieldLabel>{field.label}</FieldLabel>
          <Select
            value={typeof value === "string" ? value : undefined}
            onValueChange={(v) => onChange(v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      );
    case "image":
      return (
        <ImageField
          label={field.label}
          assetId={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      );
    case "list":
      return (
        <ListField
          field={field}
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
}

function ImageField({
  label,
  assetId,
  onChange,
}: {
  label: string;
  assetId: string | null;
  onChange: (assetId: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadSiteImageMutation();

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          upload.mutate(file, {
            onSuccess: (result) => onChange(result.assetId),
          });
          e.target.value = "";
        }}
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
        >
          {upload.isPending ? "Uploading…" : assetId ? "Replace" : "Upload"}
        </Button>
        {assetId && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
          >
            Remove
          </Button>
        )}
      </div>
    </Field>
  );
}

function ListField({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: Record<string, unknown>[];
  onChange: (next: Record<string, unknown>[]) => void;
}) {
  const itemFields = field.itemFields ?? [];

  function updateItem(index: number, next: Record<string, unknown>) {
    onChange(value.map((item, i) => (i === index ? next : item)));
  }
  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }
  function addItem() {
    const blank: Record<string, unknown> = {};
    for (const f of itemFields) {
      blank[f.name] =
        f.kind === "list"
          ? []
          : f.kind === "boolean"
            ? false
            : f.kind === "number"
              ? 0
              : null;
    }
    onChange([...value, blank]);
  }

  return (
    <Field>
      <FieldLabel>{field.label}</FieldLabel>
      <div className="flex flex-col gap-3">
        {value.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-lg border border-border p-3"
          >
            <SchemaForm
              fields={itemFields}
              value={item}
              onChange={(next) => updateItem(index, next)}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={() => removeItem(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={addItem}
        >
          Add {field.label.replace(/s$/, "")}
        </Button>
      </div>
    </Field>
  );
}
