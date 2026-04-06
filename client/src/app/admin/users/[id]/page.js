import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { demoAdminUsers, demoFarmers } from "@/lib/demo-data";

export default function AdminUserDetailPage({ params }) {
  const user = demoAdminUsers.find((item) => item.id === params.id);

  if (!user) {
    notFound();
  }

  const farmerProfile = demoFarmers.find((item) => item.name === user.name);

  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Users", href: "/admin/users" },
          { label: user.name },
        ]}
      />

      <PageHeader
        eyebrow="User detail"
        title={`${user.name} profile review`}
        description="Inspect role, review status, and the supporting context behind this account."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-[18px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="section-eyebrow">{user.id}</p>
              <h2 className="mt-2 font-display text-[24px] text-[#111827]">{user.name}</h2>
            </div>
            <StatusBadge
              status={user.status === "active" ? "verified" : "pending"}
              label={user.status.replace(/_/g, " ")}
            />
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Role", user.role.replace(/_/g, " ")],
              ["Region", user.region],
              ["Review lane", user.role === "farmer" ? "Field verification" : "Buyer compliance" ],
              ["Current action", user.status === "active" ? "Monitor operations" : "Complete approval review"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[12px] bg-[#F9FAFB] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
                <p className="mt-2 text-[14px] font-medium text-[#111827]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[18px] p-5">
          <h2 className="font-display text-[22px] text-[#111827]">Supporting context</h2>
          {farmerProfile ? (
            <div className="mt-5 space-y-3">
              <p className="text-[13px] leading-6 text-[#374151]">{farmerProfile.bio}</p>
              {farmerProfile.stats.map((stat) => (
                <div key={stat.label} className="rounded-[12px] border border-[#E5E7EB] px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">{stat.label}</p>
                  <p className="mt-2 text-[16px] font-semibold text-[#111827]">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {[
                "Buyer onboarding uses the real auth backend and now preserves country and destination details.",
                "Non-auth operational data on this screen is intentionally demo-backed for local preview.",
                "This route confirms the admin detail path compiles and renders cleanly.",
              ].map((item) => (
                <div key={item} className="rounded-[12px] border border-[#E5E7EB] px-4 py-3 text-[13px] leading-6 text-[#374151]">
                  {item}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
