import { NavLink } from "react-router-dom";
import Icon from "./Icon";

/**
 * Reconciles small drift between the Overview and Favorites Stitch
 * exports: same 5 nav items and active-state styling in both, but the
 * Favorites export additionally bolds the icon (FILL 1) on the active
 * item, which Overview's export didn't do. Standardized on showing the
 * filled icon only for the active tab — small enough to be a deliberate
 * polish, not real fragmentation worth flagging as a decision.
 *
 * Uses NavLink so active state is automatic from the URL instead of a
 * hardcoded "this one's bold" class — same pattern as the main Navbar.
 */
const NAV_ITEMS = [
  { label: "Overview", icon: "dashboard", to: "/dashboard" },
  { label: "Favorites", icon: "favorite", to: "/dashboard/favorites" },
  { label: "Saved Alerts", icon: "notifications_active", to: "/dashboard/alerts" },
  { label: "Messages", icon: "mail", to: "/dashboard/messages" },
  { label: "Profile Settings", icon: "settings", to: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-stack-lg z-50">
      <div className="px-6 mb-8">
        <h1 className="text-headline-md font-headline-md text-primary">KCEE</h1>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1">
          Buyer Dashboard
        </p>
      </div>

      <nav className="flex-1 flex flex-col">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 transition-colors font-label-md ${
                isActive
                  ? "text-primary font-bold border-r-4 border-primary bg-surface-container-low"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              } ${item.label === "Profile Settings" ? "mt-auto" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} filled={isActive} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
