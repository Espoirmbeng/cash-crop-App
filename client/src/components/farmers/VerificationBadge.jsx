import { StatusBadge } from "../common/StatusBadge";

export function VerificationBadge({ status }) {
  return <StatusBadge status={status} label={status === "verified" ? "Verified farmer" : "In review"} />;
}
