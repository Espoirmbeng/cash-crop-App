import { PageHeader } from "@/components/common/PageHeader";
import { OrderCard } from "@/components/orders/OrderCard";
import { demoOrders } from "@/lib/demo-data";

export default function FarmerOrdersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Farmer orders"
        title="Order protection and dispatch readiness"
        description="Track buyer commitments, inspection steps, and delivery timing from the farmer side."
      />

      <div className="grid gap-4">
        {demoOrders.map((order) => (
          <OrderCard key={order.id} order={order} href={`/farmer/orders/${order.id}`} />
        ))}
      </div>
    </section>
  );
}
