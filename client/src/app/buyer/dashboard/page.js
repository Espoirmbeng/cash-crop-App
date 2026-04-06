import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { FarmerMiniCard } from "@/components/farmers/FarmerMiniCard";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buyerDashboardStats, demoFarmers, demoNotifications, demoOrders } from "@/lib/demo-data";

export default function BuyerDashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer workspace"
        title="Track protected sourcing from one clear view"
        description="Keep quote follow-ups, saved supply, and active orders visible while the rest of the marketplace stays previewable in demo mode."
        actions={
          <Button asChild>
            <Link href="/browse">Browse supply</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {buyerDashboardStats.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[18px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-eyebrow">Protected orders</p>
              <h2 className="mt-2 font-display text-[22px] text-[#111827]">Priority deliveries</h2>
            </div>
            <Link href="/buyer/orders" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A6B3C]">
              View all
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-4">
            {demoOrders.slice(0, 2).map((order) => (
              <OrderCard key={order.id} order={order} href={`/buyer/orders/${order.id}`} />
            ))}
          </div>
        </Card>

        <ActivityFeed items={demoNotifications} />
      </div>

      <Card className="rounded-[18px] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="section-eyebrow">Farmer network</p>
            <h2 className="mt-2 font-display text-[22px] text-[#111827]">Saved supplier shortlist</h2>
          </div>
          <Link href="/find-farmers" className="text-[13px] font-semibold text-[#1A6B3C]">
            Find more farmers
          </Link>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {demoFarmers.slice(0, 2).map((farmer) => (
            <FarmerMiniCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      </Card>
    </section>
  );
}
