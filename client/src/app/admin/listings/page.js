import { PageHeader } from "@/components/common/PageHeader";
import { CropListRow } from "@/components/crops/CropListRow";
import { demoListings } from "@/lib/demo-data";

export default function AdminListingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin listings"
        title="Marketplace inventory review"
        description="Review the crop listings currently visible in the demo marketplace and inspect their operational readiness."
      />

      <div className="grid gap-4">
        {demoListings.map((listing) => (
          <CropListRow key={listing.id} listing={listing} href={`/admin/listings/${listing.id}`} />
        ))}
      </div>
    </section>
  );
}
