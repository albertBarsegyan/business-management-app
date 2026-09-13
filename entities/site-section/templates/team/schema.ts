import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const teamSchema = z.object({
  heading: z.string().min(1).max(80),
  columns: z.number().int().min(2).max(4),
});

export type TeamVariables = z.infer<typeof teamSchema>;

export const teamFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  { name: "columns", label: "Columns", kind: "number" },
];
