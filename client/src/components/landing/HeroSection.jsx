import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck, Sprout, WalletCards } from "lucide-react";
import { Button } from "../ui/button";

const statCards = [
  { label: "Verified farmers", value: "340+", icon: ShieldCheck },
  { label: "Export-ready listings", value: "120", icon: Globe2 },
  { label: "Protected payment rails", value: "7", icon: WalletCards },
  { label: "Active crop categories", value: "18", icon: Sprout },
];

export function HeroSection() {
  return (
    <section className="rounded-[20px] bg-[#0D3D22] px-5 py-8 lg:px-10 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="space-y-5 lg:col-span-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F7EDD5]">Agricultural Trade Platform</p>
          <div className="space-y-3">
            <h1 className="max-w-3xl font-display text-[28px] leading-[1.15] text-white">
              Trusted crop trade from Cameroonian farms to local and international markets.
            </h1>
            <p className="max-w-2xl text-[14px] leading-6 text-white/82">
              Discover verified farmers, structured crop listings, protected payments, and export-ready trade support in one clear marketplace.
            </p>
            <p className="text-[12px] leading-5 text-[#F7EDD5]">Des fermes camerounaises aux marches du monde</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="border-white bg-white text-[#1A6B3C] hover:bg-[#F3F4F6]">
              <Link href="/register/farmer">Register as Farmer</Link>
            </Button>
            <Button asChild variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/register/buyer">Register as Buyer</Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              <Link href="/browse" className="inline-flex items-center gap-2">
                Browse listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[14px] border border-white/15 bg-white/10 p-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-white/70">{label}</p>
                <Icon className="h-4 w-4 text-[#E8B84B]" />
              </div>
              <p className="mt-3 text-[22px] font-semibold leading-none">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
