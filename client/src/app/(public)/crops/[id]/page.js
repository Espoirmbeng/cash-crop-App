import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import { PageHeader } from "../../../../components/common/PageHeader";
import { CropDetailGallery } from "../../../../components/crops/CropDetailGallery";
import { CropSpecsTable } from "../../../../components/crops/CropSpecsTable";
import { getFarmerById, getListingById } from "../../../../lib/demo-data";

export default function CropDetailPage({ params }) {
  const listing = getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const farmer = getFarmerById(listing.farmerId);

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Crop Detail"
        title={listing.crop}
        description={`${listing.quantityLabel} from ${listing.location}. This detail view is now part of the finished browser preview.`}
        actions={(
          <>
            {farmer ? (
              <Button asChild variant="outline">
                <Link href={`/farmers/${farmer.id}`}>View farmer</Link>
              </Button>
            ) : null}
            <Button asChild>
              <Link href="/request-quote">Request Quote</Link>
            </Button>
          </>
        )}
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <CropDetailGallery listing={listing} />
        <CropSpecsTable specs={listing.specs} />
      </div>
    </section>
  );
}
