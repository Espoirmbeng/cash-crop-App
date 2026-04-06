import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { CropListRow } from "@/components/crops/CropListRow";
import { Button } from "@/components/ui/button";
import { demoListings } from "@/lib/demo-data";

export default function FarmerListingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer listings"
        title="Inventory, readiness, and market presentation"
        description="Review every published lot, update packaging details, and keep buyer-facing information consistent across the preview."
        actions={
          <Button asChild>
            <Link href="/farmer/listings/new">New listing</Link>
          </Button>
        }
      />

      <div className="grid gap-4">
        {demoListings.map((listing) => (
          <CropListRow key={listing.id} listing={listing} href={`/farmer/listings/${listing.id}`} />
        ))}
      </div>
    </section>
  );
}
