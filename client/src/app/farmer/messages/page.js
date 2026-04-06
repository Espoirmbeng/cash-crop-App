import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ConversationList } from "@/components/messages/ConversationList";
import { Card } from "@/components/ui/card";
import { demoConversations, demoNotifications } from "@/lib/demo-data";

export default function FarmerMessagesPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer messages"
        title="Buyer follow-ups and trade clarifications"
        description="Use the messaging area to preview how farmer-side communication stays connected to listings and order activity."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ConversationList items={demoConversations} basePath="/farmer/messages" />
        <div className="space-y-6">
          <ActivityFeed items={demoNotifications} />
          <Card className="rounded-[18px] p-5">
            <h2 className="font-display text-[22px] text-[#111827]">Demo routing note</h2>
            <p className="mt-3 body-copy">
              Messaging stays local to the frontend preview right now, but the protected layouts, detail routes, and listing context have all been completed.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
