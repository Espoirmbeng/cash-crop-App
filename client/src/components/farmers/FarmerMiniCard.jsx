import Link from "next/link";
import { Card } from "../ui/card";
import { FarmerAvatar } from "./FarmerAvatar";
import { VerificationBadge } from "./VerificationBadge";

export function FarmerMiniCard({ farmer }) {
  return (
    <Card className="rounded-[16px] p-5">
      <div className="flex items-start gap-4">
        <FarmerAvatar initials={farmer.initials} />
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-[20px] text-[#111827]">{farmer.name}</h3>
            <VerificationBadge status={farmer.verificationStatus} />
          </div>
          <p className="text-[13px] text-[#6B7280]">{farmer.location}</p>
          <p className="text-[13px] leading-6 text-[#374151]">{farmer.bio}</p>
          <Link href={`/farmers/${farmer.id}`} className="text-[13px] font-semibold text-[#1A6B3C]">View farmer profile</Link>
        </div>
      </div>
    </Card>
  );
}
