import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const inputClasses = "h-10 w-full rounded-[8px] border border-[#D1D5DB] bg-white px-3 text-[14px] text-[#111827] outline-none transition-colors duration-200 placeholder:text-[#9CA3AF] focus:[border-width:1.5px] focus:border-[#1A6B3C] focus:ring-0 disabled:cursor-not-allowed disabled:bg-[#F9FAFB]";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(inputClasses, className)} {...props} />;
});
