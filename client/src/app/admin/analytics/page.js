import { PageHeader } from "@/components/common/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { Card } from "@/components/ui/card";
import { analyticsSummary } from "@/lib/demo-data";

const performanceSeries = [
  { label: "Mon", value: 24, displayValue: "XAF 1.2M", caption: "GMV", summary: "Protected volume started the week with cocoa-heavy orders." },
  { label: "Tue", value: 31, displayValue: "XAF 1.6M", caption: "GMV", summary: "Buyer quote approvals pushed warehouse scheduling forward." },
  { label: "Wed", value: 27, displayValue: "XAF 1.4M", caption: "GMV", summary: "Inspection and document checks balanced throughput." },
  { label: "Thu", value: 36, displayValue: "XAF 1.9M", caption: "GMV", summary: "Export-ready lots lifted average transaction size." },
  { label: "Fri", value: 42, displayValue: "XAF 2.3M", caption: "GMV", summary: "End-of-week releases drove the highest protected volume." },
];

export default function AdminAnalyticsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Operational and marketplace performance"
        description="This analytics page is demo-backed, but it completes the admin route group and gives you a clean browser preview of the reporting layer."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analyticsSummary.map((item) => (
          <KpiCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <EarningsChart title="Protected volume trend" items={performanceSeries} />

      <Card className="rounded-[18px] p-5">
        <h2 className="font-display text-[22px] text-[#111827]">Operational focus areas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["Approval backlog", "9 profiles are waiting on final review."],
            ["Inspection throughput", "Average cycle time is holding below 3 days."],
            ["Buyer quality", "Repeat rate indicates strong retention in protected orders."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
              <p className="font-medium text-[#111827]">{title}</p>
              <p className="mt-2 text-[13px] leading-6 text-[#374151]">{body}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
