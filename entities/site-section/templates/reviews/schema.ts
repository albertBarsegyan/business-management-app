import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const reviewItemSchema = z.object({
  quote: z.string().min(1).max(400),
  author: z.string().min(1).max(80),
  rating: z.number().int().min(1).max(5),
});

export const reviewsSchema = z.object({
  heading: z.string().min(1).max(80),
  layout: z.enum(["quote", "cards"]),
  items: z.array(reviewItemSchema).max(12),
});

export type ReviewsVariables = z.infer<typeof reviewsSchema>;

export const reviewsFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "layout",
    label: "Layout",
    kind: "enum",
    options: [
      { value: "quote", label: "Single quote" },
      { value: "cards", label: "Cards" },
    ],
  },
  {
    name: "items",
    label: "Reviews",
    kind: "list",
    itemFields: [
      { name: "quote", label: "Quote", kind: "longtext" },
      { name: "author", label: "Author", kind: "text" },
      { name: "rating", label: "Rating (1-5)", kind: "number" },
    ],
  },
];
