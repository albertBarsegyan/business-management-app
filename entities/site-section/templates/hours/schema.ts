import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const hoursRowSchema = z.object({
  day: z.string().min(1).max(20),
  hours: z.string().min(1).max(40),
});

export const hoursSchema = z.object({
  heading: z.string().min(1).max(80),
  rows: z.array(hoursRowSchema).max(7),
});

export type HoursVariables = z.infer<typeof hoursSchema>;

export const hoursFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "rows",
    label: "Hours",
    kind: "list",
    itemFields: [
      { name: "day", label: "Day", kind: "text" },
      { name: "hours", label: "Hours", kind: "text" },
    ],
  },
];
