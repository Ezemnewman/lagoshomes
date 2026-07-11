import DashboardTopbar from "../components/DashboardTopbar";
import PropertyCard from "../components/PropertyCard";
import Icon from "../components/Icon";
import { DASHBOARD_USER, DASHBOARD_SUMMARY_STATS, RECENTLY_VIEWED_PROPERTIES } from "../data/properties";

/**
 * Renders inside DashboardLayout's <Outlet>, so the sidebar is already
 * in place — this page only renders the topbar + main content.
 * Reuses PropertyCard for "Recently Viewed" instead of a bespoke card,
 * matching the data shape PropertyCard already expects.
 */
export default function DashboardOverviewPage() {
  return (
    <div className="ml-64 pt-16 min-h-screen">
      <DashboardTopbar
        searchPlaceholder="Search properties, areas, or agents..."
        user={DASHBOARD_USER}
      />

      <div className="max-w-[1200px] mx-auto p-8 space-y-stack-lg">
        <div className="flex flex-col gap-1">
          <h2 className="text-headline-md font-headline-md text-on-surface">
            Welcome back, {DASHBOARD_USER.name.split(" ")[0]}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Here's a summary of your property search activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DASHBOARD_SUMMARY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-container-lowest p-6 rounded-xl property-shadow border border-outline-variant flex items-center justify-between group hover:border-primary transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <p className="text-on-surface-variant font-label-md text-label-md">{stat.label}</p>
                <p className="text-display-lg-mobile md:text-headline-md font-bold text-primary">
                  {stat.value}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all relative">
                <Icon name={stat.icon} filled={stat.hasIndicator} />
                {stat.hasIndicator && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-secondary-container rounded-full border-2 border-surface-container-lowest" />
                )}
              </div>
            </div>
          ))}
        </div>

        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-headline-sm font-headline-sm text-on-surface">
              Recently Viewed Properties
            </h3>
            <a href="#" className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
              View All History
              <Icon name="chevron_right" className="text-sm" />
            </a>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6">
            {RECENTLY_VIEWED_PROPERTIES.map((property) => (
              <div key={property.id} className="min-w-[320px]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </section>

        <div className="relative overflow-hidden bg-primary-container rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10 space-y-4 max-w-lg">
            <h2 className="text-headline-md font-headline-md text-on-primary-container">
              Ready to find your forever home?
            </h2>
            <p className="text-body-lg font-body-lg text-on-primary-container/80">
              Connect with our top-tier verified agents in Lagos and Abuja for a private viewing
              session today.
            </p>
            <div className="flex gap-4">
              <button className="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-8 py-3 rounded-full hover:shadow-lg transition-shadow active:scale-95">
                Book Viewing
              </button>
              <button className="border-2 border-on-primary-container/30 text-on-primary-container font-label-md text-label-md px-8 py-3 rounded-full hover:bg-white/10 transition-colors active:scale-95">
                Speak to Advisor
              </button>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto">
            <div className="bg-surface/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                  <Icon name="support_agent" />
                </div>
                <div>
                  <p className="text-on-primary-container font-bold">KCEE AI Guide</p>
                  <p className="text-[12px] text-on-primary-container/60">Active Now</p>
                </div>
              </div>
              <p className="text-on-primary-container text-body-md italic">
                "Based on your interest in Victoria Island, I've found 3 new listings that match
                your criteria."
              </p>
              {/* TODO: this is illustrative copy from the Stitch export, not a real
                  AI feature yet — wire to a real recommendation engine later */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
