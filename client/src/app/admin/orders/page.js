import { PageHeader } from "@/components/common/PageHeader";
import { OrderCard } from "@/components/orders/OrderCard";
import { demoOrders } from "@/lib/demo-data";

export default function AdminOrdersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin orders"
        title="Protected trade orders"
        description="Monitor current order movement, payout protection, and exception handling from the operations console."
      />

      <div className="grid gap-4">
        {demoOrders.map((order) => (
          <OrderCard key={order.id} order={order} href={`/admin/orders/${order.id}`} />
        ))}
      </div>
    </section>
  );
}
