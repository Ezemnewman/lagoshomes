import { useState } from "react";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import SortAndViewControls from "../components/SortAndViewControls";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import SiteFooter from "../components/SiteFooter";
import { SEARCH_RESULTS_PROPERTIES, DEMO_USER } from "../data/properties";
import { SITE_CONFIG } from "../data/siteConfig";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Support", href: "/contact" },
      { label: "WhatsApp Us", href: `https://wa.me/${SITE_CONFIG.whatsappNumber}` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function SearchResultsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleApplyFilters = (filters) => {
    console.log("Filters applied:", filters);
    // TODO: refetch GET /api/listings with these filters once backend exists
  };

  return (
    <div className="bg-background text-on-surface font-body-md">
      <Navbar user={DEMO_USER} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-col md:flex-row gap-gutter">
          <FilterSidebar onApply={handleApplyFilters} />

          <section className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-stack-lg gap-stack-md">
              <div>
                <h1 className="font-headline-md text-headline-md text-on-surface">
                  248 properties found in Lagos
                </h1>
                <p className="text-body-md text-on-surface-variant">
                  Verified listings for premium properties
                </p>
              </div>
              <SortAndViewControls />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {SEARCH_RESULTS_PROPERTIES.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
          </section>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
