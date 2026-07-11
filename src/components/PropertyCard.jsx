import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useFavorites } from "../context/FavoritesContext";

/**
 * The single most important reuse win in this whole conversion.
 * The Stitch export had this exact card hand-copied 6 times with only
 * text/numbers changed. Now it's one component driven by a `property`
 * object — which also means later, swapping in real data from
 * `GET /api/listings` is just passing a different array into .map(),
 * no markup changes needed.
 *
 * `details` is intentionally generic (array of {icon, label}) rather
 * than hardcoded "beds/baths" fields, because land and office listings
 * show different stats (sqm) than houses do (beds/baths) — see
 * src/data/properties.js for both shapes.
 *
 * `tag` replaces the old hardcoded "Verified Agent" badge. The search
 * results export showed the same top-left badge slot used for THREE
 * different things across cards: a verified-agent badge, a blue
 * "Shortlet" label, or nothing at all. Rather than building separate
 * components for each, `tag` is one optional object: { label, variant }
 * where variant is "verified" | "info" | undefined. Land listings and
 * basic flats just omit it.
 *
 * `agentAvatarUrl` is optional — the search results page shows a small
 * circular agent photo bottom-right on some cards; the home page never
 * had this, so it's additive and won't affect existing usages.
 *
 * `typeBadge` is a second, optional badge (e.g. "For Sale") shown
 * bottom-left — the agent profile page export stacks a listing-type
 * badge AND a verified badge on the same card, which `tag` alone can't
 * express since it's one slot. Kept separate from `tag` because "what
 * kind of listing is this" and "is this agent verified" are different
 * facts that happen to both render as small badges, not variants of
 * the same concept.
 *
 * Favorite state now comes from FavoritesContext instead of local
 * useState — favoriting a property here is what makes it show up on
 * the buyer dashboard's Favorites page, and unfavoriting it there
 * removes the highlighted heart here too, since both read the same
 * shared source of truth. The old `onFavoriteToggle` callback prop is
 * gone; the context already notifies every consumer automatically.
 */
export default function PropertyCard({ property }) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(property.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(property);
    // TODO: sync to POST/DELETE /api/favorites/:propertyId once backend exists
  };

  const tagStyles =
    property.tag?.variant === "info"
      ? "bg-primary text-white"
      : "bg-secondary text-on-secondary"; // default: verified-agent gold styling

  return (
    <Link
      to={`/listing/${property.id}`}
      className="bg-surface rounded-xl shadow-md overflow-hidden group border border-outline-variant hover:shadow-lg transition-shadow block"
    >
      <div className="relative aspect-video">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={property.imageUrl}
          alt={property.imageAlt}
        />

        {property.typeBadge && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
            {property.typeBadge}
          </div>
        )}

        {property.tag && (
          <div
            className={`absolute ${
              property.typeBadge ? "bottom-3" : "top-3"
            } left-3 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm ${tagStyles}`}
          >
            {property.tag.variant !== "info" && (
              <Icon name="verified" className="text-sm" filled />
            )}
            {property.tag.label}
          </div>
        )}

        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 w-10 h-10 bg-surface/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-surface ${
            favorited ? "text-error" : "text-on-surface-variant hover:text-error"
          }`}
        >
          <Icon name="favorite" filled={favorited} />
        </button>

        {property.agentAvatarUrl && (
          <div className="absolute bottom-3 right-3">
            <img
              src={property.agentAvatarUrl}
              alt="Listing agent"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-headline-sm text-headline-sm mb-1 truncate">{property.title}</h3>

        <div className="flex items-center text-on-surface-variant text-sm mb-3">
          <Icon name="location_on" className="text-sm mr-1" />
          {property.location}
        </div>

        <div className="text-primary font-price-display text-price-display mb-4">
          {property.formattedPrice}
        </div>

        <div className="flex items-center gap-4 text-on-surface-variant border-t border-outline-variant pt-4">
          {property.details.map((detail) => (
            <div key={detail.label} className="flex items-center gap-1">
              <Icon name={detail.icon} className="text-lg" />
              <span className="text-sm">{detail.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
