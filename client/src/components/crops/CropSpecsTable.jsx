import { Card } from "../ui/card";

export function CropSpecsTable({ specs = [] }) {
  return (
    <Card className="rounded-[18px] p-5">
      <h2 className="font-display text-[20px] text-[#111827]">Trade specifications</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{spec.label}</p>
            <p className="mt-2 text-[14px] font-medium text-[#111827]">{spec.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
