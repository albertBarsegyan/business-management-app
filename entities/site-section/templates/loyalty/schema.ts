import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const loyaltyPlanSchema = z.object({
  name: z.string().min(1).max(60),
  price: z.string().min(1).max(30),
  perksText: z.string().max(300),
});

export const loyaltySchema = z.object({
  heading: z.string().min(1).max(80),
  plans: z.array(loyaltyPlanSchema).max(6),
});

export type LoyaltyVariables = z.infer<typeof loyaltySchema>;

export const loyaltyFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "plans",
    label: "Plans",
    kind: "list",
    itemFields: [
      { name: "name", label: "Plan name", kind: "text" },
      { name: "price", label: "Price", kind: "text" },
      { name: "perksText", label: "Perks (one per line)", kind: "longtext" },
    ],
  },
];
