import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import FilterSidebar from "../components/FilterSidebar";
import SortAndViewControls from "../components/SortAndViewControls";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import SiteFooter from "../components/SiteFooter";
import Icon from "../components/Icon";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
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

/**
 * Now fetches real listings from GET /api/listings with filter params.
 * Falls back gracefully to an empty state if the API is unavailable.
 */
export default function SearchResultsPage() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchListings = async (page = 1, activeFilters = filters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", 9);

      if (activeFilters.state) params.set("state", activeFilters.state);
      if (activeFilters.lga) params.set("lga", activeFilters.lga);
      if (activeFilters.listingType) params.set("listingType", activeFilters.listingType);
      if (activeFilters.propertyTypes?.length) params.set("propertyType", activeFilters.propertyTypes[0]);
      if (activeFilters.maxPrice) params.set("maxPrice", activeFilters.maxPrice);
      if (activeFilters.bedrooms && activeFilters.bedrooms !== "Any") {
        params.set("minBedrooms", activeFilters.bedrooms.replace("+", ""));
      }
      if (searchParams.get("q")) params.set("search", searchParams.get("q"));

      const sortMap = {
        newest: { sortBy: "createdAt", sortOrder: "desc" },
        "price-asc": { sortBy: "price", sortOrder: "asc" },
        "price-desc": { sortBy: "price", sortOrder: "desc" },
      };
      const sort = sortMap[sortOrder] || sortMap.newest;
      params.set("sortBy", sort.sortBy);
      params.set("sortOrder", sort.sortOrder);

      const data = await api.get(`/listings?${params.toString()}`);
      setListings(data.listings || []);
      setTotal(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load listings. Please try again.");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(1, filters);
  }, [sortOrder, searchParams]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchListings(1, newFilters);
  };

  const handlePageChange = (page) => {
    fetchListings(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Convert backend listing shape to what PropertyCard expects
  const toCardShape = (listing) => ({
    id: listing.id,
    title: listing.title,
    location: `${listing.lga}, ${listing.state}`,
    formattedPrice: `₦${Number(listing.price).toLocaleString("en-NG")}`,
    imageUrl: listing.photos?.[0] || "https://via.placeholder.com/400x300?text=No+Photo",
    imageAlt: listing.title,
    details: [
      ...(listing.bedrooms != null ? [{ icon: "bed", label: `${listing.bedrooms}` }] : []),
      ...(listing.bathrooms != null ? [{ icon: "bathtub", label: `${listing.bathrooms}` }] : []),
      ...(listing.squareMeters != null ? [{ icon: "square_foot", label: `${listing.squareMeters} sqm` }] : []),
    ],
    tag: listing.agent?.agentProfile?.status === "APPROVED"
      ? { label: "Verified Agent", variant: "verified" }
      : undefined,
  });

  return (
    <div className="bg-background text-on-surface font-body-md">
      <Navbar user={user} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="flex flex-col md:flex-row gap-gutter">
          <FilterSidebar onApply={handleApplyFilters} />

          <section className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-stack-lg gap-stack-md">
              <div>
                <h1 className="font-headline-md text-headline-md text-on-surface">
                  {loading ? "Loading..." : `${total} properties found`}
                </h1>
                <p className="text-body-md text-on-surface-variant">
                  Verified listings across Nigeria
                </p>
              </div>
              <SortAndViewControls onSortChange={setSortOrder} />
            </div>

            {error && (
              <div className="text-center py-16 text-error">
                <Icon name="error" className="text-[48px] mb-4 opacity-50" />
                <p>{error}</p>
                <button
                  onClick={() => fetchListings(currentPage)}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-label-md hover:opacity-90"
                >
                  Try Again
                </button>
              </div>
            )}

            {loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-surface-container rounded-xl h-72 animate-pulse" />
                ))}
              </div>
            )}

            {!loading && !error && listings.length === 0 && (
              <div className="text-center py-16 text-on-surface-variant">
                <Icon name="search_off" className="text-[64px] mb-4 opacity-20" />
                <p className="font-headline-sm">No properties match your search</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}

            {!loading && !error && listings.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {listings.map((listing) => (
                  <PropertyCard key={listing.id} property={toCardShape(listing)} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
