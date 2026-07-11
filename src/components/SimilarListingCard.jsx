import { Link } from "react-router-dom";

/**
 * A simpler teaser card for "Similar Listings" sections. Deliberately
 * NOT the same component as PropertyCard — this one has a price badge
 * overlaid on the image instead of a verified/shortlet tag, no favorite
 * button, and no agent avatar. Forcing PropertyCard to support both
 * layouts via more conditional props would make it harder to read for
 * a difference that's genuinely a different card type, not a variant.
 */
export default function SimilarListingCard({ listing }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="bg-surface-container-lowest rounded-xl overflow-hidden property-shadow group block"
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={listing.imageUrl}
          alt={listing.imageAlt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-label-md px-3 py-1 rounded">
          {listing.formattedPrice}
        </div>
      </div>

      <div className="p-6">
        <h4 className="font-headline-sm text-on-surface mb-2">{listing.title}</h4>
        <p className="text-on-surface-variant text-body-md mb-4">{listing.location}</p>

        <div className="flex justify-between border-t border-outline-variant pt-4">
          {listing.details.map((detail) => (
            <span key={detail.label} className="flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">{detail.icon}</span>
              {detail.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
