import { z } from "zod";
import type { FieldConfig } from "../../model/field-config";

export const instagramSchema = z.object({
  heading: z.string().min(1).max(80),
  handleUrl: z.string().max(200),
  images: z.array(z.object({ assetId: z.string() })).max(12),
});

export type InstagramVariables = z.infer<typeof instagramSchema>;

export const instagramFields: FieldConfig[] = [
  { name: "heading", label: "Heading", kind: "text" },
  { name: "handleUrl", label: "Profile link", kind: "link" },
  {
    name: "images",
    label: "Photos",
    kind: "list",
    itemFields: [{ name: "assetId", label: "Photo", kind: "image" }],
  },
];
