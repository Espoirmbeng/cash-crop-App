import { buyerNavigation } from "../../constants/routes";
import { SidebarPanel } from "./DashboardShell";

export function BuyerSidebar({ pathname }) {
  return <SidebarPanel heading="Buyer Workspace" navigation={buyerNavigation} pathname={pathname} />;
}
