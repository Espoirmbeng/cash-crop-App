import { cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "../../lib/utils";

const variants = {
  primary: "border-transparent bg-[#1A6B3C] text-white hover:bg-[#2E8B57]",
  secondary: "border border-[#D1D5DB] bg-white text-[#374151] hover:border-[#1A6B3C] hover:text-[#1A6B3C]",
  outline: "border-[1.5px] border-[#1A6B3C] bg-white text-[#1A6B3C] hover:bg-[#EAF4EE]",
  danger: "border-transparent bg-[#C0392B] text-white hover:bg-[#A93226]",
  ghost: "border-transparent bg-transparent text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#1A6B3C]",
};

const baseClasses = "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border px-4 text-[13px] font-semibold leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50";

export const Button = forwardRef(function Button(
  { asChild = false, className, variant = "primary", type = "button", children, ...props },
  ref,
) {
  const classes = cn(baseClasses, variants[variant], className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className),
      ref,
      ...props,
    });
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  );
});
