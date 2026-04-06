import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoListings } from "@/lib/demo-data";

const quoteRequests = demoListings.slice(0, 3).map((listing, index) => ({
  id: `RFQ-30${index + 1}`,
  status: index === 0 ? "pending" : index === 1 ? "verified" : "negotiable",
  title: `${listing.crop} quote request`,
  detail: `Request built from ${listing.quantityLabel.toLowerCase()} at ${listing.location}.`,
  responseWindow: index === 0 ? "Awaiting farmer response" : "Updated within 24 hours",
  href: `/crops/${listing.id}`,
}));

export default function BuyerQuotesPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer quotes"
        title="Open RFQs and negotiated pricing"
        description="Quote generation beyond auth is still demo-backed, but the full route and card structure are ready for preview."
        actions={
          <Button asChild>
            <Link href="/request-quote">Create RFQ</Link>
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {quoteRequests.map((quote) => (
          <Card key={quote.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{quote.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{quote.title}</h2>
              </div>
              <StatusBadge status={quote.status} />
            </div>
            <p className="mt-4 body-copy">{quote.detail}</p>
            <p className="mt-3 text-[12px] text-[#6B7280]">{quote.responseWindow}</p>
            <Button asChild variant="outline" className="mt-5">
              <Link href={quote.href}>Open source listing</Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
