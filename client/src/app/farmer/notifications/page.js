import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card } from "@/components/ui/card";
import { demoNotifications } from "@/lib/demo-data";

export default function FarmerNotificationsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer notifications"
        title="Inspection, payout, and buyer updates"
        description="Use this stream to preview how the farmer workspace handles next steps without leaving the main dashboard shell."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <ActivityFeed items={demoNotifications} />

        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Notification preferences</h2>
          <div className="mt-5 space-y-3">
            {[
              "SMS for new buyer inquiries",
              "Email for document approvals",
              "Urgent alerts for inspection schedule changes",
            ].map((item) => (
              <label key={item} className="flex items-center gap-3 rounded-[12px] bg-[#F9FAFB] px-4 py-3">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#1A6B3C]" />
                <span className="text-[13px] text-[#374151]">{item}</span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
