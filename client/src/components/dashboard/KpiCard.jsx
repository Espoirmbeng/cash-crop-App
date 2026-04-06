import { Card } from "../ui/card";

export function KpiCard({ label, value, delta }) {
  return (
    <Card className="rounded-[16px] p-5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
      <p className="mt-3 font-display text-[28px] leading-none text-[#111827]">{value}</p>
      {delta ? <p className="mt-2 text-[12px] text-[#1A6B3C]">{delta}</p> : null}
    </Card>
  );
}
