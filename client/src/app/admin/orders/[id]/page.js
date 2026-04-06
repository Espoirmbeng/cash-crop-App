import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { CropSpecsTable } from "@/components/crops/CropSpecsTable";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoDocuments, demoListings, getOrderById } from "@/lib/demo-data";
import { formatDate } from "@/lib/formatters";

export default function AdminOrderDetailPage({ params }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const listing = demoListings.find((item) => item.crop === order.crop);
  const relatedDocuments = demoDocuments.filter((document) => document.orderId === order.id);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Orders", href: "/admin/orders" },
          { label: order.id },
        ]}
      />

      <PageHeader
        eyebrow="Order detail"
        title={`${order.id} operational review`}
        description="Inspect counterpart details, delivery sequencing, and supporting compliance items for this protected order."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[18px] p-5">
          <div className="space-y-3">
            {[
              ["Crop", order.crop],
              ["Buyer", order.buyerName],
              ["Farmer", order.farmerName],
              ["Value", order.amountLabel],
              ["ETA", formatDate(order.eta)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
                <p className="mt-2 text-[14px] font-medium text-[#111827]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <OrderTimeline items={order.timeline} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        {listing ? <CropSpecsTable specs={listing.specs} /> : null}

        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Supporting documents</h2>
          <div className="mt-4 space-y-3">
            {relatedDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between gap-3 rounded-[12px] border border-[#E5E7EB] px-4 py-3">
                <div>
                  <p className="font-medium text-[#111827]">{document.title}</p>
                  <p className="mt-1 text-[12px] text-[#6B7280]">Updated {formatDate(document.updatedAt)}</p>
                </div>
                <StatusBadge status={document.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
