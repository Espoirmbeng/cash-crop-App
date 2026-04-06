import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoInspections } from "@/lib/demo-data";

export default function AdminInspectionsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin inspections"
        title="Field verification and quality checks"
        description="Inspection workflows are demo-backed in local preview, but the route, layout, and status cards are now complete."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {demoInspections.map((inspection) => (
          <Card key={inspection.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{inspection.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{inspection.subject}</h2>
              </div>
              <StatusBadge status={inspection.status} />
            </div>
            <p className="mt-4 text-[13px] text-[#374151]">Assigned inspector: {inspection.inspector}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
