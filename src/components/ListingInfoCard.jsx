import { useState } from "react";
import Icon from "./Icon";
import { SITE_CONFIG } from "../data/siteConfig";

/**
 * The sticky right-column card: listing-type badge, share/favorite,
 * price, title, location, bed/bath/sqm stats, and the contact buttons.
 * `stats` is generic (array of {icon, value, label}) so it adapts to
 * land listings (just sqm) the same way PropertyCard's `details` does.
 */
export default function ListingInfoCard({ property, onMessageAgent, onReportListing }) {
  const [isFavorited, setIsFavorited] = useState(property.isFavorited || false);

  const handleFavoriteClick = () => {
    setIsFavorited((prev) => !prev);
    // TODO: connect to POST /api/favorites/:propertyId once auth + backend exist
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: property.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
    // TODO: consider a toast confirmation once a notification system exists
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 property-shadow border border-outline-variant/30">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded font-label-md">
          {property.listingTypeLabel}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            aria-label="Share listing"
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <Icon name="share" className="text-on-surface-variant" />
          </button>
          <button
            onClick={handleFavoriteClick}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <Icon
              name="favorite"
              className={isFavorited ? "text-error" : "text-on-surface-variant"}
              filled={isFavorited}
            />
          </button>
        </div>
      </div>

      <h1 className="text-price-display font-display-lg text-on-surface mb-2">
        {property.formattedPrice}
      </h1>
      <h3 className="font-headline-sm text-on-surface mb-1">{property.title}</h3>
      <p className="text-on-surface-variant flex items-center gap-2 mb-6">
        <Icon name="location_on" className="text-[20px]" />
        {property.location}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-outline-variant">
        {property.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center ${
              index === 1 ? "border-x border-outline-variant" : ""
            }`}
          >
            <Icon name={stat.icon} className="text-primary block mb-1" />
            <span className="font-bold text-on-surface block">{stat.value}</span>
            <span className="block text-[12px] text-on-surface-variant uppercase tracking-tighter">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={onMessageAgent}
          className="w-full bg-primary text-white font-bold py-4 rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          Message Agent
        </button>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
          className="w-full border-2 border-primary text-primary font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors active:scale-[0.98]"
        >
          <Icon name="chat" />
          Chat on WhatsApp
        </a>
        <div className="flex justify-center">
          <button onClick={onReportListing} className="text-error font-label-md hover:underline">
            Report Listing
          </button>
        </div>
      </div>
    </div>
  );
}
