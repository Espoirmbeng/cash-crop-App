import { Card } from "../ui/card";

export function CropDetailGallery({ listing }) {
  return (
    <Card className="overflow-hidden rounded-[18px]">
      <div className={`${listing.imageClass} h-[240px]`} />
      <div className="p-5">
        <p className="section-eyebrow">Listing Visual</p>
        <h2 className="mt-2 font-display text-[22px] text-[#111827]">{listing.crop}</h2>
        <p className="mt-2 body-copy">{listing.summary}</p>
      </div>
    </Card>
  );
}
