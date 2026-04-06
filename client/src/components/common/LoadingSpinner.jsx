import { cn } from "../../lib/utils";

export function LoadingSpinner({ label = "Loading", fullScreen = false, className }) {
  return (
    <div className={cn(
      "flex items-center justify-center gap-3 text-[#1A6B3C]",
      fullScreen && "min-h-screen bg-[#F9FAFB]",
      className,
    )}>
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4EDDA] border-t-[#1A6B3C]" />
      <span className="text-[13px] font-medium text-[#374151]">{label}</span>
    </div>
  );
}
