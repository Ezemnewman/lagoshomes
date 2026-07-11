import { Outlet } from "react-router-dom";
import AgentDashboardSidebar from "./AgentDashboardSidebar";

/**
 * Wraps every /agent-dashboard/* route, same nested-route + <Outlet>
 * pattern as the buyer DashboardLayout. Kept as a fully separate
 * component (not a variant of DashboardLayout) since the sidebar,
 * nav items, and overall information architecture genuinely differ
 * between the buyer and agent areas — this is two different products
 * sharing a visual language, not one dashboard with two modes.
 */
export default function AgentDashboardLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <AgentDashboardSidebar />
      <Outlet />
    </div>
  );
}
