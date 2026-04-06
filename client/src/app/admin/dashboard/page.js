import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PendingQueue } from "@/components/dashboard/PendingQueue";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  adminDashboardStats,
  demoAdminUsers,
  demoDisputes,
  demoNotifications,
  demoOrders,
} from "@/lib/demo-data";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin operations"
        title="Marketplace oversight and trade protection"
        description="Review approvals, order movement, and workflow exceptions from the operational control surface."
        actions={
          <Button asChild>
            <Link href="/admin/users">Review users</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {adminDashboardStats.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <PendingQueue title="Profiles awaiting review" items={demoAdminUsers} />
        <PendingQueue title="Open disputes" items={demoDisputes} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Orders in motion</h2>
          <div className="mt-4 grid gap-4">
            {demoOrders.slice(0, 2).map((order) => (
              <OrderCard key={order.id} order={order} href={`/admin/orders/${order.id}`} />
            ))}
          </div>
        </Card>

        <ActivityFeed items={demoNotifications} />
      </div>
    </section>
  );
}
