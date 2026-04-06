import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { FarmerMiniCard } from "@/components/farmers/FarmerMiniCard";
import { CropSpecsTable } from "@/components/crops/CropSpecsTable";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoFarmers, demoListings, getOrderById } from "@/lib/demo-data";
import { formatDate } from "@/lib/formatters";

export default function BuyerOrderDetailPage({ params }) {
  const order = getOrderById(params.id);

  if (!order) {
    notFound();
  }

  const listing = demoListings.find((item) => item.crop === order.crop);
  const farmer = demoFarmers.find((item) => item.name === order.farmerName);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Buyer", href: "/buyer/dashboard" },
          { label: "Orders", href: "/buyer/orders" },
          { label: order.id },
        ]}
      />

      <PageHeader
        eyebrow="Order detail"
        title={`${order.crop} shipment overview`}
        description="Keep payment protection, fulfillment notes, and counterpart details aligned before final delivery."
        actions={
          <Button asChild>
            <Link href="/buyer/messages">Open message thread</Link>
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[18px] p-5">
          <p className="section-eyebrow">Order summary</p>
          <h2 className="mt-2 font-display text-[24px] text-[#111827]">{order.id}</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["Buyer", order.buyerName],
              ["Farmer", order.farmerName],
              ["Quantity", order.quantity],
              ["Protected value", order.amountLabel],
              ["Expected arrival", formatDate(order.eta)],
              ["Current note", order.notes],
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

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        {listing ? <CropSpecsTable specs={listing.specs} /> : null}
        {farmer ? <FarmerMiniCard farmer={farmer} /> : null}
      </div>
    </section>
  );
}
