import { adminNavigation } from "../../constants/routes";
import { SidebarPanel } from "./DashboardShell";

export function AdminSidebar({ pathname }) {
  return <SidebarPanel heading="Admin Operations" navigation={adminNavigation} pathname={pathname} />;
}
