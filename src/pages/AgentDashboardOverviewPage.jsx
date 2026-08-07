import { useState, useEffect } from "react";
import AgentDashboardTopbar from "../components/AgentDashboardTopbar";
import Icon from "../components/Icon";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function AgentDashboardOverviewPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [listings, setListings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsData, inquiriesData] = await Promise.allSettled([
          api.get("/listings/my-listings?limit=5"),
          api.get("/inquiries"),
        ]);
        if (listingsData.status === "fulfilled") {
          const ls = listingsData.value.listings || [];
          setListings(ls);
          setStats({
            totalListings: listingsData.value.pagination?.total || ls.length,
            activeListings: ls.filter((l) => l.status === "ACTIVE").length,
            totalViews: ls.reduce((sum, l) => sum + (l.views || 0), 0),
            totalInquiries: inquiriesData.status === "fulfilled"
              ? (inquiriesData.value.inquiries?.length || 0)
              : 0,
          });
        }
        if (inquiriesData.status === "fulfilled") {
          setInquiries(inquiriesData.value.inquiries?.slice(0, 5) || []);
        }
      } catch {}
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const agent = user ? {
    name: user.fullName,
    role: user.agentProfile?.agencyName || "Agent",
    verified: user.agentProfile?.status === "APPROVED",
    online: true,
    avatarUrl: user.avatarUrl,
  } : { name: "...", role: "", verified: false, online: false };

  const STAT_CARDS = stats ? [
    { label: "Total Listings", value: stats.totalListings, icon: "list_alt" },
    { label: "Active Listings", value: stats.activeListings, icon: "home_work" },
    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: "visibility" },
    { label: "Inquiries", value: stats.totalInquiries, icon: "chat_bubble", highlight: true },
  ] : [];

  const CHART_BARS = [40, 65, 50, 85, 70, 95, 60];
  const CHART_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <AgentDashboardTopbar pageTitle="Overview" agent={agent} />

      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {loading ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-container rounded-xl h-28 animate-pulse" />
          )) : STAT_CARDS.map((stat) => (
            <div key={stat.label}
              className={`bg-white p-6 rounded-xl property-shadow ${stat.highlight ? "border-l-4 border-secondary" : ""}`}>
              <Icon name={stat.icon} className={stat.highlight ? "text-secondary mb-2" : "text-primary mb-2"} />
              <p className={`font-bold text-2xl ${stat.highlight ? "text-secondary" : "text-primary"}`}>
                {stat.value}
              </p>
              <p className="text-on-surface-variant font-label-md text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Chart */}
        <section className="bg-white rounded-xl property-shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-on-surface">Listing Views (Last 7 Days)</h3>
            <div className="flex gap-2">
              {["daily", "weekly"].map((v) => (
                <button key={v} onClick={() => setChartView(v)}
                  className={`px-3 py-1 rounded-full text-xs capitalize transition-colors ${
                    chartView === v ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant"
                  }`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {CHART_BARS.map((h, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="w-full bg-primary rounded-t-sm transition-all"
                  style={{ height: `${h}%`, opacity: 0.3 + h / 150 }} />
                <span className="text-[10px] text-on-surface-variant mt-1">{CHART_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Listings */}
        <section className="bg-white rounded-xl property-shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-on-surface">My Listings</h3>
            <Link to="/agent-dashboard/listings" className="text-primary font-label-md text-sm hover:underline">
              View All
            </Link>
          </div>
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-surface-container rounded-lg animate-pulse" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-10 text-on-surface-variant">
              <Icon name="home_work" className="text-[40px] opacity-20 mb-2" />
              <p>No listings yet.</p>
              <Link to="/agent-dashboard/listings/new"
                className="mt-3 inline-block bg-primary text-white px-6 py-2 rounded-full font-label-md text-sm hover:opacity-90">
                Add Your First Listing
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/30">
              {listings.map((listing) => (
                <div key={listing.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                    {listing.photos?.[0] ? (
                      <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : <Icon name="home" className="text-outline m-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">{listing.title}</p>
                    <p className="text-xs text-on-surface-variant">{listing.lga}, {listing.state}</p>
                  </div>
                  <p className="text-primary font-bold text-sm">₦{Number(listing.price).toLocaleString("en-NG")}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${
                    listing.status === "ACTIVE" ? "bg-primary/10 text-primary" :
                    listing.status === "PENDING" ? "bg-secondary/10 text-secondary" :
                    "bg-surface-container-high text-on-surface-variant"
                  }`}>
                    {listing.status.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Inquiries */}
        {inquiries.length > 0 && (
          <section className="bg-white rounded-xl property-shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant">
              <h3 className="font-headline-sm text-on-surface">Recent Inquiries</h3>
            </div>
            <div className="divide-y divide-outline-variant/30">
              {inquiries.map((inq) => (
                <div key={inq.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-on-surface">
                      {inq.listing?.title || "Listing"}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {inq.messages?.[0]?.content || "New inquiry"}
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    {new Date(inq.createdAt || Date.now()).toLocaleDateString("en-NG")}
                  </span>
                  <Link to="/agent-dashboard/messages"
                    className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
                    <Icon name="reply" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAB */}
        <Link to="/agent-dashboard/listings/new"
          className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all active:scale-95 z-50"
          aria-label="Add new listing">
          <Icon name="add" />
        </Link>
      </div>
    </main>
  );
}
