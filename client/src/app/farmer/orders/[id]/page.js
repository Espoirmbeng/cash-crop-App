import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { CropSpecsTable } from "@/components/crops/CropSpecsTable";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoListings, getOrderById } from "@/lib/demo-data";
import { formatDate } from "@/lib/formatters";

export default function FarmerOrderDetailPage({ params }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const listing = demoListings.find((item) => item.crop === order.crop);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Farmer", href: "/farmer/dashboard" },
          { label: "Orders", href: "/farmer/orders" },
          { label: order.id },
        ]}
      />

      <PageHeader
        eyebrow="Order detail"
        title={`${order.crop} fulfillment plan`}
        description="Check buyer notes, protected payment milestones, and dispatch expectations before releasing stock."
        actions={
          <Button asChild>
            <Link href="/farmer/messages">Message buyer</Link>
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[18px] p-5">
          <div className="space-y-3">
            {[
              ["Order number", order.id],
              ["Buyer", order.buyerName],
              ["Quantity", order.quantity],
              ["Protected value", order.amountLabel],
              ["Delivery ETA", formatDate(order.eta)],
              ["Notes", order.notes],
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

      {listing ? <CropSpecsTable specs={listing.specs} /> : null}
    </section>
  );
}
