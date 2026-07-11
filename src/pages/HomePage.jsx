import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFAB from "../components/WhatsAppFAB";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import CategoryCard from "../components/CategoryCard";
import CityCard from "../components/CityCard";
import { FEATURED_PROPERTIES, CATEGORIES, POPULAR_CITIES } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    heading: "Cities",
    links: [
      // TODO: once search filtering reads query params, these become
      // real city filters instead of just landing on the unfiltered
      // search page (e.g. /buy?city=lagos)
      { label: "Lagos Real Estate", href: "/buy" },
      { label: "Abuja Real Estate", href: "/buy" },
      { label: "Port Harcourt Real Estate", href: "/buy" },
      { label: "Enugu Real Estate", href: "/buy" },
    ],
  },
];

export default function HomePage() {
  const handleSearch = (filters) => {
    console.log("Search submitted:", filters);
    // TODO: navigate to /search?type=...&location=...&priceRange=...
    // once the search results page and backend API exist
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbuxMuy67flT7RTgEhXPDovccsTfR5Lhqr8RqqT42XfYdzzfFQSBDSd9SMgS460BWF5-jd4BA2HSMgPE2lHIpzCgPf-Y03i0oo4L75dYESeFzB0_vbmYyLEWTfv7odX6czn32fsLkgtOmABNjMRDCm1iRQuj9LyrxIayyg6mOUWibZ7yMogi4zN81z1oiuUbegESSMEEjAWIPe90Kwsy1DMdJyYIOgJ7cFW-rwyjtO1O2RLXRyv0caNDfHN9UAr9FDY18M09EIEPWt"
            alt="Luxurious modern villa in Lekki, Lagos"
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
                  Handpicked properties just for you.
                </p>
              </div>
              <a href="/search" className="text-primary font-label-md hover:underline">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {FEATURED_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
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
                Join over 10,000+ verified agents listing on LagosHomes.
              </p>
            </div>
            <Link
              to="/signup"
              className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-md hover:opacity-90 active:scale-95 transition-all shadow-md"
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
