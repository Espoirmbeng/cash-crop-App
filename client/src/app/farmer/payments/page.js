import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Card } from "@/components/ui/card";
import { demoPayments } from "@/lib/demo-data";

const paymentStats = [
  { label: "Released payouts", value: "XAF 2.48M", delta: "Across verified orders" },
  { label: "Pending release", value: "XAF 420K", delta: "Awaiting dispatch completion" },
  { label: "Payout channels", value: "3", delta: "MoMo, Orange Money, bank" },
];

export default function FarmerPaymentsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer payments"
        title="Protected payout visibility"
        description="Review release status, preferred settlement channels, and payout readiness from the farmer workspace."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {paymentStats.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

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
            <p className="mt-2 text-[12px] text-[#6B7280]">Channel: {payment.channel}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
