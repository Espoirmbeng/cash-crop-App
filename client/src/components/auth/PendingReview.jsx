import Link from "next/link";
import { Clock3, FileCheck2, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";

const checkpoints = [
  { title: "Profile review", detail: "We are checking your personal, business, and crop details before approval.", icon: FileCheck2 },
  { title: "Risk and payout check", detail: "Phone and payout information are reviewed for protected order settlement.", icon: ShieldCheck },
  { title: "Final approval", detail: "Your profile is prepared for buyer visibility, notifications, and listing actions.", icon: Clock3 },
];

export function PendingReview() {
  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <StatusBadge status="pending" />
      <h1 className="mt-4 font-display text-[22px] leading-[1.15] text-[#111827]">Your account is under review</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">
        We are checking your registration details, trade readiness, and payout setup before your account is activated.
      </p>

      <div className="mt-6 space-y-3">
        {checkpoints.map(({ title, detail, icon: Icon }, index) => (
          <div key={title} className="flex gap-4 rounded-[14px] border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EE] text-[#1A6B3C]">
              <Icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-[15px] font-semibold text-[#111827]">{index + 1}. {title}</p>
              <p className="text-[13px] leading-6 text-[#374151]">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/sign-in">Go to Sign In</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register/farmer">Review my details</Link>
        </Button>
      </div>
    </Card>
  );
}
