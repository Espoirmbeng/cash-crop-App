import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoDocuments } from "@/lib/demo-data";
import { formatDate } from "@/lib/formatters";

export default function BuyerDocumentsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer documents"
        title="Contracts, certificates, and export paperwork"
        description="These document cards are demo-backed, but they let you preview how buyer-side compliance materials will surface in the final product."
      />

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {demoDocuments.map((document) => (
          <Card key={document.id} className="rounded-[18px] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-eyebrow">{document.id}</p>
                <h2 className="mt-2 font-display text-[22px] text-[#111827]">{document.title}</h2>
              </div>
              <StatusBadge status={document.status} />
            </div>
            <p className="mt-4 text-[13px] text-[#374151]">Linked order: {document.orderId}</p>
            <p className="mt-2 text-[12px] text-[#6B7280]">Updated {formatDate(document.updatedAt)}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
