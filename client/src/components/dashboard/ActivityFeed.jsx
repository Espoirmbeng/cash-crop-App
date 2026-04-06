import { Card } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";

export function ActivityFeed({ items = [] }) {
  return (
    <Card className="rounded-[16px] p-5">
      <h2 className="font-display text-[20px] text-[#111827]">Recent activity</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-[#111827]">{item.title}</p>
              {item.status ? <StatusBadge status={item.status} /> : null}
            </div>
            <p className="mt-2 text-[13px] leading-6 text-[#374151]">{item.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
