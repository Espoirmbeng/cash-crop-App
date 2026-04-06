import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/card";
import { CropBadge } from "./CropBadge";
import { StatusBadge } from "../common/StatusBadge";

export function CropListRow({ listing, href }) {
  return (
    <Card className="rounded-[16px] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-[20px] text-[#111827]">{listing.crop}</h3>
            <StatusBadge status={listing.status} />
            <CropBadge>{listing.grade}</CropBadge>
          </div>
          <p className="text-[13px] text-[#374151]">{listing.summary}</p>
          <div className="flex flex-wrap gap-4 text-[12px] text-[#6B7280]">
            <span>{listing.quantityLabel}</span>
            <span>{listing.location}</span>
            <span>{listing.price}</span>
          </div>
        </div>

        <Link href={href} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A6B3C]">
          Open listing
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
