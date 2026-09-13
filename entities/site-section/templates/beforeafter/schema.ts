import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const beforeAfterPairSchema = z.object({
  beforeAssetId: z.string().nullable(),
  afterAssetId: z.string().nullable(),
});

export const beforeAfterSchema = z.object({
  heading: z.string().min(1).max(80),
  pairs: z.array(beforeAfterPairSchema).max(8),
});

export type BeforeAfterVariables = z.infer<typeof beforeAfterSchema>;

export const beforeAfterFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "pairs",
    label: "Before / after pairs",
    kind: "list",
    itemFields: [
      { name: "beforeAssetId", label: "Before photo", kind: "image" },
      { name: "afterAssetId", label: "After photo", kind: "image" },
    ],
  },
];
