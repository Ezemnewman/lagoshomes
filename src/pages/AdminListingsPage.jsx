import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import api from "../utils/api";

const STATUS_STYLES = {
  ACTIVE: "bg-primary/10 text-primary",
  PENDING: "bg-secondary/10 text-secondary",
  REMOVED: "bg-error/10 text-error",
  SOLD: "bg-surface-container-high text-on-surface-variant",
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 50 });
      if (filter !== "all") params.set("status", filter.toUpperCase());
      else params.set("status", "PENDING"); // Default: show pending for review
      const data = await api.get(`/listings?${params}`);
      setListings(data.listings || []);
    } catch { setListings([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchListings(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/admin/listings/${id}/status`, { status });
      setListings((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    } catch (err) {
      alert(err.message || "Failed to update listing");
    } finally { setUpdating(null); }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Listing Moderation</h2>
        <p className="text-on-surface-variant">Review, approve, or remove property listings.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "active", "removed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full font-label-md text-sm capitalize transition-colors ${
              filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
            }`}>
            {s === "all" ? "Pending Review" : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl property-shadow overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-surface-container rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-xs uppercase tracking-wider">
              <tr>
                {["Listing", "Agent", "Price", "Type", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-bold text-on-surface text-sm">{listing.title}</p>
                    <p className="text-xs text-on-surface-variant">{listing.lga}, {listing.state}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-on-surface-variant">
                    {listing.agent?.fullName || "—"}
                  </td>
                  <td className="px-5 py-4 text-primary font-bold text-sm">
                    ₦{Number(listing.price).toLocaleString("en-NG")}
                  </td>
                  <td className="px-5 py-4 text-sm text-on-surface-variant">
                    {listing.listingType?.replace("_", " ")}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[listing.status] || STATUS_STYLES.PENDING}`}>
                      {listing.status?.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5 flex-wrap">
                      {listing.status === "PENDING" && (
                        <button onClick={() => updateStatus(listing.id, "ACTIVE")}
                          disabled={updating === listing.id}
                          className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:opacity-90 disabled:opacity-50">
                          Approve
                        </button>
                      )}
                      {listing.status !== "REMOVED" && (
                        <button onClick={() => updateStatus(listing.id, "REMOVED")}
                          disabled={updating === listing.id}
                          className="px-3 py-1 bg-error text-white text-xs rounded-full hover:opacity-90 disabled:opacity-50">
                          Remove
                        </button>
                      )}
                      {listing.status === "REMOVED" && (
                        <button onClick={() => updateStatus(listing.id, "ACTIVE")}
                          disabled={updating === listing.id}
                          className="px-3 py-1 border border-primary text-primary text-xs rounded-full hover:bg-primary/5 disabled:opacity-50">
                          Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-on-surface-variant">
                    <Icon name="done_all" className="text-[40px] opacity-20 mb-2" />
                    <p>No listings to review.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
