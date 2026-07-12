import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WizardProgressBar from "../components/WizardProgressBar";
import Icon from "../components/Icon";
import { useAddListing } from "../context/AddListingContext";

const PAYMENT_TERMS = [
  "Outright Purchase",
  "Annual",
  "Bi-Annual (6 Months)",
  "Quarterly",
  "Monthly",
  "Negotiable",
];

/**
 * Step 3 of 4: Price. Computes the fee breakdown live so agents can
 * see exactly what buyers will be quoted before publishing. Agency
 * and legal fee percentages are editable (defaults to 5%/5% per
 * Nigerian real estate convention, matching the PropertyDetailPage's
 * PricingBreakdown component that buyers will see on the listing).
 */
export default function AddListingStep3Page() {
  const navigate = useNavigate();
  const { formData, updateFields } = useAddListing();

  const [price, setPrice] = useState(formData.price || "");
  const [negotiable, setNegotiable] = useState(formData.negotiable || false);
  const [paymentTerms, setPaymentTerms] = useState(formData.paymentTerms || "");
  const [agencyFeePercent, setAgencyFeePercent] = useState(formData.agencyFeePercent || "5");
  const [legalFeePercent, setLegalFeePercent] = useState(formData.legalFeePercent || "5");

  const numericPrice = parseFloat(price.replace(/,/g, "")) || 0;
  const agencyFee = (numericPrice * parseFloat(agencyFeePercent || 0)) / 100;
  const legalFee = (numericPrice * parseFloat(legalFeePercent || 0)) / 100;
  const totalPrice = numericPrice + agencyFee + legalFee;

  const formatNaira = (n) =>
    n > 0 ? `₦${n.toLocaleString("en-NG")}` : "—";

  const handleNext = (e) => {
    e.preventDefault();
    updateFields({ price, negotiable, paymentTerms, agencyFeePercent, legalFeePercent });
    navigate("/agent-dashboard/listings/new/media");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">Add New Listing</h1>
          <p className="text-on-surface-variant font-body-md">Step 3 of 4 — Price & Fees</p>
        </div>

        <WizardProgressBar currentStep={3} totalSteps={4} />

        <form onSubmit={handleNext} className="bg-white rounded-xl property-shadow p-8 mt-stack-lg space-y-6">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Listing Price (₦) <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">₦</span>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/[^0-9,]/g, ""))}
                placeholder="e.g. 120,000,000"
                className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
            <div>
              <p className="font-label-md text-label-md text-on-surface">Price is negotiable</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Buyers will see a "Negotiable" badge on the listing
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={negotiable}
              onClick={() => setNegotiable((p) => !p)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                negotiable ? "bg-primary" : "bg-surface-container-highest"
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-all ${
                  negotiable ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Payment Terms
            </label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="">Select payment terms (optional)</option>
              {PAYMENT_TERMS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Agency Fee (%)
              </label>
              <input
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={agencyFeePercent}
                onChange={(e) => setAgencyFeePercent(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Legal Fee (%)
              </label>
              <input
                type="number"
                min={0}
                max={20}
                step={0.5}
                value={legalFeePercent}
                onChange={(e) => setLegalFeePercent(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          {numericPrice > 0 && (
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">
                Buyer-Facing Price Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Purchase Price", value: formatNaira(numericPrice) },
                  { label: `Agency Fee (${agencyFeePercent}%)`, value: formatNaira(agencyFee) },
                  { label: `Legal Fee (${legalFeePercent}%)`, value: formatNaira(legalFee) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-on-surface-variant font-body-md">
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-primary border-t border-outline-variant pt-3 mt-2">
                  <span>Total Price</span>
                  <span>{formatNaira(totalPrice)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => navigate("/agent-dashboard/listings/new/details")}
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-lg" />
              Back
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              Next: Media & Details
              <Icon name="arrow_forward" className="text-lg" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
