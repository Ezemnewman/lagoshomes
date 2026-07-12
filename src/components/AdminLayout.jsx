import { NavLink, Outlet } from "react-router-dom";
import Icon from "./Icon";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", to: "/admin" },
  { label: "Agent Management", icon: "verified_user", to: "/admin/agents" },
  { label: "Listing Moderation", icon: "home_work", to: "/admin/listings" },
  { label: "User Reports", icon: "flag", to: "/admin/reports" },
  { label: "Monetization", icon: "payments", to: "/admin/monetization" },
  { label: "Site Settings", icon: "settings", to: "/admin/settings" },
];

/**
 * Minimal admin shell — full design deferred per decision, just
 * enough structure to make all 6 admin routes navigable and give
 * the pages a consistent sidebar/topbar wrapper.
 */
export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-surface border-r border-outline-variant flex flex-col fixed h-screen z-50">
        <div className="px-6 py-5 border-b border-outline-variant">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">KCEE</h1>
          <p className="font-label-md text-label-md text-error font-bold">Super Admin</p>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-label-md text-label-md ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold border-r-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`
              }
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-error flex items-center justify-center text-white font-bold text-sm">A</div>
            <div>
              <p className="font-label-md text-on-surface text-sm font-bold">Admin</p>
              <p className="text-xs text-on-surface-variant">Super Administrator</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
