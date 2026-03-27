import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";

export function CropCard({ listing }) {
  return (
    <Card interactive className="overflow-hidden rounded-[12px]">
      <div className={cn("relative h-[140px] p-4", listing.imageClass)}>
        <div className="flex justify-end">
          <StatusBadge status={listing.status} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#111827]">{listing.crop}</h3>
          <p className="mt-1 text-[12px] text-[#6B7280]">{listing.quantity}</p>
          <p className="mt-1 text-[12px] text-[#6B7280]">{listing.location}</p>
        </div>
        <p className="text-[15px] font-semibold text-[#1A6B3C]">{listing.price}</p>
      </div>
    </Card>
  );
}
