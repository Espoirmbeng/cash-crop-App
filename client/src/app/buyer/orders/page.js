import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { demoOrders } from "@/lib/demo-data";

export default function BuyerOrdersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Buyer orders"
        title="Protected orders and shipment milestones"
        description="Review each order's payment status, fulfillment notes, and next logistics checkpoint from a buyer-facing perspective."
        actions={
          <>
            <Button asChild variant="secondary">
              <Link href="/buyer/documents">Open documents</Link>
            </Button>
            <Button asChild>
              <Link href="/request-quote">Request another quote</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4">
        {demoOrders.map((order) => (
          <OrderCard key={order.id} order={order} href={`/buyer/orders/${order.id}`} />
        ))}
      </div>
    </section>
  );
}
