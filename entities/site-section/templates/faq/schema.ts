import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const faqItemSchema = z.object({
  question: z.string().min(1).max(160),
  answer: z.string().min(1).max(600),
});

export const faqSchema = z.object({
  heading: z.string().min(1).max(80),
  items: z.array(faqItemSchema).max(20),
});

export type FaqVariables = z.infer<typeof faqSchema>;

export const faqFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "items",
    label: "Questions",
    kind: "list",
    itemFields: [
      { name: "question", label: "Question", kind: "text" },
      { name: "answer", label: "Answer", kind: "longtext" },
    ],
  },
];
