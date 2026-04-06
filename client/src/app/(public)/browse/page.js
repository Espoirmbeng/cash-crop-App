import { PageHeader } from "../../../components/common/PageHeader";
import { Pagination } from "../../../components/common/Pagination";
import { CropCard } from "../../../components/crops/CropCard";
import { demoListings } from "../../../lib/demo-data";

export default function BrowsePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Marketplace"
        title="Browse active crop supply"
        description="Explore the current demo marketplace surface with verified lots, export-ready packaging notes, and destination-aware trade details."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {demoListings.map((listing) => (
          <CropCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Pagination current={1} total={1} />
    </section>
  );
}
