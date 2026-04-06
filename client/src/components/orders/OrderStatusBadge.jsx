import { StatusBadge } from "../common/StatusBadge";

export function OrderStatusBadge({ status }) {
  return <StatusBadge status={status} label={status?.replace(/-/g, " ") || "Draft"} />;
}
