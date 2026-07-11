import { useState } from "react";
import AgentDashboardTopbar from "../components/AgentDashboardTopbar";
import Icon from "../components/Icon";
import {
  AGENT_DASHBOARD_USER,
  AGENT_DASHBOARD_SUMMARY_STATS,
  LISTING_VIEWS_CHART,
  RECENT_INQUIRIES,
} from "../data/properties";

/**
 * Renders inside AgentDashboardLayout's <Outlet>. The chart is a real
 * CSS bar chart driven by data (LISTING_VIEWS_CHART), not hardcoded
 * per-bar height classes like the Stitch export — same principle as
 * every other "convert inline-styled demo content into data + map()"
 * conversion in this project. The Daily/Weekly toggle is real button
 * state, though both currently render the same demo dataset since
 * there's no second dataset to show — inventing fake weekly numbers
 * would misrepresent what's actually wired up.
 */
export default function AgentDashboardOverviewPage() {
  const [chartView, setChartView] = useState("daily");

  const handleReply = (inquiryId) => {
    console.log("Reply clicked for inquiry:", inquiryId);
    // TODO: open the messaging thread for this inquiry once messaging
    // is connected to real inquiry records, not just demo conversations
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <AgentDashboardTopbar pageTitle="Overview" agent={AGENT_DASHBOARD_USER} />

      <div className="p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto space-y-stack-lg">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {AGENT_DASHBOARD_SUMMARY_STATS.map((stat) => (
            <div
              key={stat.label}
              className={`bg-white p-6 rounded-xl property-shadow flex flex-col justify-between ${
                stat.highlight ? "border-l-4 border-secondary-container" : ""
              }`}
            >
              <div>
                <Icon
                  name={stat.icon}
                  className={`mb-2 ${stat.highlight ? "text-secondary" : "text-primary"}`}
                />
                <h3 className="font-label-md text-label-md text-on-surface-variant">
                  {stat.label}
                </h3>
              </div>
              <p
                className={`font-display-lg text-headline-md font-bold mt-2 ${
                  stat.highlight ? "text-secondary" : "text-primary"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-xl property-shadow p-gutter">
          <div className="flex justify-between items-center mb-stack-lg">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Listing Views (Last 30 Days)
            </h3>
            <div className="flex gap-2">
              {["daily", "weekly"].map((view) => (
                <button
                  key={view}
                  onClick={() => setChartView(view)}
                  className={`px-3 py-1 rounded-full text-[12px] capitalize transition-colors ${
                    chartView === view
                      ? "bg-primary text-white"
                      : "bg-surface-container hover:bg-surface-variant text-on-surface-variant"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-1 md:gap-4 px-2">
            {LISTING_VIEWS_CHART.map((bar) => (
              <div key={bar.label} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary rounded-t-sm transition-all hover:opacity-90"
                  style={{ height: `${bar.heightPercent}%`, opacity: 0.3 + bar.heightPercent / 150 }}
                />
                <span className="text-[10px] text-on-surface-variant mt-2">{bar.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl property-shadow overflow-hidden">
          <div className="px-gutter py-stack-md border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Inquiries</h3>
            <button className="text-primary font-label-md text-label-md hover:underline transition-all">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                  <th className="px-gutter py-4 font-semibold">Buyer</th>
                  <th className="px-gutter py-4 font-semibold">Property</th>
                  <th className="px-gutter py-4 font-semibold">Message</th>
                  <th className="px-gutter py-4 font-semibold">Date</th>
                  <th className="px-gutter py-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {RECENT_INQUIRIES.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="px-gutter py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={inquiry.buyerAvatarUrl}
                          alt={inquiry.buyerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-body-md text-body-md font-medium text-on-surface">
                          {inquiry.buyerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-gutter py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={inquiry.propertyImageUrl}
                          alt={inquiry.propertyTitle}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-body-md text-body-md font-medium text-on-surface">
                            {inquiry.propertyTitle}
                          </p>
                          <p className="text-[12px] text-primary font-bold">
                            {inquiry.formattedPrice}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-gutter py-5">
                      <p className="text-on-surface-variant font-body-md text-body-md italic">
                        "{inquiry.message}"
                      </p>
                    </td>
                    <td className="px-gutter py-5">
                      <span className="text-on-surface-variant font-label-md text-label-md">
                        {inquiry.timeAgo}
                      </span>
                    </td>
                    <td className="px-gutter py-5 text-right">
                      <button
                        onClick={() => handleReply(inquiry.id)}
                        aria-label={`Reply to ${inquiry.buyerName}`}
                        className="text-primary hover:bg-primary-container/10 p-2 rounded-full transition-colors"
                      >
                        <Icon name="reply" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95 group z-50"
        aria-label="Add new listing"
      >
        <Icon name="add" />
        <span className="absolute right-full mr-4 bg-primary text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add Listing
        </span>
      </button>
    </main>
  );
}
