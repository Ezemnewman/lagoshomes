import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Icon from "../components/Icon";
import api from "../utils/api";

const STATUS_STYLES = {
  ACTIVE: "bg-primary/10 text-primary",
  PENDING: "bg-secondary/10 text-secondary",
  SOLD: "bg-surface-container-high text-on-surface-variant",
  RENTED: "bg-surface-container-high text-on-surface-variant",
  REMOVED: "bg-error/10 text-error",
  DRAFT: "bg-surface-container text-on-surface-variant",
};

export default function MyListingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [allowance, setAllowance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const successMessage = location.state?.successMessage;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [listingsData, allowanceData] = await Promise.allSettled([
          api.get(`/listings/my-listings${filter !== "all" ? `?status=${filter.toUpperCase()}` : ""}`),
          api.get("/listings/allowance"),
        ]);
        if (listingsData.status === "fulfilled") setListings(listingsData.value.listings || []);
        if (allowanceData.status === "fulfilled") setAllowance(allowanceData.value);
      } catch {}
      finally { setLoading(false); }
    };
    fetchData();
  }, [filter]);

  const handleAddListing = () => {
    if (!allowance?.canPost) return; // button is disabled if can't post
    navigate("/agent-dashboard/listings/new");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await api.delete(`/listings/${id}`);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete listing");
    }
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <header className="h-20 bg-surface border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">My Listings</h2>
        <button
          onClick={handleAddListing}
          disabled={!allowance?.canPost && allowance !== null}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="add" />
          Add Listing
        </button>
      </header>

      <div className="p-8 space-y-6">
        {/* Success message */}
        {successMessage && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
            <Icon name="check_circle" className="text-primary" filled />
            <p className="font-label-md text-primary">{successMessage}</p>
          </div>
        )}

        {/* Subscription status banner */}
        {allowance && (
          <div className={`rounded-xl p-5 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            allowance.hasActiveSubscription
              ? "bg-primary/5 border-primary/20"
              : allowance.remainingFree > 0
              ? "bg-secondary/5 border-secondary/20"
              : "bg-error/5 border-error/20"
          }`}>
            <div className="flex items-start gap-3">
              <Icon
                name={allowance.hasActiveSubscription ? "verified" : allowance.remainingFree > 0 ? "info" : "lock"}
                className={allowance.hasActiveSubscription ? "text-primary mt-0.5" : allowance.remainingFree > 0 ? "text-secondary mt-0.5" : "text-error mt-0.5"}
                filled
              />
              <div>
                {allowance.hasActiveSubscription ? (
                  <>
                    <p className="font-bold text-primary">
                      {allowance.subscriptionTier} Plan — Active
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      Unlimited listings until{" "}
                      {new Date(allowance.subscriptionExpiry).toLocaleDateString("en-NG", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                  </>
                ) : allowance.remainingFree > 0 ? (
                  <>
                    <p className="font-bold text-secondary">
                      {allowance.remainingFree} free listing remaining
                    </p>
                    <p className="text-sm text-on-surface-variant">
                      You get 1 free listing. Subscribe to post unlimited properties.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-error">Free listing used</p>
                    <p className="text-sm text-on-surface-variant">
                      You've used your 1 free listing. Subscribe to add more properties.
                    </p>
                  </>
                )}
              </div>
            </div>

            {!allowance.hasActiveSubscription && (
              <Link
                to="/agent-dashboard/subscription"
                className="flex-shrink-0 flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-label-md text-sm hover:opacity-90 transition-all"
              >
                <Icon name="workspace_premium" className="text-sm" />
                {allowance.remainingFree > 0 ? "View Plans" : "Subscribe Now"}
              </Link>
            )}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "active", "pending", "sold", "rented"].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full font-label-md text-sm capitalize whitespace-nowrap transition-colors ${
                filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
              }`}>
              {s === "all" ? "All Listings" : s}
            </button>
          ))}
        </div>

        {/* Listings */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-surface-container rounded-xl h-32 animate-pulse" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <Icon name="home_work" className="text-[48px] opacity-30 mb-4" />
            <p className="font-headline-sm">No listings yet</p>
            {allowance?.canPost ? (
              <button onClick={handleAddListing}
                className="mt-4 bg-primary text-white px-6 py-2.5 rounded-full font-label-md hover:opacity-90">
                Add Your First Listing (Free)
              </button>
            ) : (
              <Link to="/agent-dashboard/subscription"
                className="mt-4 inline-block bg-primary text-white px-6 py-2.5 rounded-full font-label-md hover:opacity-90">
                Subscribe to Add Listings
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id}
                className="bg-white rounded-xl property-shadow flex flex-col md:flex-row overflow-hidden border border-outline-variant/20">
                <div className="w-full md:w-48 h-36 md:h-auto flex-shrink-0 bg-surface-container">
                  {listing.photos?.[0] ? (
                    <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="home" className="text-outline text-[40px]" />
                    </div>
                  )}
                </div>
                <div className="flex-1 p-5 flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="font-bold text-on-surface">{listing.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize flex-shrink-0 ${STATUS_STYLES[listing.status] || STATUS_STYLES.PENDING}`}>
                        {listing.status?.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm flex items-center gap-1 mb-2">
                      <Icon name="location_on" className="text-sm" />{listing.lga}, {listing.state}
                    </p>
                    <p className="font-bold text-primary">₦{Number(listing.price).toLocaleString("en-NG")}</p>
                    <div className="flex gap-4 mt-2 text-xs text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <Icon name="visibility" className="text-xs" />{listing.views || 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="chat_bubble" className="text-xs" />
                        {listing._count?.inquiries || 0} inquiries
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 items-start md:items-end">
                    <Link to={`/listing/${listing.id}`}
                      className="px-4 py-2 border border-outline-variant rounded-full text-sm font-label-md hover:bg-surface-container transition-colors">
                      View
                    </Link>
                    <button onClick={() => handleDelete(listing.id)}
                      className="px-4 py-2 border border-error text-error rounded-full text-sm font-label-md hover:bg-error/5 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
