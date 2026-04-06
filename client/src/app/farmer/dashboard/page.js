import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CropCard } from "@/components/crops/CropCard";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoListings, demoNotifications, demoOrders, farmerDashboardStats } from "@/lib/demo-data";

export default function FarmerDashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer workspace"
        title="Manage listings, payouts, and buyer readiness"
        description="This route group is now fully previewable in the browser with demo-backed trade surfaces around a real auth core."
        actions={
          <Button asChild>
            <Link href="/farmer/listings/new">Create listing</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {farmerDashboardStats.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[18px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-eyebrow">Active inventory</p>
              <h2 className="mt-2 font-display text-[22px] text-[#111827]">Listings in market view</h2>
            </div>
            <Link href="/farmer/listings" className="text-[13px] font-semibold text-[#1A6B3C]">
              Manage all listings
            </Link>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {demoListings.slice(0, 2).map((listing) => (
              <CropCard key={listing.id} listing={listing} />
            ))}
          </div>
        </Card>

        <ActivityFeed items={demoNotifications} />
      </div>

      <Card className="rounded-[18px] p-5">
        <h2 className="font-display text-[22px] text-[#111827]">Orders requiring attention</h2>
        <div className="mt-4 grid gap-4">
          {demoOrders.slice(0, 2).map((order) => (
            <OrderCard key={order.id} order={order} href={`/farmer/orders/${order.id}`} />
          ))}
        </div>
      </Card>
    </section>
  );
}
