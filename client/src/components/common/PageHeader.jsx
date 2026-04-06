import { cn } from "../../lib/utils";

export function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-2">
          <h1 className="font-display text-[24px] leading-[1.15] text-[#111827]">{title}</h1>
          {description ? <p className="body-copy">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
