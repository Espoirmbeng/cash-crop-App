import { Card } from "../ui/card";
import { StatusBadge } from "../common/StatusBadge";

export function PendingQueue({ title = "Pending queue", items = [] }) {
  return (
    <Card className="rounded-[16px] p-5">
      <h2 className="font-display text-[20px] text-[#111827]">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 rounded-[12px] border border-[#E5E7EB] px-4 py-3">
            <div>
              <p className="font-medium text-[#111827]">{item.title || item.subject || item.name}</p>
              <p className="mt-1 text-[13px] text-[#374151]">{item.detail || item.region || item.owner}</p>
            </div>
            {item.status ? <StatusBadge status={item.status} /> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}
