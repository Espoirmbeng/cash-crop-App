import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ConversationList } from "@/components/messages/ConversationList";
import { ListingContextBanner } from "@/components/messages/ListingContextBanner";
import { Card } from "@/components/ui/card";
import { demoConversations, demoFarmers, demoListings, demoNotifications } from "@/lib/demo-data";

export default function BuyerMessagesPage() {
  const highlightedConversation = demoConversations[0];
  const highlightedListing = demoListings.find((item) => item.id === highlightedConversation?.listingId);
  const highlightedFarmer = demoFarmers.find((item) => item.id === highlightedListing?.farmerId);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer messages"
        title="Stay close to every sourcing conversation"
        description="The messaging area is demo-backed for now, but the flow mirrors the final buyer workspace with context cards and linked trade threads."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ConversationList items={demoConversations} basePath="/buyer/messages" />

        <div className="space-y-6">
          <ListingContextBanner listing={highlightedListing} farmer={highlightedFarmer} />
          <ActivityFeed items={demoNotifications} />
        </div>
      </div>

      <Card className="rounded-[18px] p-5">
        <p className="section-eyebrow">Response standards</p>
        <h2 className="mt-2 font-display text-[22px] text-[#111827]">What this preview covers</h2>
        <p className="mt-3 body-copy">
          Message delivery outside auth remains demo-backed locally, but the route structure, context panels, and protected workspace shell are ready for browser review.
        </p>
      </Card>
    </section>
  );
}
