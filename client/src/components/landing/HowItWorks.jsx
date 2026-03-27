import { Button } from "../ui/button";

const steps = [
  { step: "01", title: "Create a verified profile", copy: "Farmers and buyers submit the details needed for a protected marketplace presence." },
  { step: "02", title: "Browse or request a quote", copy: "Buyers search by crop, region, readiness, and sourcing needs before they engage." },
  { step: "03", title: "Confirm inspection and payment", copy: "Protected payment rails and document checks reduce risk before dispatch." },
  { step: "04", title: "Track the order to completion", copy: "AgriculNet supports handoff, logistics visibility, and dispute coordination." },
];

export function HowItWorks() {
  return (
    <section className="grid gap-5 lg:grid-cols-12 lg:items-start">
      <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-6 lg:col-span-4">
        <p className="section-eyebrow">How It Works</p>
        <h2 className="mt-2 font-display text-[22px] leading-[1.15] text-[#111827]">A clearer trade journey from inquiry to delivery.</h2>
        <p className="mt-3 text-[14px] leading-6 text-[#374151]">
          The workflow is built for structured onboarding, verified supply, protected order handling, and better visibility through each trade stage.
        </p>
        <Button variant="outline" className="mt-5">Start onboarding</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
        {steps.map((step) => (
          <div key={step.step} className="rounded-[14px] border border-[#E5E7EB] bg-white p-5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF4EE] text-[12px] font-semibold text-[#1A6B3C]">
              {step.step}
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-[#111827]">{step.title}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#374151]">{step.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
