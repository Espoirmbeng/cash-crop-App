import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";

export function ListingContextBanner({ listing, farmer }) {
  if (!listing) {
    return null;
  }

  return (
    <Card className="rounded-[16px] border border-[#E5E7EB] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow">Trade context</p>
          <h3 className="mt-2 font-display text-[22px] text-[#111827]">{listing.crop}</h3>
          <p className="mt-2 text-[13px] text-[#374151]">{listing.summary}</p>
        </div>
        <StatusBadge status={listing.status} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">Available quantity</p>
          <p className="mt-2 text-[14px] font-medium text-[#111827]">{listing.quantityLabel}</p>
        </div>
        <div className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">Location</p>
          <p className="mt-2 text-[14px] font-medium text-[#111827]">{listing.location}</p>
        </div>
      </div>

      {farmer ? (
        <Link href={`/farmers/${farmer.id}`} className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A6B3C]">
          View farmer profile
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      ) : null}
    </Card>
  );
}
