import Link from "next/link";

export function AnnouncementStrip() {
  return (
    <div className="content-shell pt-4 lg:pt-6">
      <div className="flex flex-col gap-3 rounded-[10px] border border-[#F7EDD5] bg-[#FDF8EE] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-[#F7EDD5] px-3 py-1 text-[11px] font-semibold text-[#8A6200]">New harvest listings</span>
          <p className="text-[13px] text-[#374151]">Verified farmer supply for cocoa, coffee, maize, cassava, and export crops is live this week.</p>
        </div>
        <Link href="/browse" className="text-[13px] font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
          View latest listings
        </Link>
      </div>
    </div>
  );
}
