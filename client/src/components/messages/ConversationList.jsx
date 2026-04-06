import Link from "next/link";
import { Card } from "../ui/card";

export function ConversationList({ items = [], basePath }) {
  return (
    <Card className="rounded-[16px] p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`${basePath}/${item.id}`}
            className="block rounded-[12px] px-3 py-3 transition-colors hover:bg-[#F3F4F6]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-[#111827]">{item.participant}</p>
              {item.unread ? <span className="rounded-full bg-[#EAF4EE] px-2 py-1 text-[11px] font-semibold text-[#1A6B3C]">{item.unread}</span> : null}
            </div>
            <p className="mt-1 text-[13px] text-[#6B7280]">{item.preview}</p>
          </Link>
        ))}
      </div>
    </Card>
  );
}
