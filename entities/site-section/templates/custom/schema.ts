import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const customSchema = z.object({
  heading: z.string().min(1).max(80),
  body: z.string().max(1200),
  imageAssetId: z.string().nullable(),
  ctaLabel: z.string().max(40),
  ctaUrl: z.string().max(300),
});

export type CustomVariables = z.infer<typeof customSchema>;

export const customFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  { name: "body", label: "Body", kind: "longtext" },
  { name: "imageAssetId", label: "Image", kind: "image" },
  { name: "ctaLabel", label: "Button text", kind: "text" },
  { name: "ctaUrl", label: "Button link", kind: "link" },
];
