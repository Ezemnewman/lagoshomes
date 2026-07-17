import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WizardProgressBar from "../components/WizardProgressBar";
import Icon from "../components/Icon";
import { useAddListing } from "../context/AddListingContext";
import { PROPERTY_TYPES_LIST, LISTING_TYPES_LIST } from "../data/nigerianLocations";

export default function AddListingStep2Page() {
  const navigate = useNavigate();
  const { formData, updateFields } = useAddListing();

  const [title, setTitle] = useState(formData.title || "");
  const [propertyType, setPropertyType] = useState(formData.propertyType || "");
  const [listingType, setListingType] = useState(formData.listingType || "");
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || "");
  const [squareMeters, setSquareMeters] = useState(formData.squareMeters || "");
  const [description, setDescription] = useState(formData.description || "");

  const isLandOrOffice = propertyType === "Land" || propertyType === "Office Space" || propertyType === "Warehouse" || propertyType === "Shop";

  const handleNext = (e) => {
    e.preventDefault();
    updateFields({ title, propertyType, listingType, bedrooms, bathrooms, squareMeters, description });
    navigate("/agent-dashboard/listings/new/price");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">Add New Listing</h1>
          <p className="text-on-surface-variant font-body-md">Step 2 of 4 — Basic Details</p>
        </div>

        <WizardProgressBar currentStep={2} totalSteps={4} />

        <form onSubmit={handleNext} className="bg-white rounded-xl property-shadow p-8 mt-stack-lg space-y-6">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Listing Title <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Luxury 4 Bedroom Duplex in Lekki Phase 1"
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Property Type <span className="text-error">*</span>
              </label>
              <select
                required
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Select type</option>
                {PROPERTY_TYPES_LIST.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Listing Type <span className="text-error">*</span>
              </label>
              <select
                required
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">For Sale / Rent / Shortlet</option>
                {LISTING_TYPES_LIST.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {!isLandOrOffice && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Bedrooms</label>
                <input
                  type="number"
                  min={0}
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Bathrooms</label>
                <input
                  type="number"
                  min={0}
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2">Size (SQM)</label>
                <input
                  type="number"
                  min={0}
                  value={squareMeters}
                  onChange={(e) => setSquareMeters(e.target.value)}
                  placeholder="e.g. 250"
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>
          )}

          {isLandOrOffice && (
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">Size (SQM)</label>
              <input
                type="number"
                min={0}
                value={squareMeters}
                onChange={(e) => setSquareMeters(e.target.value)}
                placeholder="e.g. 500"
                className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          )}

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Property Description <span className="text-error">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property — key features, recent renovations, what makes it stand out..."
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
            />
            <p className="text-xs text-on-surface-variant mt-1">{description.length} / 2000 characters</p>
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => navigate("/agent-dashboard/listings/new")}
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-lg" />
              Back
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95"
            >
              Next: Price
              <Icon name="arrow_forward" className="text-lg" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
