import { cn } from "../../lib/utils";

export function Card({ className, interactive = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-[#E5E7EB] bg-white",
        interactive && "interactive-card",
        className,
      )}
      {...props}
    />
  );
}
