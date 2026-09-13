import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const servicesSchema = z.object({
  heading: z.string().min(1).max(80),
  layout: z.enum(["list", "cards", "table"]),
  showPrices: z.boolean(),
});

export type ServicesVariables = z.infer<typeof servicesSchema>;

export const servicesFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "layout",
    label: "Layout",
    kind: "enum",
    options: [
      { value: "list", label: "List" },
      { value: "cards", label: "Cards" },
      { value: "table", label: "Table" },
    ],
  },
  { name: "showPrices", label: "Show prices", kind: "boolean" },
];
