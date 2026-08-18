import { ZhamoSectionHeading } from "@/shared/ui/zhamo/section-heading";
import { ButtonsShowcase } from "./buttons-showcase";
import { ChoiceShowcase } from "./choice-showcase";
import { FieldsShowcase } from "./fields-showcase";
import { NavAndModalShowcase } from "./nav-and-modal-showcase";
import { TableAndFeedbackShowcase } from "./table-and-feedback-showcase";

export function ComponentsSection() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <ZhamoSectionHeading title="Components" tag="05 — all states" />
      <ButtonsShowcase />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FieldsShowcase />
        <ChoiceShowcase />
      </div>
      <TableAndFeedbackShowcase />
      <NavAndModalShowcase />
    </section>
  );
}
