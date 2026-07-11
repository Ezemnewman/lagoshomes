import { useState } from "react";
import Icon from "./Icon";

/**
 * Controlled form so it actually captures input instead of just
 * looking like a search bar. onSearch receives a clean object —
 * when the backend exists, this becomes the request body for
 * GET /api/listings?type=...&location=...&priceRange=...
 */
export default function SearchBar({ onSearch }) {
  const [type, setType] = useState("Buy");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ type, location, priceRange });
    // TODO: connect to GET /api/listings with these as query params
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-container-lowest p-stack-md rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center"
    >
      <div className="w-full md:w-1/4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border-outline-variant rounded-lg font-body-md py-3 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option>Buy</option>
          <option>Rent</option>
          <option>Shortlet</option>
        </select>
      </div>

      <div className="w-full md:w-2/4 relative">
        <Icon
          name="location_on"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by city or area, e.g. Lekki, Lagos"
          className="w-full pl-10 border-outline-variant rounded-lg font-body-md py-3 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="w-full md:w-1/4">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border-outline-variant rounded-lg font-body-md py-3 focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Price Range</option>
          <option value="0-5m">₦0 - ₦5M</option>
          <option value="5m-20m">₦5M - ₦20M</option>
          <option value="20m+">₦20M - ₦100M+</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-95 transition-all shadow-md"
      >
        Search
      </button>
    </form>
  );
}
