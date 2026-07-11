import { NavLink } from "react-router-dom";
import Icon from "./Icon";

/**
 * Separate from the buyer dashboard's DashboardSidebar — different nav
 * items entirely (Dashboard/Verifications/My Listings/Messages/
 * Settings vs. Overview/Favorites/Saved Alerts/Messages/Profile
 * Settings), and a "Contact Support" button pinned at the bottom
 * instead of a user info card. Sharing one sidebar component between
 * two genuinely different nav structures would mean more conditional
 * branching than the shared markup would save.
 */
const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", to: "/agent-dashboard" },
  { label: "Verifications", icon: "verified_user", to: "/agent-dashboard/verifications" },
  { label: "My Listings", icon: "home_work", to: "/agent-dashboard/listings" },
  { label: "Messages", icon: "chat", to: "/agent-dashboard/messages" },
  { label: "Settings", icon: "settings", to: "/agent-dashboard/settings" },
];

export default function AgentDashboardSidebar() {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 py-stack-lg z-50">
      <div className="px-6 mb-stack-lg">
        <h1 className="font-headline-md text-headline-md font-bold text-primary">KCEE</h1>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
          Agent Portal
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/agent-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                isActive
                  ? "text-primary font-bold border-r-4 border-primary bg-primary-container/10"
                  : "text-on-surface-variant hover:bg-surface-variant"
              }`
            }
          >
            <Icon name={item.icon} />
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto">
        <button className="w-full py-3 px-4 bg-primary text-white rounded-full font-label-md text-label-md hover:opacity-90 transition-all active:scale-95">
          Contact Support
        </button>
      </div>
    </aside>
  );
}
