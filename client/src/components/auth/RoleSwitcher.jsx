import { cn } from "../../lib/utils";

export function RoleSwitcher({ options, value, onChange, className }) {
  return (
    <div className={cn("inline-flex rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] p-1", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-[8px] px-3 py-2 text-[13px] font-semibold transition-colors duration-200",
              selected ? "bg-[#EAF4EE] text-[#1A6B3C]" : "text-[#6B7280] hover:text-[#1A6B3C]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
