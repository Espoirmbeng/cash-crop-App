import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoAdminUsers } from "@/lib/demo-data";

export default function AdminUsersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Admin users"
        title="Profiles, roles, and approval state"
        description="Review user onboarding outcomes and preview the moderation surfaces that sit on top of the real auth layer."
      />

      <div className="grid gap-4">
        {demoAdminUsers.map((user) => (
          <Card key={user.id} className="rounded-[18px] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-[22px] text-[#111827]">{user.name}</h2>
                  <StatusBadge
                    status={user.status === "active" ? "verified" : "pending"}
                    label={user.status.replace(/_/g, " ")}
                  />
                </div>
                <p className="text-[13px] text-[#374151]">Role: {user.role.replace(/_/g, " ")}</p>
                <p className="text-[12px] text-[#6B7280]">Region: {user.region}</p>
              </div>

              <Link href={`/admin/users/${user.id}`} className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1A6B3C]">
                Open user
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
