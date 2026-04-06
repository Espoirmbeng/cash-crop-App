import { Card } from "../ui/card";

export function EmptyState({ title, description }) {
  return (
    <Card className="rounded-[16px] border-dashed p-8 text-center">
      <h2 className="font-display text-[20px] text-[#111827]">{title}</h2>
      <p className="mt-3 text-[14px] leading-6 text-[#374151]">{description}</p>
    </Card>
  );
}
