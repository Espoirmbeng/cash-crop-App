import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { StatusBadge } from "../common/StatusBadge";

export function FarmerCard({ farmer }) {
  return (
    <Card interactive className="rounded-[12px] p-[18px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1A6B3C,#2E8B57)] text-[15px] font-semibold text-white">
            {farmer.initials}
          </div>
          <div className="space-y-1">
            <h3 className="text-[15px] font-semibold text-[#111827]">{farmer.name}</h3>
            <p className="text-[12px] text-[#6B7280]">{farmer.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {farmer.badges.map((badge) => (
            <StatusBadge key={badge} status={badge} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-[12px] bg-[#F9FAFB] p-3">
        {farmer.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[16px] font-semibold text-[#1A6B3C]">{stat.value}</p>
            <p className="text-[11px] text-[#6B7280]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {farmer.crops.map((crop) => (
          <span key={crop} className="rounded-full bg-[#EAF4EE] px-3 py-1 text-[12px] font-medium text-[#1A6B3C]">
            {crop}
          </span>
        ))}
      </div>

      <p className="mt-4 text-[12px] text-[#374151]">
        <span className="text-[#B5892A]">★★★★★</span> {farmer.rating} ({farmer.reviews} reviews)
      </p>

      <Button asChild variant="outline" className="mt-4 w-full">
        <Link href="/find-farmers">View Profile</Link>
      </Button>
    </Card>
  );
}
