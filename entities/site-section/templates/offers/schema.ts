import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const offerItemSchema = z.object({
  title: z.string().min(1).max(80),
  body: z.string().max(200),
  code: z.string().max(30),
  until: z.string().max(40),
});

export const offersSchema = z.object({
  heading: z.string().min(1).max(80),
  items: z.array(offerItemSchema).max(8),
});

export type OffersVariables = z.infer<typeof offersSchema>;

export const offersFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "items",
    label: "Offers",
    kind: "list",
    itemFields: [
      { name: "title", label: "Title", kind: "text" },
      { name: "body", label: "Description", kind: "longtext" },
      { name: "code", label: "Promo code", kind: "text" },
      { name: "until", label: "Valid until", kind: "text" },
    ],
  },
];
