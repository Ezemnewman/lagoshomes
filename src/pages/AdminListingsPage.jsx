import { useState } from "react";
import Icon from "../components/Icon";

const DEMO_LISTINGS = [
  { id: "L001", title: "Luxury 4 Bedroom Duplex", agent: "Tunde Bakare", location: "Lekki Phase 1, Lagos", price: "₦150,000,000", type: "For Sale", status: "active", reports: 0, submitted: "Jun 25, 2026" },
  { id: "L002", title: "3 Bedroom Flat", agent: "Bola Adeyemi", location: "Ikeja, Lagos", price: "₦45,000,000", type: "For Sale", status: "pending", reports: 0, submitted: "Jun 28, 2026" },
  { id: "L003", title: "Office Space", agent: "Amaka Nwosu", location: "Victoria Island", price: "₦8,500,000/yr", type: "For Rent", status: "pending", reports: 0, submitted: "Jun 29, 2026" },
  { id: "L004", title: "Suspicious Land Plot", agent: "Unknown Agent", location: "Ibeju-Lekki", price: "₦5,000,000", type: "For Sale", status: "flagged", reports: 3, submitted: "Jun 27, 2026" },
];

const STATUS_STYLES = {
  active: "bg-primary/10 text-primary",
  pending: "bg-secondary/10 text-secondary",
  flagged: "bg-error/10 text-error",
  removed: "bg-surface-container-high text-on-surface-variant",
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState(DEMO_LISTINGS);
  const [filter, setFilter] = useState("all");

  const updateStatus = (id, status) => {
    setListings((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    // TODO: PATCH /api/admin/listings/:id/status once backend exists
  };

  const filtered = filter === "all" ? listings : listings.filter((l) => l.status === filter);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Listing Moderation</h2>
        <p className="text-on-surface-variant">Review, approve, or remove property listings.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "active", "flagged", "removed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full font-label-md text-label-md capitalize transition-colors ${filter === s ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"}`}>
            {s === "all" ? "All Listings" : s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl property-shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
            <tr>
              {["Listing", "Agent", "Price", "Type", "Reports", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {filtered.map((listing) => (
              <tr key={listing.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-bold text-on-surface text-sm">{listing.title}</p>
                  <p className="text-xs text-on-surface-variant">{listing.location}</p>
                </td>
                <td className="px-5 py-4 text-on-surface-variant text-sm">{listing.agent}</td>
                <td className="px-5 py-4 text-primary font-bold text-sm">{listing.price}</td>
                <td className="px-5 py-4 text-on-surface-variant text-sm">{listing.type}</td>
                <td className="px-5 py-4">
                  {listing.reports > 0 ? (
                    <span className="flex items-center gap-1 text-error font-bold text-sm">
                      <Icon name="flag" className="text-sm" filled />{listing.reports}
                    </span>
                  ) : <span className="text-on-surface-variant text-sm">—</span>}
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[listing.status]}`}>
                    {listing.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {listing.status === "pending" && (
                      <button onClick={() => updateStatus(listing.id, "active")} className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:opacity-90">Approve</button>
                    )}
                    {listing.status !== "removed" && listing.status !== "flagged" && (
                      <button onClick={() => updateStatus(listing.id, "flagged")} className="px-3 py-1 border border-error text-error text-xs rounded-full hover:bg-error/5">Flag</button>
                    )}
                    {listing.status !== "removed" && (
                      <button onClick={() => updateStatus(listing.id, "removed")} className="px-3 py-1 bg-error text-white text-xs rounded-full hover:opacity-90">Remove</button>
                    )}
                    {listing.status === "removed" && (
                      <button onClick={() => updateStatus(listing.id, "active")} className="px-3 py-1 border border-primary text-primary text-xs rounded-full hover:bg-primary/5">Restore</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
