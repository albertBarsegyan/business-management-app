import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const galleryImageSchema = z.object({ assetId: z.string() });

export const gallerySchema = z.object({
  heading: z.string().min(1).max(80),
  layout: z.enum(["grid", "strip"]),
  images: z.array(galleryImageSchema).max(24),
});

export type GalleryVariables = z.infer<typeof gallerySchema>;

export const galleryFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "layout",
    label: "Layout",
    kind: "enum",
    options: [
      { value: "grid", label: "Grid" },
      { value: "strip", label: "Strip" },
    ],
  },
  {
    name: "images",
    label: "Photos",
    kind: "list",
    itemFields: [{ name: "assetId", label: "Photo", kind: "image" }],
  },
];
