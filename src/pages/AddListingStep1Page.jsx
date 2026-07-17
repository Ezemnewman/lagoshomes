import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WizardProgressBar from "../components/WizardProgressBar";
import Icon from "../components/Icon";
import { useAddListing } from "../context/AddListingContext";
import { NIGERIAN_STATES } from "../data/nigerianLocations";

/**
 * Step 1 of 4 in the Add New Listing wizard. The state/LGA selectors
 * are real cascading dropdowns: selecting a state immediately filters
 * the LGA list to only that state's LGAs. All 36 Nigerian states plus
 * FCT are available via NIGERIAN_STATES — no hardcoded subset.
 */
export default function AddListingStep1Page() {
  const navigate = useNavigate();
  const { formData, updateFields } = useAddListing();

  const [state, setState] = useState(formData.state || "");
  const [lga, setLga] = useState(formData.lga || "");
  const [streetAddress, setStreetAddress] = useState(formData.streetAddress || "");
  const [landmark, setLandmark] = useState(formData.landmark || "");

  const selectedStateData = useMemo(
    () => NIGERIAN_STATES.find((s) => s.name === state),
    [state]
  );

  const handleStateChange = (e) => {
    setState(e.target.value);
    setLga(""); // reset LGA when state changes
  };

  const handleNext = (e) => {
    e.preventDefault();
    updateFields({ state, lga, streetAddress, landmark });
    navigate("/agent-dashboard/listings/new/details");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">
            Add New Listing
          </h1>
          <p className="text-on-surface-variant font-body-md">
            Step 1 of 4 — Property Location
          </p>
        </div>

        <WizardProgressBar currentStep={1} totalSteps={4} />

        <form onSubmit={handleNext} className="bg-white rounded-xl property-shadow p-8 mt-stack-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                State <span className="text-error">*</span>
              </label>
              <select
                required
                value={state}
                onChange={handleStateChange}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Select a state</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Local Government Area <span className="text-error">*</span>
              </label>
              <select
                required
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                disabled={!state}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{state ? "Select an LGA" : "Select a state first"}</option>
                {selectedStateData?.lgas.map((lgaName) => (
                  <option key={lgaName} value={lgaName}>{lgaName}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Street Address <span className="text-error">*</span>
            </label>
            <div className="relative">
              <Icon name="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="e.g. 12 Admiralty Way, Lekki Phase 1"
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Nearest Landmark
              <span className="text-on-surface-variant text-xs ml-2">(optional, helps buyers find it)</span>
            </label>
            <div className="relative">
              <Icon name="near_me" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Opposite Shoprite Lekki"
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => navigate("/agent-dashboard/listings")}
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-lg" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              Next: Basic Details
              <Icon name="arrow_forward" className="text-lg" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
