import { regionHighlights } from "../../constants/crops";
import { SectionHeader } from "../common/SectionHeader";

export function RegionalSpotlight() {
  return (
    <section className="space-y-5 rounded-[14px] border border-[#E5E7EB] bg-white p-5 lg:p-6">
      <SectionHeader
        eyebrow="Regional Supply"
        title="Trade activity by region"
        description="Match crop availability with logistics priorities across Cameroon&apos;s main farming corridors and sourcing zones."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {regionHighlights.map((region) => (
          <div key={region.name} className="rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">{region.emphasis}</p>
            <h3 className="mt-2 text-[15px] font-semibold text-[#111827]">{region.name}</h3>
            <p className="mt-2 text-[13px] leading-6 text-[#374151]">{region.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {region.crops.map((crop) => (
                <span key={crop} className="rounded-full bg-white px-3 py-1 text-[12px] text-[#374151]">
                  {crop}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[12px] font-semibold text-[#1A6B3C]">{region.tradeSignal}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
