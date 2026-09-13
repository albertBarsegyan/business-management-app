import { getTemplate } from "../templates";
import { parseVariables } from "../model/parse-variables";
import type { TemplateContext } from "../model/template-context";

/** Shared by the builder's live preview and the public `/s/[slug]` route —
 * "uses the same component.tsx as the public renderer" (Phase 5 doc §3). */
export function SiteSectionRenderer({
  templateKey,
  propsJson,
  context,
}: {
  templateKey: string | null;
  propsJson: Record<string, unknown>;
  context: TemplateContext;
}) {
  const template = templateKey ? getTemplate(templateKey) : undefined;
  if (!template) {
    return null;
  }
  const { variables } = parseVariables(templateKey, propsJson);
  const { Component } = template;
  return <Component variables={variables} context={context} />;
}
