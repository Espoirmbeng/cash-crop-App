import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { OrderStatusBadge } from "./OrderStatusBadge";

export function OrderCard({ order, href }) {
  return (
    <Card className="rounded-[16px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{order.id}</p>
          <h3 className="mt-2 font-display text-[20px] text-[#111827]">{order.crop}</h3>
          <p className="mt-2 text-[13px] text-[#374151]">{`${order.quantity} - ${order.amountLabel}`}</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">{order.notes}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={href}>View order</Link>
        </Button>
      </div>
    </Card>
  );
}
