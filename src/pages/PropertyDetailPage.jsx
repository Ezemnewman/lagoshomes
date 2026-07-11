import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import PropertyGallery from "../components/PropertyGallery";
import AmenitiesGrid from "../components/AmenitiesGrid";
import PricingBreakdown from "../components/PricingBreakdown";
import LocationSection from "../components/LocationSection";
import ListingInfoCard from "../components/ListingInfoCard";
import AgentContactCard from "../components/AgentContactCard";
import SimilarListingCard from "../components/SimilarListingCard";
import { DEMO_LISTING_DETAIL, SIMILAR_LISTINGS, DEMO_USER } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Navigation",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

/**
 * Assembles all the listing-detail components around one `listing`
 * object. Currently fed DEMO_LISTING_DETAIL directly; once the backend
 * exists, this becomes `GET /api/listings/:id` keyed off a route param
 * (e.g. via react-router's useParams) instead of a static import —
 * none of the child components need to change for that swap.
 */
export default function PropertyDetailPage({ listing = DEMO_LISTING_DETAIL }) {
  const navigate = useNavigate();

  const handleMessageAgent = () => {
    console.log("Message Agent clicked for listing:", listing.id);
    // TODO: open messaging thread once the messaging system exists
  };

  const handleReportListing = () => {
    navigate(`/listing/${listing.id}/report`);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Navbar user={DEMO_USER} />

      <main className="pt-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column: media + content */}
          <div className="lg:col-span-8 space-y-8">
            <PropertyGallery
              photos={listing.photos}
              videoUrl={listing.videoUrl}
              totalPhotoCount={listing.totalPhotoCount}
            />

            <section className="bg-surface-container-lowest rounded-xl p-8 property-shadow space-y-8">
              <div>
                <h2 className="font-headline-md text-headline-md mb-4">Description</h2>
                <div className="text-on-surface-variant font-body-md space-y-4">
                  {listing.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <hr className="border-outline-variant" />

              <div>
                <h2 className="font-headline-md text-headline-md mb-6">Amenities</h2>
                <AmenitiesGrid amenities={listing.amenities} />
              </div>

              {listing.showPricingBreakdown && (
                <>
                  <hr className="border-outline-variant" />
                  <div>
                    <h2 className="font-headline-md text-headline-md mb-6">Pricing Breakdown</h2>
                    <PricingBreakdown
                      basePrice={listing.pricing.basePrice}
                      fees={listing.pricing.fees}
                    />
                  </div>
                </>
              )}

              <hr className="border-outline-variant" />

              <LocationSection
                mapImageUrl={listing.mapImageUrl}
                mapImageAlt={listing.mapImageAlt}
                nearbyPlaceGroups={listing.nearbyPlaceGroups}
              />
            </section>
          </div>

          {/* Right column: sticky info + agent card */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <ListingInfoCard
              property={listing}
              onMessageAgent={handleMessageAgent}
              onReportListing={handleReportListing}
            />
            <AgentContactCard agent={listing.agent} />
          </div>
        </div>

        {/* Similar Listings */}
        <section className="mt-stack-lg">
          <h2 className="font-display-lg text-headline-md mb-8">Similar Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {SIMILAR_LISTINGS.map((similar) => (
              <SimilarListingCard key={similar.id} listing={similar} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter
        linkColumns={FOOTER_LINK_COLUMNS}
        fourthColumn={{
          type: "contact",
          address: "Lekki Phase 1, Lagos, Nigeria",
          email: "support@kcee.com",
        }}
      />
    </div>
  );
}
