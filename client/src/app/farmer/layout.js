"use client";

import { DashboardShell } from "../../components/layout/DashboardShell";
import { farmerNavigation } from "../../constants/routes";

export default function FarmerRouteLayout({ children }) {
  return (
    <DashboardShell
      heading="Farmer Workspace"
      navigation={farmerNavigation}
      allowedRoles={["farmer"]}
      authRedirect="/sign-in"
      description="Manage listings, buyer conversations, payouts, and verification progress with a single view."
    >
      {children}
    </DashboardShell>
  );
}
