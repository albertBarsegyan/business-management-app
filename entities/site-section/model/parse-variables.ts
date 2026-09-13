import { getTemplate } from "../templates";

export interface ParsedVariables {
  variables: Record<string, unknown>;
  /** True when `propsJson` didn't fully validate and defaults were merged
   * in for the invalid/missing fields — the builder surfaces this as a
   * warning (Phase 5 doc §1); the public site never does, it just renders
   * the merged result. */
  hadWarning: boolean;
}

/**
 * Validates a stored section's `propsJson` against its template's zod
 * schema. On failure, merges whatever top-level fields *did* validate over
 * the template's defaults, rather than failing the whole section — an
 * older `schemaVersion`'s missing field shouldn't take down the section.
 */
export function parseVariables(
  templateKey: string | null,
  propsJson: Record<string, unknown>,
): ParsedVariables {
  const template = templateKey ? getTemplate(templateKey) : undefined;
  if (!template) {
    return { variables: propsJson, hadWarning: true };
  }

  const result = template.schema.safeParse(propsJson);
  if (result.success) {
    return {
      variables: result.data as Record<string, unknown>,
      hadWarning: false,
    };
  }

  const invalidPaths = new Set(
    result.error.issues.map((issue) => issue.path[0]),
  );
  const merged: Record<string, unknown> = { ...template.defaults };
  for (const [key, value] of Object.entries(propsJson)) {
    if (!invalidPaths.has(key)) {
      merged[key] = value;
    }
  }
  return { variables: merged, hadWarning: true };
}
