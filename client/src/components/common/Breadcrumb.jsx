import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-[#6B7280]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.href || item.label}-${index}`} className="inline-flex items-center gap-2">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" /> : null}
            {item.href && !isLast ? (
              <Link href={item.href} className="transition-colors hover:text-[#1A6B3C]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-[#111827]" : ""}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
