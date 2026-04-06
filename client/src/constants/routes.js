import {
  BarChart3,
  Bell,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  Landmark,
  LayoutGrid,
  Map,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShoppingBasket,
  Sprout,
  Truck,
  Users,
} from "lucide-react";

export const buyerNavigation = [
  { href: "/buyer/dashboard", label: "Dashboard", icon: Home },
  { href: "/buyer/orders", label: "Orders", icon: Package },
  { href: "/buyer/quotes", label: "Quotes", icon: ClipboardList },
  { href: "/buyer/messages", label: "Messages", icon: MessageSquare },
  { href: "/buyer/saved", label: "Saved Listings", icon: ShoppingBasket },
  { href: "/buyer/documents", label: "Documents", icon: FileText },
  { href: "/buyer/profile", label: "Profile", icon: Users },
  { href: "/buyer/settings", label: "Settings", icon: Settings },
];

export const farmerNavigation = [
  { href: "/farmer/dashboard", label: "Dashboard", icon: Home },
  { href: "/farmer/listings", label: "Listings", icon: LayoutGrid },
  { href: "/farmer/orders", label: "Orders", icon: Package },
  { href: "/farmer/messages", label: "Messages", icon: MessageSquare },
  { href: "/farmer/notifications", label: "Notifications", icon: Bell },
  { href: "/farmer/payments", label: "Payments", icon: CreditCard },
  { href: "/farmer/profile", label: "Profile", icon: Users },
  { href: "/farmer/settings", label: "Settings", icon: Settings },
];

export const adminNavigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/listings", label: "Listings", icon: Sprout },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: Landmark },
  { href: "/admin/logistics", label: "Logistics", icon: Truck },
  { href: "/admin/inspections", label: "Inspections", icon: Shield },
  { href: "/admin/disputes", label: "Disputes", icon: ClipboardList },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export const publicMarketplaceLinks = [
  { href: "/browse", label: "Browse Crops", icon: Sprout },
  { href: "/find-farmers", label: "Find Farmers", icon: Users },
  { href: "/request-quote", label: "Request a Quote", icon: ClipboardList },
  { href: "/international", label: "Export Program", icon: Map },
  { href: "/buyer-protection", label: "Buyer Protection", icon: Shield },
];
