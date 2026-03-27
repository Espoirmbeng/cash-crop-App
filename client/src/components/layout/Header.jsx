import Link from "next/link";
import { ChevronDown, Leaf, Search } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="border-b border-[#E5E7EB] bg-white">
      <div className="content-shell py-4 lg:py-0">
        <div className="flex min-h-[68px] flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 lg:w-[300px] lg:flex-nowrap">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EE] text-[#1A6B3C]">
                <Leaf className="h-5 w-5" />
              </span>
              <span className="font-display text-[22px] leading-none">
                <span className="text-[#1A6B3C]">Agricul</span>
                <span className="text-[#B5892A]">Net</span>
              </span>
            </Link>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1 text-[12px] font-medium text-[#374151]">
              <span>Cameroon</span>
              <span aria-hidden="true">🇨🇲</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#6B7280]" />
            </span>
          </div>

          <form className="flex flex-1 items-center rounded-full border border-[#D1D5DB] bg-[#F9FAFB] p-1">
            <div className="hidden items-center border-r border-[#E5E7EB] px-3 text-[12px] font-medium text-[#374151] lg:flex">
              <span>All crops</span>
              <ChevronDown className="ml-2 h-3.5 w-3.5 text-[#6B7280]" />
            </div>
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-4 w-4 text-[#6B7280]" />
              <input
                type="search"
                placeholder="Search crops, farmers, cooperatives"
                className="h-8 w-full border-0 bg-transparent p-0 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>
            <Button type="submit" className="h-8 rounded-full px-4 text-[12px]">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium text-[#374151]">
              <span className="text-[#6B7280]">FR</span>
              <span className="text-[#D1D5DB]">|</span>
              <span className="text-[#1A6B3C]">EN</span>
            </div>
            <Button asChild variant="secondary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/register/farmer">Register - Farmer</Link>
            </Button>
            <Button asChild>
              <Link href="/register/buyer">Register - Buyer</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
