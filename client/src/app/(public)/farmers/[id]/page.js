import { notFound } from "next/navigation";
import { Card } from "../../../../components/ui/card";
import { PageHeader } from "../../../../components/common/PageHeader";
import { FarmerMiniCard } from "../../../../components/farmers/FarmerMiniCard";
import { CropCard } from "../../../../components/crops/CropCard";
import { demoFarmers, demoListings, getFarmerById } from "../../../../lib/demo-data";

export default function FarmerDetailPage({ params }) {
  const farmer = getFarmerById(params.id);

  if (!farmer) {
    notFound();
  }

  const relatedListings = demoListings.filter((listing) => listing.farmerId === farmer.id);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer Profile"
        title={farmer.name}
        description="A complete public farmer profile is now available in the browser preview, including listings and readiness context."
      />

      <FarmerMiniCard farmer={farmer} />

      <Card className="rounded-[18px] p-6">
        <h2 className="font-display text-[20px] text-[#111827]">Active listings</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(relatedListings.length ? relatedListings : demoListings.slice(0, 2)).map((listing) => (
            <CropCard key={listing.id} listing={listing} />
          ))}
        </div>
      </Card>
    </section>
  );
}
