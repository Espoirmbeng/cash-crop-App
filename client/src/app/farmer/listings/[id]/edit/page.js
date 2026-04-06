import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getListingById } from "@/lib/demo-data";

export default function FarmerEditListingPage({ params }) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Farmer", href: "/farmer/dashboard" },
          { label: "Listings", href: "/farmer/listings" },
          { label: listing.crop, href: `/farmer/listings/${listing.id}` },
          { label: "Edit" },
        ]}
      />

      <PageHeader
        eyebrow="Edit listing"
        title={`Update ${listing.crop}`}
        description="Review core trade fields and adjust the buyer-facing presentation for this lot."
      />

      <Card className="rounded-[18px] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Crop name</span>
            <Input defaultValue={listing.crop} />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Quantity</span>
            <Input defaultValue={listing.quantity} />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Price</span>
            <Input defaultValue={listing.price} />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-medium text-[#374151]">Delivery window</span>
            <Input defaultValue={listing.deliveryWindow} />
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-[13px] font-medium text-[#374151]">Summary</span>
          <textarea
            className="min-h-[140px] w-full rounded-[12px] border border-[#D1D5DB] px-4 py-3 text-[14px] outline-none"
            defaultValue={listing.summary}
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button>Save changes</Button>
          <Button variant="secondary">Preview update</Button>
        </div>
      </Card>
    </section>
  );
}
