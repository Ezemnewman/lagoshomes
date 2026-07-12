import { useState } from "react";
import Icon from "../components/Icon";
import { SUBSCRIPTION_TIERS } from "../data/nigerianLocations";

/**
 * Renders inside AgentDashboardLayout's <Outlet>.
 * Shows current plan, upgrade tier cards, and a payment form.
 * Real Stripe integration deferred — form is a realistic placeholder
 * that logs to console rather than processing any real payment.
 * TODO: integrate Stripe once API keys and a backend /api/subscriptions
 * endpoint exist.
 */
export default function SubscriptionPage() {
  const [selectedTier, setSelectedTier] = useState("professional");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Subscription payment submitted:", { selectedTier, billingCycle, cardName });
    // TODO: POST to /api/subscriptions once Stripe backend exists.
    // Never log real card numbers — the form fields here would be
    // replaced by a Stripe Elements iframe that never exposes raw
    // card data to our own JS at all.
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const activeTier = SUBSCRIPTION_TIERS.find((t) => t.id === selectedTier);
  const displayPrice = billingCycle === "yearly"
    ? Math.round(activeTier.price * 10)
    : activeTier.price;

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <header className="h-20 bg-surface border-b border-outline-variant/30 shadow-sm flex items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Subscription & Billing</h2>
      </header>

      <div className="p-8 max-w-5xl mx-auto space-y-8">
        {success && (
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
            <Icon name="check_circle" className="text-primary" filled />
            <p className="font-label-md text-primary font-bold">
              Subscription updated successfully! Your plan is now active.
            </p>
          </div>
        )}

        <section className="bg-white rounded-xl property-shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Current Plan</h3>
            <div className="flex bg-surface-container rounded-full p-1">
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md capitalize transition-colors ${
                    billingCycle === cycle
                      ? "bg-primary text-white shadow"
                      : "text-on-surface-variant"
                  }`}
                >
                  {cycle}
                  {cycle === "yearly" && (
                    <span className="ml-1 text-[10px] bg-secondary text-on-secondary px-1.5 py-0.5 rounded-full">
                      Save 17%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedTier === tier.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : tier.highlighted
                    ? "border-secondary/30 bg-secondary/5 hover:border-secondary"
                    : "border-outline-variant hover:border-primary/50"
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block bg-secondary text-on-secondary text-xs font-bold px-2 py-0.5 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h4 className="font-headline-sm text-headline-sm text-on-surface">{tier.name}</h4>
                <p className="font-bold text-primary mt-1">
                  ₦{(billingCycle === "yearly" ? tier.price * 10 : tier.price).toLocaleString()}
                  <span className="font-normal text-on-surface-variant text-sm">
                    /{billingCycle === "yearly" ? "yr" : "mo"}
                  </span>
                </p>
                <p className="text-on-surface-variant text-sm mt-2 mb-4">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon name="check" className="text-primary text-sm mt-0.5" />
                      <span className="text-on-surface-variant">{f}</span>
                    </li>
                  ))}
                </ul>
                {selectedTier === tier.id && (
                  <div className="mt-4 flex items-center gap-1 text-primary font-label-md text-xs">
                    <Icon name="radio_button_checked" className="text-sm" filled />
                    Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl property-shadow p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Payment Details</h3>
          <div className="flex items-center gap-2 mb-6 p-3 bg-surface-container-low rounded-lg">
            <Icon name="info" className="text-primary text-sm" />
            <p className="text-xs text-on-surface-variant">
              This is a placeholder payment form. Real card processing via Stripe will be
              enabled when billing is activated. Never enter real card details here yet.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Name on Card
              </label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Tunde Bakare"
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Card Number
              </label>
              <div className="relative">
                <Icon name="credit_card" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Icon name="progress_activity" className="animate-spin" /> Processing...</>
              ) : (
                <>
                  <Icon name="lock" className="text-lg" />
                  Pay ₦{displayPrice.toLocaleString()} / {billingCycle === "yearly" ? "year" : "month"}
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
