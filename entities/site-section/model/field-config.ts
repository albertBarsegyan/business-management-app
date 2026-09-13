/**
 * Declarative per-field UI hints for a template's variables form (Phase 5:
 * "auto-built from each template's zod schema with RHF, supporting text,
 * rich/long text, image upload, link, color, and enum fields"). Each
 * template's `schema.ts` exports both the zod schema (validation/typing,
 * the source of truth) and this array (which widget renders each field) —
 * `widgets/landing-builder`'s `SchemaForm` is the one generic renderer
 * every template shares, driven entirely by this list.
 */
export type FieldKind =
  | "text"
  | "longtext"
  | "image"
  | "link"
  | "color"
  | "boolean"
  | "number"
  | "enum"
  | "list";

export interface FieldConfig {
  name: string;
  label: string;
  kind: FieldKind;
  /** For kind "enum". */
  options?: { value: string; label: string }[];
  /** For kind "list": the item shape's own fields, rendered repeated. */
  itemFields?: FieldConfig[];
}
