import { cn } from "../../lib/utils";

export function Label({ className, ...props }) {
  return <label className={cn("mb-2 block text-[12px] font-semibold text-[#374151]", className)} {...props} />;
}
