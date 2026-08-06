import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFAB from "../components/WhatsAppFAB";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import CategoryCard from "../components/CategoryCard";
import CityCard from "../components/CityCard";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES, POPULAR_CITIES } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Cities",
    links: [
      { label: "Lagos Real Estate", href: "/buy?state=Lagos" },
      { label: "Abuja Real Estate", href: "/buy?state=FCT" },
      { label: "Port Harcourt Real Estate", href: "/buy?state=Rivers" },
      { label: "Enugu Real Estate", href: "/buy?state=Enugu" },
    ],
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await api.get("/listings?limit=6&sortBy=createdAt&sortOrder=desc");
        setFeaturedListings(data.listings || []);
      } catch {
        setFeaturedListings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.type) params.set("listingType", filters.type.toUpperCase().replace(" ", "_"));
    if (filters.location) params.set("search", filters.location);
    if (filters.priceRange) params.set("maxPrice", filters.priceRange.split("-")[1]?.replace("m", "000000") || "");
    window.location.href = `/buy?${params.toString()}`;
  };

  const toCardShape = (listing) => ({
    id: listing.id,
    title: listing.title,
    location: `${listing.lga}, ${listing.state}`,
    formattedPrice: `₦${Number(listing.price).toLocaleString("en-NG")}`,
    imageUrl: listing.photos?.[0] || "https://via.placeholder.com/400x300?text=No+Photo",
    imageAlt: listing.title,
    details: [
      ...(listing.bedrooms != null ? [{ icon: "bed", label: `${listing.bedrooms} Beds` }] : []),
      ...(listing.bathrooms != null ? [{ icon: "bathtub", label: `${listing.bathrooms} Baths` }] : []),
    ],
    tag: listing.agent?.agentProfile?.status === "APPROVED"
      ? { label: "Verified Agent", variant: "verified" }
      : undefined,
  });

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar user={user} />

      <main>
        {/* Hero */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbuxMuy67flT7RTgEhXPDovccsTfR5Lhqr8RqqT42XfYdzzfFQSBDSd9SMgS460BWF5-jd4BA2HSMgPE2lHIpzCgPf-Y03i0oo4L75dYESeFzB0_vbmYyLEWTfv7odX6czn32fsLkgtOmABNjMRDCm1iRQuj9LyrxIayyg6mOUWibZ7yMogi4zN81z1oiuUbegESSMEEjAWIPe90Kwsy1DMdJyYIOgJ7cFW-rwyjtO1O2RLXRyv0caNDfHN9UAr9FDY18M09EIEPWt"
            alt="Luxury home in Nigeria"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center">
            <h1 className="text-on-primary font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-lg drop-shadow-lg">
              Find Your Next Home in Nigeria
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Categories */}
        <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md mb-stack-lg">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.label} {...category} />
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="py-stack-lg bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="flex justify-between items-end mb-stack-lg">
              <div>
                <h2 className="font-headline-md text-headline-md">Featured Listings</h2>
                <p className="text-on-surface-variant font-body-md">
                  {loading ? "Loading properties..." : "Handpicked properties just for you."}
                </p>
              </div>
              <Link to="/buy" className="text-primary font-label-md hover:underline">
                View All
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-surface-container rounded-xl h-72 animate-pulse" />
                ))}
              </div>
            ) : featuredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {featuredListings.map((listing) => (
                  <PropertyCard key={listing.id} property={toCardShape(listing)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-on-surface-variant">
                <p>No listings yet. Be the first to list a property!</p>
                <Link to="/agents/apply" className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-full font-label-md hover:opacity-90">
                  List Your Property
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md mb-stack-lg">Explore Popular Cities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter h-[250px] md:h-[400px]">
            {POPULAR_CITIES.map((city) => (
              <CityCard key={city.name} {...city} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg">
          <div className="bg-primary rounded-xl p-stack-lg text-center md:text-left md:flex justify-between items-center text-on-primary">
            <div className="mb-6 md:mb-0">
              <h2 className="font-headline-md text-headline-md mb-2">
                Want to sell or rent your property?
              </h2>
              <p className="font-body-md opacity-90">
                Join over 10,000+ verified agents listing on KCEE.
              </p>
            </div>
            <Link
              to="/signup"
              className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-md hover:opacity-90 active:scale-95 transition-all shadow-md inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "whatsapp-cta" }} />
      <WhatsAppFAB />
    </div>
  );
}
