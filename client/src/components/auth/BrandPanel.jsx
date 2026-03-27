import Link from "next/link";
import { Globe2, ShieldCheck, Sprout, WalletCards } from "lucide-react";

const highlights = [
  { label: "Verified farmers", value: "340+", icon: ShieldCheck },
  { label: "Export-ready listings", value: "120", icon: Globe2 },
  { label: "Protected payment rails", value: "7", icon: WalletCards },
  { label: "Active crop categories", value: "18", icon: Sprout },
];

const notes = [
  "Protected flows for buyers and farmers",
  "Clear review steps before marketplace activation",
  "Built for Cameroonian supply and export trade",
];

export function BrandPanel({ eyebrow, title, subtitle }) {
  return (
    <aside className="flex h-full flex-col justify-between gap-8 bg-[#0D3D22] px-5 py-6 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-[22px] leading-none text-white">
            <span>Agricul</span>
            <span className="text-[#E8B84B]">Net</span>
          </Link>
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F7EDD5]">{eyebrow}</p>
            <h1 className="font-display text-[28px] leading-[1.15] text-white">{title}</h1>
            <p className="text-[14px] leading-6 text-white/82">{subtitle}</p>
            <p className="text-[12px] leading-5 text-[#F7EDD5]">Des fermes camerounaises aux marchés du monde</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {highlights.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[14px] border border-white/15 bg-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-white/70">{label}</p>
                <Icon className="h-4 w-4 text-[#E8B84B]" />
              </div>
              <p className="mt-3 text-[22px] font-semibold leading-none text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-[14px] border border-white/15 bg-white/10 p-4">
        {notes.map((note) => (
          <div key={note} className="flex items-start gap-3 text-[13px] text-white/84">
            <span className="mt-1.5 inline-flex h-2 w-2 rounded-full bg-[#E8B84B]" />
            <span>{note}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

