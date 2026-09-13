import type { z } from "zod";
import type { FieldConfig } from "./field-config";
import type { TemplateContext } from "./template-context";

export interface TemplateMeta {
  templateKey: string;
  name: string;
  category: "hero" | "content" | "cta";
  thumbnail: string;
  schemaVersion: number;
}

export interface SiteSectionTemplate<V = Record<string, unknown>> {
  meta: TemplateMeta;
  schema: z.ZodType<V>;
  fields: FieldConfig[];
  defaults: V;
  /** Pure render from (variables, context) — no data fetching (Phase 5 doc). */
  Component: (props: {
    variables: V;
    context: TemplateContext;
  }) => React.ReactElement;
}
