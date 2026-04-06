import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoPayments } from "@/lib/demo-data";

export default function AdminPaymentsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin payments"
        title="Protected payout monitoring"
        description="Use this page to preview the operations view for payout release and settlement channel monitoring."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {demoPayments.map((payment) => (
          <Card key={payment.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{payment.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{payment.amountLabel}</h2>
              </div>
              <StatusBadge status={payment.status} />
            </div>
            <p className="mt-4 text-[13px] text-[#374151]">Beneficiary: {payment.party}</p>
            <p className="mt-2 text-[12px] text-[#6B7280]">Settlement channel: {payment.channel}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
