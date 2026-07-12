import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../components/Icon";
import { MY_AGENT_LISTINGS } from "../data/nigerianLocations";

const STATUS_STYLES = {
  active: "bg-primary/10 text-primary",
  pending: "bg-secondary/10 text-secondary",
  sold: "bg-surface-container-high text-on-surface-variant",
  rented: "bg-surface-container-high text-on-surface-variant",
};

/**
 * Renders inside AgentDashboardLayout's <Outlet> at /agent-dashboard/listings.
 * Shows all of this agent's listings with status, view/inquiry stats,
 * and action buttons. The "Add New Listing" FAB navigates to the
 * 4-step wizard at /agent-dashboard/listings/new.
 */
export default function MyListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(MY_AGENT_LISTINGS);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? listings
    : listings.filter((l) => l.status === filter);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      // TODO: DELETE /api/listings/:id once backend exists
    }
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <header className="h-20 bg-surface flex justify-between items-center px-8 sticky top-0 z-40 border-b border-outline-variant/30 shadow-sm">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">My Listings</h2>
        <button
          onClick={() => navigate("/agent-dashboard/listings/new")}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95"
        >
          <Icon name="add" />
          Add Listing
        </button>
      </header>

      <div className="p-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {["all", "active", "pending", "sold", "rented"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md capitalize whitespace-nowrap transition-colors ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {status === "all" ? "All Listings" : status}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <Icon name="home_work" className="text-[48px] mb-4 opacity-30" />
            <p className="font-body-md">No listings in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl property-shadow flex flex-col md:flex-row overflow-hidden border border-outline-variant/20"
              >
                <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6 flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {listing.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[listing.status] || STATUS_STYLES.active}`}>
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-on-surface-variant font-body-md flex items-center gap-1 mb-3">
                      <Icon name="location_on" className="text-sm" />
                      {listing.location}
                    </p>
                    <p className="font-bold text-primary">{listing.formattedPrice}</p>
                    <div className="flex gap-6 mt-3 text-on-surface-variant font-label-md text-label-md">
                      <span className="flex items-center gap-1">
                        <Icon name="visibility" className="text-sm" />{listing.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="chat_bubble" className="text-sm" />{listing.inquiries} inquiries
                      </span>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 items-start md:items-end justify-end">
                    <Link
                      to={`/listing/${listing.id}`}
                      className="px-4 py-2 border border-outline-variant rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-1"
                    >
                      <Icon name="visibility" className="text-sm" />
                      View
                    </Link>
                    <button
                      onClick={() => navigate(`/agent-dashboard/listings/new?edit=${listing.id}`)}
                      className="px-4 py-2 border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors flex items-center gap-1"
                    >
                      <Icon name="edit" className="text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="px-4 py-2 border border-error text-error rounded-full font-label-md text-label-md hover:bg-error/5 transition-colors flex items-center gap-1"
                    >
                      <Icon name="delete" className="text-sm" />
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
