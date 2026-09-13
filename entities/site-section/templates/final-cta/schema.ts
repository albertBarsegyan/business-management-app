import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const finalCtaSchema = z.object({
  heading: z.string().min(1).max(80),
  ctaLabel: z.string().min(1).max(40),
});

export type FinalCtaVariables = z.infer<typeof finalCtaSchema>;

export const finalCtaFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  { name: "ctaLabel", label: "Button text", kind: "text" },
];
