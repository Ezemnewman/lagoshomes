import Icon from "../components/Icon";
import { ADMIN_SUMMARY_STATS } from "../data/nigerianLocations";

const RECENT_ACTIVITY = [
  { id: 1, icon: "person_add", text: "New agent application from Emeka Okafor", time: "5m ago", color: "text-primary" },
  { id: 2, icon: "flag", text: "Listing #1042 reported for incorrect pricing", time: "22m ago", color: "text-error" },
  { id: 3, icon: "verified_user", text: "Agent Tunde Bakare approved", time: "1h ago", color: "text-primary" },
  { id: 4, icon: "home_work", text: "15 new listings submitted for review", time: "3h ago", color: "text-secondary" },
  { id: 5, icon: "payments", text: "₦450,000 in subscriptions collected today", time: "6h ago", color: "text-primary" },
];

const QUICK_ACTIONS = [
  { label: "Review Pending Agents", icon: "verified_user", to: "/admin/agents" },
  { label: "Moderate Listings", icon: "home_work", to: "/admin/listings" },
  { label: "View Reports", icon: "flag", to: "/admin/reports" },
  { label: "Update Settings", icon: "settings", to: "/admin/settings" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Super Admin Dashboard</h2>
        <p className="text-on-surface-variant font-body-md">Platform overview and quick actions.</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {ADMIN_SUMMARY_STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl property-shadow p-6">
            <div className="flex justify-between items-start mb-3">
              <Icon name={stat.icon} className="text-primary" />
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="font-bold text-headline-sm text-on-surface">{stat.value}</p>
            <p className="text-on-surface-variant font-label-md text-label-md mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <Icon name={item.icon} className={`${item.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="font-body-md text-body-md text-on-surface">{item.text}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.to}
                className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-center"
              >
                <Icon name={action.icon} className="text-primary text-[32px]" />
                <span className="font-label-md text-label-md text-on-surface">{action.label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
