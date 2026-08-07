import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import api from "../utils/api";

const RECENT_ACTIVITY = [
  { icon: "person_add", text: "New agent application received", time: "Just now", color: "text-primary" },
  { icon: "home_work", text: "New listing submitted for review", time: "5m ago", color: "text-secondary" },
  { icon: "flag", text: "New report filed on a listing", time: "12m ago", color: "text-error" },
  { icon: "verified_user", text: "Agent verification completed", time: "1h ago", color: "text-primary" },
];

const QUICK_ACTIONS = [
  { label: "Review Pending Agents", icon: "verified_user", to: "/admin/agents" },
  { label: "Moderate Listings", icon: "home_work", to: "/admin/listings" },
  { label: "View Reports", icon: "flag", to: "/admin/reports" },
  { label: "Update Settings", icon: "settings", to: "/admin/settings" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get("/admin/stats");
        setStats(data.stats);
      } catch {
        // Fall back to zeros if request fails
        setStats({
          totalUsers: 0, totalAgents: 0, totalListings: 0,
          activeListings: 0, pendingListings: 0,
          totalReports: 0, openReports: 0, activeSubscriptions: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const STAT_CARDS = stats ? [
    { label: "Total Users", value: stats.totalUsers, icon: "people", trend: "+12%" },
    { label: "Verified Agents", value: stats.totalAgents, icon: "verified_user", trend: "+5%" },
    { label: "Active Listings", value: stats.activeListings, icon: "home_work", trend: "+18%" },
    { label: "Open Reports", value: stats.openReports, icon: "flag", trend: stats.openReports > 0 ? "⚠" : "✓" },
    { label: "Pending Listings", value: stats.pendingListings, icon: "pending", trend: "Review" },
    { label: "Subscriptions", value: stats.activeSubscriptions, icon: "subscriptions", trend: "+8%" },
    { label: "Total Listings", value: stats.totalListings, icon: "list_alt", trend: "All time" },
    { label: "Total Reports", value: stats.totalReports, icon: "report", trend: "All time" },
  ] : [];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Super Admin Dashboard</h2>
        <p className="text-on-surface-variant">Platform overview and quick actions.</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {loading ? Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-surface-container rounded-xl h-28 animate-pulse" />
        )) : STAT_CARDS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl property-shadow p-6">
            <div className="flex justify-between items-start mb-3">
              <Icon name={stat.icon} className="text-primary" />
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="font-bold text-2xl text-on-surface">{stat.value}</p>
            <p className="text-on-surface-variant font-label-md text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-on-surface mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Icon name={item.icon} className={`${item.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-on-surface text-sm">{item.text}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-on-surface mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} to={action.to}
                className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-center">
                <Icon name={action.icon} className="text-primary text-[32px]" />
                <span className="font-label-md text-on-surface text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
