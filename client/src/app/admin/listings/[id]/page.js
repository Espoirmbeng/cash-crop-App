import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { CropDetailGallery } from "@/components/crops/CropDetailGallery";
import { CropSpecsTable } from "@/components/crops/CropSpecsTable";
import { FarmerMiniCard } from "@/components/farmers/FarmerMiniCard";
import { Card } from "@/components/ui/card";
import { demoFarmers, getListingById } from "@/lib/demo-data";

export default function AdminListingDetailPage({ params }) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const farmer = demoFarmers.find((item) => item.id === listing.farmerId);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Listings", href: "/admin/listings" },
          { label: listing.crop },
        ]}
      />

      <PageHeader
        eyebrow="Listing detail"
        title={`${listing.crop} operational card`}
        description="Inspect inventory presentation, trade specifications, and the supplier record attached to this listing."
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <CropDetailGallery listing={listing} />
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Oversight snapshot</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Price", listing.price],
              ["Quantity", listing.quantityLabel],
              ["Location", listing.location],
              ["Grade", listing.grade],
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
        {farmer ? <FarmerMiniCard farmer={farmer} /> : null}
      </div>
    </section>
  );
}
