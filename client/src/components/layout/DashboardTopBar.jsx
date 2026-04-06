"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export function DashboardTopBar({ title, description, user, onLogout }) {
  return (
    <div className="flex flex-col gap-4 rounded-[18px] border border-[#E5E7EB] bg-white px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <p className="section-eyebrow">Workspace</p>
        <h1 className="font-display text-[22px] leading-[1.15] text-[#111827]">{title}</h1>
        {description ? <p className="text-[13px] leading-6 text-[#374151]">{description}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full bg-[#F3F4F6] px-3 py-2 text-[12px] text-[#374151]">
          Signed in as <span className="font-semibold text-[#111827]">{user?.first_name || user?.email || "AgriculNet user"}</span>
        </div>
        <Button type="button" variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
