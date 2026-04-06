import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { CropDetailGallery } from "@/components/crops/CropDetailGallery";
import { CropSpecsTable } from "@/components/crops/CropSpecsTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoOrders, getListingById } from "@/lib/demo-data";

export default function FarmerListingDetailPage({ params }) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const relatedOrders = demoOrders.filter((order) => order.crop === listing.crop);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Farmer", href: "/farmer/dashboard" },
          { label: "Listings", href: "/farmer/listings" },
          { label: listing.crop },
        ]}
      />

      <PageHeader
        eyebrow="Listing detail"
        title={`${listing.crop} trade card`}
        description="Inspect the buyer-facing presentation, pricing, and order activity for this inventory line."
        actions={
          <Button asChild>
            <Link href={`/farmer/listings/${listing.id}/edit`}>Edit listing</Link>
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <CropDetailGallery listing={listing} />
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Listing controls</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Grade", listing.grade],
              ["Quantity", listing.quantityLabel],
              ["Price", listing.price],
              ["Location", listing.location],
              ["Delivery window", listing.deliveryWindow],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
                <p className="mt-2 text-[14px] font-medium text-[#111827]">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <CropSpecsTable specs={listing.specs} />
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Order interest</h2>
          <div className="mt-4 space-y-3">
            {relatedOrders.map((order) => (
              <div key={order.id} className="rounded-[12px] border border-[#E5E7EB] px-4 py-3">
                <p className="font-medium text-[#111827]">{order.id}</p>
                <p className="mt-1 text-[13px] text-[#374151]">{order.buyerName} requested {order.quantity}</p>
                <p className="mt-1 text-[12px] text-[#6B7280]">{order.notes}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
