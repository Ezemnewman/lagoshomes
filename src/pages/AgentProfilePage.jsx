import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import AgentProfileHeader from "../components/AgentProfileHeader";
import AgentStatsRow from "../components/AgentStatsRow";
import ListingTabFilter from "../components/ListingTabFilter";
import PropertyCard from "../components/PropertyCard";
import { AGENT_PROFILE, AGENT_LISTINGS, DEMO_USER } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

/**
 * Real tab filtering: `activeTab` and `sortOrder` are page-level state,
 * and `visibleListings` is derived from AGENT_LISTINGS rather than a
 * separate dataset per tab — so adding a 7th listing to AGENT_LISTINGS
 * automatically shows up under whichever tab matches its listingType,
 * no page-level changes needed.
 */
export default function AgentProfilePage({ agent = AGENT_PROFILE, listings = AGENT_LISTINGS }) {
  const [activeTab, setActiveTab] = useState("For Sale");
  const [sortOrder, setSortOrder] = useState("newest");

  const visibleListings = useMemo(() => {
    const filtered = listings.filter((listing) => listing.listingType === activeTab);
    // TODO: real price sorting needs a numeric price field once the
    // backend exists — formattedPrice strings (with ₦ and "/ year"
    // suffixes) aren't reliably sortable as-is.
    return filtered;
  }, [listings, activeTab, sortOrder]);

  const handleMessageAgent = () => {
    console.log("Message Agent clicked for agent:", agent.id);
    // TODO: open messaging thread once the messaging system exists
  };

  return (
    <div className="bg-background font-body-md text-on-surface">
      <Navbar user={DEMO_USER} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <AgentProfileHeader agent={agent} onMessageAgent={handleMessageAgent} />
        <AgentStatsRow stats={agent.stats} />

        <section className="mt-stack-lg">
          <ListingTabFilter
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSortChange={setSortOrder}
          />

          {visibleListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter mt-stack-md">
              {visibleListings.map((listing) => (
                <PropertyCard key={listing.id} property={listing} />
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant text-center py-stack-lg">
              No {activeTab.toLowerCase()} listings from this agent yet.
            </p>
          )}

          {visibleListings.length > 0 && (
            <div className="flex justify-center mt-stack-lg">
              <button className="bg-surface-container text-on-surface-variant font-label-md px-10 py-3 rounded-full hover:bg-outline-variant/30 transition-all">
                Load More Listings
              </button>
              {/* TODO: connect to GET /api/agents/:id/listings?page=N once backend exists */}
            </div>
          )}
        </section>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "whatsapp-cta" }} />
    </div>
  );
}
