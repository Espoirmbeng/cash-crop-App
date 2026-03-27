import Link from "next/link";

const columns = [
  {
    title: "Marketplace",
    items: ["Browse Crops", "Find Farmers", "Buyer Protection", "Request a Quote"],
  },
  {
    title: "For Sellers",
    items: ["Farmer Verification", "Trade Support", "Pricing", "Inspections"],
  },
  {
    title: "For Buyers",
    items: ["Export Program", "Protected Orders", "Logistics", "Documentation"],
  },
  {
    title: "Support",
    items: ["Help Center", "Terms of Use", "Privacy Policy", "Contact Team"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-[#0D3D22] text-white">
      <div className="content-shell grid gap-10 py-12 lg:grid-cols-[1.15fr_repeat(4,1fr)]">
        <div className="space-y-4">
          <p className="font-display text-[22px] leading-none">
            <span className="text-white">Agricul</span>
            <span className="text-[#E8B84B]">Net</span>
          </p>
          <p className="max-w-sm text-[14px] leading-6 text-white/84">
            Trusted crop sourcing for local and international buyers, with verified farmers, protected payments, and coordinated logistics.
          </p>
          <p className="max-w-sm text-[12px] leading-5 text-[#F7EDD5]">
            Des fermes camerounaises aux marchés du monde
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">{column.title}</p>
            <ul className="space-y-2.5 text-[13px] text-white/84">
              {column.items.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-[#E8B84B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

