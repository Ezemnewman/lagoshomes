import { useState } from "react";
import Icon from "./Icon";

/**
 * The Stitch export had two filter groups (Property Type checkboxes,
 * Bedroom count buttons) written as literal JS template-string .map()
 * calls sitting inside the static HTML — that's not real markup, it's
 * generation-time pseudo-code that Stitch never actually executed.
 * Here those become genuine React .map() calls over real arrays, which
 * is what they were always meant to be.
 *
 * Filter state lives in this component and is reported upward via
 * onApply, so the page (or eventually a real search API call) decides
 * what to do with it — this component doesn't know about routing or
 * fetching, just collects the user's choices.
 */
const PROPERTY_TYPES = [
  "Duplex",
  "Bungalow",
  "Block of Flats",
  "Self-Contained",
  "Mini Flat",
  "Terrace",
  "Semi-Detached",
  "Detached",
  "Land",
  "Office Space",
];

const BEDROOM_OPTIONS = ["1+", "2+", "3+", "4+", "5+"];

const LISTING_TYPES = ["For Sale", "For Rent", "Shortlet"];

export default function FilterSidebar({ onApply }) {
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [listingType, setListingType] = useState("For Sale");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [bedrooms, setBedrooms] = useState("3+");
  const [maxPrice, setMaxPrice] = useState(500000000);
  const [state, setState] = useState("Lagos");
  const [area, setArea] = useState("Lekki Phase 1");

  const togglePropertyType = (type) => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleReset = () => {
    setVerifiedOnly(true);
    setListingType("For Sale");
    setPropertyTypes([]);
    setBedrooms("3+");
    setMaxPrice(500000000);
    setState("Lagos");
    setArea("Lekki Phase 1");
  };

  const handleApply = () => {
    onApply?.({ verifiedOnly, listingType, propertyTypes, bedrooms, maxPrice, state, area });
    // TODO: connect to GET /api/listings with these as query params
  };

  return (
    <aside className="w-full md:w-1/4 space-y-stack-lg">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 sticky top-24">
        <div className="flex justify-between items-center mb-stack-lg">
          <h2 className="font-headline-sm text-headline-sm text-primary">Filters</h2>
          <button onClick={handleReset} className="text-label-md text-primary font-bold hover:underline">
            Reset All
          </button>
        </div>

        {/* Verified Agents Toggle */}
        <div className="flex items-center justify-between py-stack-md border-b border-outline-variant/30 mb-stack-md">
          <span className="font-label-md text-on-surface-variant">Verified Agents Only</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
          </label>
        </div>

        {/* Listing Type */}
        <div className="mb-stack-lg">
          <h3 className="font-label-md text-primary mb-stack-sm uppercase tracking-wider">
            Listing Type
          </h3>
          <div className="space-y-2">
            {LISTING_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="listing_type"
                  checked={listingType === type}
                  onChange={() => setListingType(type)}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Property Type — was Stitch pseudo-code, now a real .map() */}
        <div className="mb-stack-lg">
          <h3 className="font-label-md text-primary mb-stack-sm uppercase tracking-wider">
            Property Type
          </h3>
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            {PROPERTY_TYPES.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={propertyTypes.includes(type)}
                  onChange={() => togglePropertyType(type)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-stack-lg">
          <h3 className="font-label-md text-primary mb-stack-sm uppercase tracking-wider">
            Price Range (₦)
          </h3>
          <input
            type="range"
            min={1000000}
            max={500000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-2 text-label-md text-on-surface-variant">
            <span>1M</span>
            <span>500M+</span>
          </div>
        </div>

        {/* Bedrooms — also Stitch pseudo-code, now a real .map() */}
        <div className="mb-stack-lg">
          <h3 className="font-label-md text-primary mb-stack-sm uppercase tracking-wider">
            Bedrooms
          </h3>
          <div className="grid grid-cols-5 gap-1">
            {BEDROOM_OPTIONS.map((num) => (
              <button
                key={num}
                onClick={() => setBedrooms(num)}
                className={`py-2 text-label-md border rounded-lg transition-all ${
                  bedrooms === num
                    ? "bg-primary text-white border-primary"
                    : "border-outline-variant hover:bg-primary hover:text-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="mb-stack-lg space-y-stack-sm">
          <h3 className="font-label-md text-primary mb-stack-sm uppercase tracking-wider">
            Location
          </h3>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option>Lagos</option>
            <option>Abuja</option>
            <option>Rivers</option>
          </select>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-white border border-outline-variant rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option>Lekki Phase 1</option>
            <option>Ikoyi</option>
            <option>Victoria Island</option>
          </select>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-primary text-on-primary py-3 rounded-full font-label-md hover:opacity-90 transition-all shadow-md"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
