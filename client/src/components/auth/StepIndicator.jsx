import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-semibold",
                  isComplete && "border-[#1A6B3C] bg-[#1A6B3C] text-white",
                  isActive && "border-[#1A6B3C] bg-[#1A6B3C] text-white",
                  !isComplete && !isActive && "border-[#D1D5DB] bg-white text-[#6B7280]",
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className={cn("text-[12px] font-medium", isActive ? "text-[#111827]" : "text-[#6B7280]")}>{step}</span>
            </div>
            {index < steps.length - 1 ? (
              <span className={cn("hidden h-[2px] w-8 rounded-full sm:block", isComplete ? "bg-[#1A6B3C]" : "bg-[#D1D5DB]")} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
