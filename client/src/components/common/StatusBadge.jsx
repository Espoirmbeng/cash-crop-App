import { cn } from "../../lib/utils";

const badgeStyles = {
  verified: { label: "Verified", className: "bg-[#D4EDDA] text-[#1A5C2E]" },
  pending: { label: "Pending", className: "bg-[#FEF3CD] text-[#856404]" },
  rejected: { label: "Rejected", className: "bg-[#FDECEA] text-[#922B21]" },
  "export-ready": { label: "Export-ready", className: "bg-[#D1ECF1] text-[#0C5460]" },
  "in-transit": { label: "In transit", className: "bg-[#E8F4FD] text-[#1A5276]" },
  negotiable: { label: "Negotiable", className: "bg-[#F7EDD5] text-[#8A6200]" },
  draft: { label: "Draft", className: "bg-[#F3F4F6] text-[#374151]" },
};

export function StatusBadge({ status = "verified", label, className }) {
  const badge = badgeStyles[status] || badgeStyles.draft;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none",
        badge.className,
        className,
      )}
    >
      {label || badge.label}
    </span>
  );
}
