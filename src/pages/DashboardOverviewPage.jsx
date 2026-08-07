import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import PropertyCard from "../components/PropertyCard";
import Icon from "../components/Icon";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const [recentListings, setRecentListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, favData, alertsData] = await Promise.allSettled([
          api.get("/listings?limit=3&sortBy=createdAt&sortOrder=desc"),
          api.get("/favorites"),
          api.get("/alerts"),
        ]);
        if (listingsData.status === "fulfilled") setRecentListings(listingsData.value.listings || []);
        if (favData.status === "fulfilled") setFavorites(favData.value.favorites || []);
        if (alertsData.status === "fulfilled") setAlerts(alertsData.value.alerts || []);
      } catch {}
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const toCardShape = (listing) => ({
    id: listing.id,
    title: listing.title,
    location: `${listing.lga}, ${listing.state}`,
    formattedPrice: `₦${Number(listing.price).toLocaleString("en-NG")}`,
    imageUrl: listing.photos?.[0] || "https://via.placeholder.com/400x300?text=No+Photo",
    imageAlt: listing.title,
    details: [
      ...(listing.bedrooms != null ? [{ icon: "bed", label: `${listing.bedrooms}` }] : []),
      ...(listing.bathrooms != null ? [{ icon: "bathtub", label: `${listing.bathrooms}` }] : []),
    ],
  });

  const dashboardUser = user ? {
    name: user.fullName,
    tier: "Premium Member",
    initials: user.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    avatarUrl: user.avatarUrl,
  } : { name: "...", tier: "", initials: "?" };

  const stats = [
    { label: "Saved Listings", value: favorites.length, icon: "favorite", to: "/dashboard/favorites" },
    { label: "Active Alerts", value: alerts.filter((a) => a.status === "ACTIVE").length, icon: "notifications_active", to: "/dashboard/alerts" },
    { label: "Messages", value: 0, icon: "mail", to: "/dashboard/messages" },
  ];

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search listings..." user={dashboardUser} />

      <main className="pt-24 pb-12 px-8 max-w-5xl mx-auto space-y-10">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-1">
            Welcome back, {user?.fullName?.split(" ")[0] || "there"}!
          </h2>
          <p className="text-on-surface-variant font-body-md">
            Here's what's happening with your property search.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.to}
              className="bg-white rounded-xl property-shadow p-6 hover:shadow-md transition-all">
              <Icon name={stat.icon} className="text-primary mb-3" />
              <p className="font-bold text-[28px] text-primary">{loading ? "—" : stat.value}</p>
              <p className="text-on-surface-variant font-label-md">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Recent Listings */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">New Listings</h3>
            <Link to="/buy" className="text-primary font-label-md hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-surface-container rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : recentListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {recentListings.map((l) => <PropertyCard key={l.id} property={toCardShape(l)} />)}
            </div>
          ) : (
            <div className="text-center py-10 text-on-surface-variant">
              <Icon name="home_work" className="text-[40px] opacity-20 mb-2" />
              <p>No listings yet — check back soon.</p>
            </div>
          )}
        </section>

        {/* Quick links */}
        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-on-surface mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Browse Properties", icon: "search", to: "/buy" },
              { label: "My Favorites", icon: "favorite", to: "/dashboard/favorites" },
              { label: "Saved Alerts", icon: "notifications_active", to: "/dashboard/alerts" },
              { label: "My Messages", icon: "mail", to: "/dashboard/messages" },
            ].map((action) => (
              <Link key={action.label} to={action.to}
                className="flex flex-col items-center gap-2 p-4 bg-surface-container-low rounded-xl hover:bg-primary/10 hover:text-primary transition-colors text-center">
                <Icon name={action.icon} className="text-primary text-[28px]" />
                <span className="font-label-md text-on-surface text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
