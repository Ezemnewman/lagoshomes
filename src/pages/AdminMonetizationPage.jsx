import { useState } from "react";
import Icon from "../components/Icon";

const REVENUE_STATS = [
  { label: "Total Revenue (June)", value: "₦4,250,000", trend: "+18%", icon: "payments" },
  { label: "Active Subscriptions", value: "142", trend: "+12", icon: "subscriptions" },
  { label: "Commission Collected", value: "₦1,800,000", trend: "+8%", icon: "handshake" },
  { label: "Avg. Revenue Per Agent", value: "₦29,900", trend: "+5%", icon: "trending_up" },
];

const REVENUE_BREAKDOWN = [
  { source: "Basic Tier Subscriptions (48)", amount: "₦480,000", percent: 11 },
  { source: "Professional Tier (72)", amount: "₦2,160,000", percent: 51 },
  { source: "Enterprise Tier (22)", amount: "₦1,100,000", percent: 26 },
  { source: "Commission on Closed Deals", amount: "₦510,000", percent: 12 },
];

/**
 * Admin view of platform monetization. Commission rate and tier prices
 * are editable and would persist via PATCH /api/admin/settings once
 * a backend exists. Currently saves only to local state (changes
 * reset on page reload).
 */
export default function AdminMonetizationPage() {
  const [commissionRate, setCommissionRate] = useState("2.5");
  const [listingFee, setListingFee] = useState("5000");
  const [featuredFee, setFeaturedFee] = useState("15000");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Monetization settings saved:", { commissionRate, listingFee, featuredFee });
    // TODO: PATCH /api/admin/monetization once backend exists
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Monetization & Planning</h2>
        <p className="text-on-surface-variant">Platform revenue overview and fee configuration.</p>
      </div>

      {saved && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <Icon name="check_circle" className="text-primary" filled />
          <p className="font-label-md text-primary font-bold">Settings saved successfully.</p>
        </div>
      )}

      {/* Revenue Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {REVENUE_STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl property-shadow p-6">
            <div className="flex justify-between items-start mb-3">
              <Icon name={stat.icon} className="text-primary" />
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <p className="font-bold text-headline-sm text-on-surface">{stat.value}</p>
            <p className="text-on-surface-variant font-label-md text-label-md mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Breakdown */}
        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">
            Revenue Breakdown — June 2026
          </h3>
          <div className="space-y-4">
            {REVENUE_BREAKDOWN.map((item) => (
              <div key={item.source}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-label-md text-on-surface">{item.source}</span>
                  <span className="font-bold text-primary text-sm">{item.amount}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">{item.percent}% of total</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fee Configuration */}
        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
            Platform Fee Configuration
          </h3>
          <p className="text-xs text-on-surface-variant mb-6">
            Changes here will apply to all new transactions and subscriptions.
          </p>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Commission Rate on Closed Deals (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">%</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Charged to agents when a deal closes through the platform.
              </p>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Standard Listing Fee (₦ per month)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                <input
                  type="number"
                  min={0}
                  value={listingFee}
                  onChange={(e) => setListingFee(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Premium Featured Slot Fee (₦ per week)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                <input
                  type="number"
                  min={0}
                  value={featuredFee}
                  onChange={(e) => setFeaturedFee(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <><Icon name="progress_activity" className="animate-spin" /> Saving...</>
              ) : (
                <><Icon name="save" /> Save Fee Settings</>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
