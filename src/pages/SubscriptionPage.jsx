import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import api from "../utils/api";
import { SUBSCRIPTION_TIERS } from "../data/nigerianLocations";

/**
 * Real Paystack integration — clicking Pay initializes a transaction
 * on the backend (POST /api/subscriptions/initialize), which returns
 * a Paystack authorization URL. We redirect the user there directly.
 * Paystack handles the payment UI, card security, and all Nigerian
 * payment methods (cards, bank transfer, USSD).
 * On success, Paystack redirects to /agent-dashboard/subscription/confirmation.
 */
export default function SubscriptionPage() {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("PROFESSIONAL");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await api.post("/subscriptions/initialize", {
        tier: selectedTier,
        billingCycle,
      });
      // Redirect to Paystack's hosted payment page
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err.message || "Failed to initialize payment — please try again");
      setLoading(false);
    }
  };

  const activeTier = SUBSCRIPTION_TIERS.find((t) => t.id === selectedTier.toLowerCase());
  const displayPrice = activeTier
    ? billingCycle === "yearly"
      ? Math.round(activeTier.price * 10)
      : activeTier.price
    : 0;

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <header className="h-20 bg-surface border-b border-outline-variant/30 shadow-sm flex items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Subscription & Billing</h2>
      </header>

      <div className="p-8 max-w-4xl mx-auto space-y-8">
        {error && (
          <div className="bg-error-container border border-error/20 rounded-xl p-4 flex items-center gap-3">
            <Icon name="error" className="text-error" />
            <p className="font-label-md text-error">{error}</p>
          </div>
        )}

        <section className="bg-white rounded-xl property-shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Choose Your Plan</h3>
            <div className="flex bg-surface-container rounded-full p-1">
              {["monthly", "yearly"].map((cycle) => (
                <button key={cycle} onClick={() => setBillingCycle(cycle)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md capitalize transition-colors ${
                    billingCycle === cycle ? "bg-primary text-white shadow" : "text-on-surface-variant"
                  }`}>
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
            {SUBSCRIPTION_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.id.toUpperCase();
              return (
                <button key={tier.id} onClick={() => setSelectedTier(tier.id.toUpperCase())}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : tier.highlighted
                      ? "border-secondary/30 bg-secondary/5 hover:border-secondary"
                      : "border-outline-variant hover:border-primary/50"
                  }`}>
                  {tier.highlighted && (
                    <span className="inline-block bg-secondary text-on-secondary text-xs font-bold px-2 py-0.5 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <h4 className="font-headline-sm text-on-surface">{tier.name}</h4>
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
                  {isSelected && (
                    <div className="mt-4 flex items-center gap-1 text-primary text-xs font-label-md">
                      <Icon name="radio_button_checked" className="text-sm" filled />
                      Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl property-shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-headline-sm text-on-surface">Order Summary</h3>
              <p className="text-on-surface-variant text-sm mt-1">
                {activeTier?.name} — {billingCycle}
              </p>
            </div>
            <p className="font-bold text-primary text-xl">
              ₦{displayPrice.toLocaleString()}
            </p>
          </div>

          <div className="flex items-start gap-2 p-3 bg-surface-container-low rounded-lg mb-4">
            <Icon name="verified_user" className="text-primary text-sm mt-0.5" filled />
            <p className="text-xs text-on-surface-variant">
              Secure payment powered by Paystack. Supports cards, bank transfer, and USSD.
              You'll be redirected to Paystack's secure payment page.
            </p>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-4 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Icon name="progress_activity" className="animate-spin" />Redirecting to Paystack...</>
            ) : (
              <><Icon name="lock" />Pay ₦{displayPrice.toLocaleString()} via Paystack</>
            )}
          </button>
        </section>
      </div>
    </main>
  );
}
