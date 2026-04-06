import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const accountHealth = [
  { label: "Approved buyers", value: "1", delta: "Atlas Foods demo profile" },
  { label: "Default destination", value: "Douala", delta: "Used for quote drafting" },
  { label: "Verification status", value: "Ready", delta: "Auth flow is real-backed" },
];

export default function BuyerProfilePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer profile"
        title="Company details and sourcing identity"
        description="This page is ready for browser preview with the same field structure the buyer registration flow now feeds into."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {accountHealth.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Company profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Company name</span>
              <Input defaultValue="Atlas Foods" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Primary contact</span>
              <Input defaultValue="Amina Kofi" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Email</span>
              <Input defaultValue="procurement@atlasfoods.cm" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Phone</span>
              <Input defaultValue="+237677000111" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Country</span>
              <Input defaultValue="Cameroon" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Destination market</span>
              <Input defaultValue="Douala and Lagos" />
            </label>
          </div>
        </Card>

        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Sourcing brief</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Buying focus", "Cocoa, coffee, cassava"],
              ["Monthly volume", "12 tonnes target"],
              ["Protection mode", "Protected settlement for all first orders"],
              ["Delivery preference", "Warehouse consolidation in Douala"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
                <p className="mt-2 text-[14px] font-medium text-[#111827]">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
