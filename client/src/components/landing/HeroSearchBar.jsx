import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";

const filters = ["Verified only", "Export-ready", "Negotiable", "Bulk orders", "New arrivals"];

export function HeroSearchBar() {
  return (
    <section className="space-y-4 rounded-[20px] border border-[#E5E7EB] bg-white p-4 lg:p-5">
      <div className="flex flex-col gap-3 rounded-full border border-[#D1D5DB] bg-[#F9FAFB] p-2 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#374151] lg:min-w-[180px]">
          <span>All categories</span>
        </div>
        <div className="flex flex-1 items-center gap-2 px-2">
          <Search className="h-4 w-4 text-[#6B7280]" />
          <input
            type="search"
            placeholder="Search by crop, region, farmer, or cooperative"
            className="h-10 w-full border-0 bg-transparent p-0 text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
          />
        </div>
        <Button className="rounded-full px-5">Search Listings</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151]">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </span>
        {filters.map((filter) => (
          <span key={filter} className="rounded-full bg-[#F3F4F6] px-3 py-1.5 text-[12px] text-[#374151]">
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}
