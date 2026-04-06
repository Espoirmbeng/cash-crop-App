import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoLogistics } from "@/lib/demo-data";

export default function AdminLogisticsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin logistics"
        title="Shipment lanes and consolidation status"
        description="Keep an eye on active routes, staging lanes, and logistics blockers from the admin console."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {demoLogistics.map((item) => (
          <Card key={item.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{item.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{item.lane}</h2>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-4 body-copy">{item.detail}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
