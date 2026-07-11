import { useEffect, useRef } from "react";
import DashboardTopbar from "../components/DashboardTopbar";
import PropertyCard from "../components/PropertyCard";
import Icon from "../components/Icon";
import { useFavorites } from "../context/FavoritesContext";
import { DASHBOARD_USER, SEED_FAVORITE_PROPERTIES } from "../data/properties";

/**
 * Real shared favorites, not a fixed demo list — this page renders
 * whatever's actually in FavoritesContext. The Stitch export's "click
 * heart to remove, with a shrink/fade animation" UX is preserved via
 * PropertyCard's own favorite button, which now writes to the same
 * context this page reads from: unfavoriting a card here removes it
 * from this list immediately, and the reverse is true everywhere else
 * PropertyCard appears (Home, Search, Agent Profile, Dashboard
 * Overview).
 *
 * Seeds the context with 3 demo favorites on first mount ONLY if
 * favorites is empty, purely so this page isn't blank for demo
 * purposes. A real backend would instead hydrate the context from
 * GET /api/favorites on login — this seeding logic gets deleted
 * entirely once that exists.
 *
 * Known limitation: `hasSeeded` is a ref scoped to this component
 * instance, so if someone removes every favorite and then navigates
 * away and back, this page re-seeds the demo set on remount. Harmless
 * for a demo, but worth knowing — it goes away entirely once real
 * persisted favorites replace this seeding logic.
 */
export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const hasSeeded = useRef(false);

  useEffect(() => {
    if (!hasSeeded.current && favorites.length === 0) {
      hasSeeded.current = true;
      SEED_FAVORITE_PROPERTIES.forEach((property) => toggleFavorite(property));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search your favorites..." user={DASHBOARD_USER} />

      <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
        <header className="mb-stack-lg flex justify-between items-end">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Your Favorite Properties
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Manage and review the listings you've saved for your next home.
            </p>
          </div>
          <button className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors">
            <Icon name="share" className="text-sm" />
            Share List
          </button>
        </header>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icon name="heart_broken" className="text-6xl text-outline-variant mb-4" />
            <h3 className="font-headline-md text-headline-md text-on-surface">No favorites yet</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
              Start exploring properties and click the heart icon to save the ones you love.
            </p>
            <a
              href="/buy"
              className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-primary-container transition-all"
            >
              Explore Properties
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
