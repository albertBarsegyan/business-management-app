"use client";

import { SiteSectionRenderer } from "@/entities/site-section/ui/site-section-renderer";
import type { TemplateContext } from "@/entities/site-section/model/template-context";
import type { SiteSection } from "@/shared/api/site/types";

export function LivePreview({
  sections,
  context,
}: {
  sections: SiteSection[];
  context: TemplateContext;
}) {
  const visible = sections.filter((s) => s.enabled);

  if (visible.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-10 text-sm text-muted-foreground">
        Add a section to see a preview.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {visible.map((section) => (
        <SiteSectionRenderer
          key={section.id}
          templateKey={section.templateKey}
          propsJson={section.propsJson}
          context={context}
        />
      ))}
    </div>
  );
}
