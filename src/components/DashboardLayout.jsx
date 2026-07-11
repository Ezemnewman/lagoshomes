import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

/**
 * Wraps every /dashboard/* route. React Router's nested-route pattern:
 * App.jsx defines a parent <Route path="/dashboard" element={<DashboardLayout />}>
 * with child routes inside it, and <Outlet /> below renders whichever
 * child matched. This is what makes the sidebar persist across
 * Overview/Favorites/etc. instead of each page re-rendering its own
 * copy — exactly the shared-shell pattern asked for.
 */
export default function DashboardLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardSidebar />
      <Outlet />
    </div>
  );
}
