import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { ChatBubble } from "@/components/messages/ChatBubble";
import { ChatInput } from "@/components/messages/ChatInput";
import { ConversationList } from "@/components/messages/ConversationList";
import { ListingContextBanner } from "@/components/messages/ListingContextBanner";
import { Card } from "@/components/ui/card";
import { demoConversations, demoFarmers, demoListings, getConversationById } from "@/lib/demo-data";

export default function FarmerConversationDetailPage({ params }) {
  const conversation = getConversationById(params.conversationId);

  if (!conversation) {
    notFound();
  }

  const listing = demoListings.find((item) => item.id === conversation.listingId);
  const farmer = demoFarmers.find((item) => item.id === listing?.farmerId);
  const currentUser = farmer?.name || "Jean Ngum";

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Farmer", href: "/farmer/dashboard" },
          { label: "Messages", href: "/farmer/messages" },
          { label: conversation.participant },
        ]}
      />

      <PageHeader
        eyebrow="Conversation"
        title={`Buyer thread with ${conversation.participant}`}
        description="Preview the full message thread layout from the farmer side, including trade context and routing."
      />

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <ConversationList items={demoConversations} basePath="/farmer/messages" />

        <div className="space-y-6">
          <Card className="rounded-[18px] p-5">
            <div className="space-y-4">
              {conversation.messages.map((message) => (
                <ChatBubble key={message.id} message={message} currentUser={currentUser} />
              ))}
            </div>
            <div className="mt-5 border-t border-[#E5E7EB] pt-5">
              <ChatInput />
            </div>
          </Card>

          <ListingContextBanner listing={listing} farmer={farmer} />
        </div>
      </div>
    </section>
  );
}
