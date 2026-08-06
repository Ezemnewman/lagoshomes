import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import PropertyGallery from "../components/PropertyGallery";
import AmenitiesGrid from "../components/AmenitiesGrid";
import PricingBreakdown from "../components/PricingBreakdown";
import LocationSection from "../components/LocationSection";
import ListingInfoCard from "../components/ListingInfoCard";
import AgentContactCard from "../components/AgentContactCard";
import SimilarListingCard from "../components/SimilarListingCard";
import Icon from "../components/Icon";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

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

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get(`/listings/${id}`);
        setListing(data.listing);

        // Fetch similar listings
        try {
          const similarData = await api.get(`/listings/${id}/similar`);
          setSimilarListings(similarData.listings || []);
        } catch {}
      } catch (err) {
        setError(err.status === 404 ? "Listing not found" : "Failed to load listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleMessageAgent = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/dashboard/messages`);
  };

  const handleReportListing = () => {
    navigate(`/listing/${id}/report`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar user={user} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <Icon name="progress_activity" className="animate-spin text-primary text-[48px]" />
            <p className="text-on-surface-variant">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col bg-surface">
        <Navbar user={user} />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <Icon name="home_work" className="text-[64px] text-outline-variant mb-4" />
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
              {error || "Listing not found"}
            </h2>
            <p className="text-on-surface-variant mb-6">
              This property may have been removed or the link is incorrect.
            </p>
            <button
              onClick={() => navigate("/buy")}
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90"
            >
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Convert backend shape to what the existing components expect
  const galleryPhotos = listing.photos?.map((url, i) => ({
    url,
    alt: `${listing.title} - photo ${i + 1}`,
  })) || [];

  const amenitiesForGrid = listing.amenities?.map((id) => ({
    id,
    label: id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    icon: "check_circle",
  })) || [];

  const agentForCard = listing.agent ? {
    id: listing.agent.id,
    name: listing.agent.fullName,
    photoUrl: listing.agent.avatarUrl,
    agencyName: listing.agent.agentProfile?.agencyName,
    phone: listing.agent.phone,
    verified: listing.agent.agentProfile?.status === "APPROVED",
  } : null;

  const listingForInfoCard = {
    id: listing.id,
    listingTypeLabel: listing.listingType?.replace("_", " ") || "For Sale",
    price: listing.price,
    formattedPrice: `₦${Number(listing.price).toLocaleString("en-NG")}`,
    title: listing.title,
    location: `${listing.address}, ${listing.lga}, ${listing.state}`,
    stats: [
      ...(listing.bedrooms != null ? [{ icon: "bed", label: "BEDS", value: listing.bedrooms }] : []),
      ...(listing.bathrooms != null ? [{ icon: "bathtub", label: "BATHS", value: listing.bathrooms }] : []),
      ...(listing.squareMeters != null ? [{ icon: "square_foot", label: "SQM", value: listing.squareMeters }] : []),
    ],
    showPricingBreakdown: listing.listingType === "FOR_SALE",
    pricing: {
      basePrice: listing.price,
      fees: [
        { label: `Agency Fee (${listing.agencyFeePercent}%)`, amount: listing.price * (listing.agencyFeePercent / 100) },
        { label: `Legal Fee (${listing.legalFeePercent}%)`, amount: listing.price * (listing.legalFeePercent / 100) },
      ],
    },
    agent: agentForCard,
    description: [listing.description],
    amenities: amenitiesForGrid,
    mapImageUrl: null,
    nearbyPlaceGroups: [],
    photos: galleryPhotos,
    totalPhotoCount: galleryPhotos.length,
    videoUrl: listing.videoUrl,
  };

  const similarForCards = similarListings.map((s) => ({
    id: s.id,
    title: s.title,
    location: `${s.lga}, ${s.state}`,
    formattedPrice: `₦${Number(s.price).toLocaleString("en-NG")}`,
    imageUrl: s.photos?.[0] || "https://via.placeholder.com/400x300?text=No+Photo",
    imageAlt: s.title,
    details: [
      ...(s.bedrooms != null ? [{ icon: "bed", label: `${s.bedrooms}` }] : []),
      ...(s.bathrooms != null ? [{ icon: "bathtub", label: `${s.bathrooms}` }] : []),
      ...(s.squareMeters != null ? [{ icon: "square_foot", label: `${s.squareMeters}` }] : []),
    ],
  }));

  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Navbar user={user} />

      <main className="pt-8 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            <PropertyGallery
              photos={listingForInfoCard.photos}
              videoUrl={listingForInfoCard.videoUrl}
              totalPhotoCount={listingForInfoCard.totalPhotoCount}
            />

            <section className="bg-surface-container-lowest rounded-xl p-8 property-shadow space-y-8">
              <div>
                <h2 className="font-headline-md text-headline-md mb-4">Description</h2>
                <div className="text-on-surface-variant font-body-md space-y-4">
                  <p>{listing.description}</p>
                </div>
              </div>

              {amenitiesForGrid.length > 0 && (
                <>
                  <hr className="border-outline-variant" />
                  <div>
                    <h2 className="font-headline-md text-headline-md mb-6">Amenities</h2>
                    <AmenitiesGrid amenities={amenitiesForGrid} />
                  </div>
                </>
              )}

              {listingForInfoCard.showPricingBreakdown && (
                <>
                  <hr className="border-outline-variant" />
                  <div>
                    <h2 className="font-headline-md text-headline-md mb-6">Pricing Breakdown</h2>
                    <PricingBreakdown
                      basePrice={listingForInfoCard.pricing.basePrice}
                      fees={listingForInfoCard.pricing.fees}
                    />
                  </div>
                </>
              )}

              <hr className="border-outline-variant" />
              <LocationSection
                mapImageUrl={null}
                mapImageAlt={listing.address}
                nearbyPlaceGroups={[]}
              />
            </section>
          </div>

          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <ListingInfoCard
              property={listingForInfoCard}
              onMessageAgent={handleMessageAgent}
              onReportListing={handleReportListing}
            />
            {agentForCard && <AgentContactCard agent={agentForCard} />}
          </div>
        </div>

        {similarForCards.length > 0 && (
          <section className="mt-stack-lg">
            <h2 className="font-headline-md text-headline-md mb-8">Similar Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {similarForCards.map((s) => (
                <SimilarListingCard key={s.id} listing={s} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "contact", address: "Lagos, Nigeria", email: "support@kcee.com" }} />
    </div>
  );
}
