import Link from "next/link";
import { Building2, Tractor } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const roles = [
  {
    title: "Register as Farmer",
    body: "Create verified listings, receive quote requests, and manage protected payouts from local and international buyers.",
    href: "/register/farmer",
    icon: Tractor,
    accent: "bg-[#EAF4EE] text-[#1A6B3C]",
    border: "border-t-[4px] border-t-[#1A6B3C]",
  },
  {
    title: "Register as Buyer",
    body: "Source from verified farmers, request export-ready supply, and track protected orders with clearer trade visibility.",
    href: "/register/buyer",
    icon: Building2,
    accent: "bg-[#FDF8EE] text-[#8A6200]",
    border: "border-t-[4px] border-t-[#B5892A]",
  },
];

export function RoleCards() {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {roles.map(({ title, body, href, icon: Icon, accent, border }) => (
        <Card key={title} interactive className={`rounded-[20px] p-6 ${border}`}>
          <div className="flex items-start justify-between gap-4">
            <span className={`inline-flex h-12 w-12 items-center justify-center rounded-[12px] ${accent}`}>
              <Icon className="h-5 w-5" />
            </span>
            <Button asChild variant="outline">
              <Link href={href}>Start</Link>
            </Button>
          </div>
          <h2 className="mt-5 font-display text-[22px] leading-[1.15] text-[#111827]">{title}</h2>
          <p className="mt-3 text-[14px] leading-6 text-[#374151]">{body}</p>
        </Card>
      ))}
    </section>
  );
}
