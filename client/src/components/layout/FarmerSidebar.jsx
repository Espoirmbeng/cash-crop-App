import { farmerNavigation } from "../../constants/routes";
import { SidebarPanel } from "./DashboardShell";

export function FarmerSidebar({ pathname }) {
  return <SidebarPanel heading="Farmer Workspace" navigation={farmerNavigation} pathname={pathname} />;
}
