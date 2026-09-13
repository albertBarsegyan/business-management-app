import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const aboutSchema = z.object({
  heading: z.string().min(1).max(80),
  align: z.enum(["left", "right"]),
  body: z.string().max(1200),
  imageAssetId: z.string().nullable(),
});

export type AboutVariables = z.infer<typeof aboutSchema>;

export const aboutFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "align",
    label: "Photo position",
    kind: "enum",
    options: [
      { value: "left", label: "Photo left" },
      { value: "right", label: "Photo right" },
    ],
  },
  { name: "body", label: "Body", kind: "longtext" },
  { name: "imageAssetId", label: "Photo", kind: "image" },
];
