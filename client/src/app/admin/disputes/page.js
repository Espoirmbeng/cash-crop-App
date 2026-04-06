import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoDisputes } from "@/lib/demo-data";

export default function AdminDisputesPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin disputes"
        title="Active marketplace exceptions"
        description="Use this screen to preview how the admin workspace surfaces disputes and their current owner."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {demoDisputes.map((dispute) => (
          <Card key={dispute.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{dispute.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{dispute.subject}</h2>
              </div>
              <StatusBadge status={dispute.status} />
            </div>
            <p className="mt-4 text-[13px] text-[#374151]">Owner: {dispute.owner}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
