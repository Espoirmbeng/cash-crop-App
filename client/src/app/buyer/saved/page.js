import { PageHeader } from "@/components/common/PageHeader";
import { CropCard } from "@/components/crops/CropCard";
import { FarmerMiniCard } from "@/components/farmers/FarmerMiniCard";
import { Card } from "@/components/ui/card";
import { demoFarmers, demoListings } from "@/lib/demo-data";

export default function BuyerSavedPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Saved supply"
        title="Listings and farmers worth revisiting"
        description="This saved view is demo-backed and meant to help you preview the complete buyer journey in the browser."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoListings.map((listing) => (
          <CropCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Card className="rounded-[18px] p-5">
        <h2 className="font-display text-[22px] text-[#111827]">Pinned farmers</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {demoFarmers.slice(0, 2).map((farmer) => (
            <FarmerMiniCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      </Card>
    </section>
  );
}
