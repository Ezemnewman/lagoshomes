import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import Icon from "../components/Icon";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const dashboardUser = user ? {
    name: user.fullName,
    tier: "Premium Member",
    initials: user.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
    avatarUrl: user.avatarUrl,
  } : { name: "...", tier: "", initials: "?" };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.get("/favorites");
        setFavorites(data.favorites || []);
      } catch {}
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleRemove = async (listingId) => {
    setRemovingId(listingId);
    try {
      await api.post(`/favorites/${listingId}`); // toggles off
      setTimeout(() => {
        setFavorites((prev) => prev.filter((l) => l.id !== listingId));
        setRemovingId(null);
      }, 300);
    } catch { setRemovingId(null); }
  };

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search favorites..." user={dashboardUser} />

      <main className="pt-24 pb-12 px-8 max-w-4xl mx-auto">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">Saved Properties</h2>
        <p className="text-on-surface-variant mb-8">Properties you've saved for later.</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface-container rounded-xl h-40 animate-pulse" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 text-on-surface-variant">
            <Icon name="favorite_border" className="text-[64px] opacity-20 mb-4" />
            <p className="font-headline-sm">No saved properties yet</p>
            <p className="text-sm mt-2 mb-6">Click the heart icon on any listing to save it here.</p>
            <Link to="/buy" className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:opacity-90">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((listing) => (
              <div key={listing.id}
                className="bg-white rounded-xl property-shadow flex overflow-hidden border border-outline-variant/20 transition-all"
                style={removingId === listing.id ? { opacity: 0.4, transform: "translateX(20px)" } : undefined}>
                <div className="w-40 h-32 flex-shrink-0">
                  <img src={listing.photos?.[0] || "https://via.placeholder.com/160x128?text=No+Photo"}
                    alt={listing.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex justify-between items-start">
                  <div>
                    <p className="font-bold text-primary">₦{Number(listing.price).toLocaleString("en-NG")}</p>
                    <p className="font-label-md font-bold text-on-surface">{listing.title}</p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                      <Icon name="location_on" className="text-xs" />
                      {listing.lga}, {listing.state}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {listing.bedrooms != null && (
                        <span className="text-xs text-on-surface-variant flex items-center gap-1">
                          <Icon name="bed" className="text-xs" />{listing.bedrooms} Beds
                        </span>
                      )}
                      {listing.bathrooms != null && (
                        <span className="text-xs text-on-surface-variant flex items-center gap-1">
                          <Icon name="bathtub" className="text-xs" />{listing.bathrooms} Baths
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Link to={`/listing/${listing.id}`}
                      className="px-3 py-1.5 border border-primary text-primary text-xs rounded-full hover:bg-primary/5">
                      View
                    </Link>
                    <button onClick={() => handleRemove(listing.id)}
                      className="px-3 py-1.5 border border-error text-error text-xs rounded-full hover:bg-error/5">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
