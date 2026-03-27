import Link from "next/link";

export function SectionHeader({ eyebrow, title, description, actionLabel, actionHref }) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-2">
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
        {description ? <p className="body-copy">{description}</p> : null}
      </div>
      {actionLabel && actionHref ? (
        <Link href={actionHref} className="text-[13px] font-semibold text-[#1A6B3C] hover:text-[#2E8B57]">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
