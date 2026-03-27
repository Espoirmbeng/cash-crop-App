import Link from "next/link";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

const options = [
  {
    title: "Register as Farmer",
    body: "List crops, manage buyer requests, and receive protected payouts through structured onboarding.",
    href: "/register/farmer",
    accent: "border-t-[4px] border-t-[#1A6B3C]",
  },
  {
    title: "Register as Buyer",
    body: "Browse verified supply, request quotes, and track orders with clearer trade visibility.",
    href: "/register/buyer",
    accent: "border-t-[4px] border-t-[#B5892A]",
  },
];

export default function RegisterPage() {
  return (
    <Card className="rounded-[20px] p-6 sm:p-8">
      <p className="section-eyebrow">Choose Your Role</p>
      <h1 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">Start with the account that matches your trade flow.</h1>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">
        Pick the onboarding path that best fits the way you sell or source crops on AgriculNet.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {options.map((option) => (
          <div key={option.title} className={`rounded-[14px] border border-[#E5E7EB] bg-white p-5 ${option.accent}`}>
            <h2 className="font-display text-[22px] leading-[1.15] text-[#111827]">{option.title}</h2>
            <p className="mt-3 text-[14px] leading-6 text-[#374151]">{option.body}</p>
            <Button asChild className="mt-5">
              <Link href={option.href}>{option.title}</Link>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
