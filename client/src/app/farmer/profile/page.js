import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const profileStats = [
  { label: "Verification", value: "Ready", delta: "Phone and email flow completed" },
  { label: "Primary crop", value: "Cocoa", delta: "Export grade focus" },
  { label: "Preferred payout", value: "MTN MoMo", delta: "Default settlement channel" },
];

export default function FarmerProfilePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer profile"
        title="Farm identity and trade readiness"
        description="These profile fields mirror the richer farmer registration flow that now reaches the backend."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {profileStats.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Farmer details</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">First name</span>
              <Input defaultValue="Jean" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Last name</span>
              <Input defaultValue="Ngum" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Phone</span>
              <Input defaultValue="+237670000111" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">City</span>
              <Input defaultValue="Kumba" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Primary crop</span>
              <Input defaultValue="Cocoa Beans" />
            </label>
            <label className="space-y-2">
              <span className="text-[13px] font-medium text-[#374151]">Harvest volume</span>
              <Input defaultValue="2,000 kg" />
            </label>
          </div>
        </Card>

        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Payout and inspection</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Inspection preference", "AgriculNet coordinated"],
              ["Payout method", "MTN MoMo"],
              ["Account name", "Jean Ngum"],
              ["Notification opt-in", "Enabled"],
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
