import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const heroSchema = z.object({
  layout: z.enum(["fullbleed", "split", "centered"]),
  title: z.string().min(1).max(120),
  subtitle: z.string().max(280),
  ctaLabel: z.string().min(1).max(40),
  showSecondaryCta: z.boolean(),
  coverImageAssetId: z.string().nullable(),
});

export type HeroVariables = z.infer<typeof heroSchema>;

export const heroFields: FieldConfig[] = [
  {
    name: "layout",
    label: "Layout",
    kind: "enum",
    options: [
      { value: "fullbleed", label: "Full-bleed image" },
      { value: "split", label: "Split" },
      { value: "centered", label: "Centered" },
    ],
  },
  { name: "title", label: "Title", kind: "text" },
  { name: "subtitle", label: "Subtitle", kind: "longtext" },
  { name: "ctaLabel", label: "Button text", kind: "text" },
  { name: "showSecondaryCta", label: "Show “Call us” button", kind: "boolean" },
  { name: "coverImageAssetId", label: "Cover image", kind: "image" },
];
