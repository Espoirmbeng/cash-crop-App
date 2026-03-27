import { BadgeCheck, Shield, Truck, WalletCards } from "lucide-react";
import { Card } from "../ui/card";

const items = [
  { title: "Verified seller profiles", copy: "Farmer profiles are reviewed before listings go live for buyers.", icon: BadgeCheck },
  { title: "Buyer protection", copy: "Inspection support, dispute handling, and trade assistance are built in.", icon: Shield },
  { title: "Coordinated logistics", copy: "Move from quote to shipment with export documentation support.", icon: Truck },
  { title: "Protected payouts", copy: "Use mobile money, cards, and transfer-ready settlement flows.", icon: WalletCards },
];

export function TrustStrip() {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {items.map(({ title, copy, icon: Icon }) => (
        <Card key={title} className="rounded-[12px] p-5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EE] text-[#1A6B3C]">
            <Icon className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-[15px] font-semibold text-[#111827]">{title}</h3>
          <p className="mt-2 text-[13px] leading-6 text-[#374151]">{copy}</p>
        </Card>
      ))}
    </section>
  );
}
