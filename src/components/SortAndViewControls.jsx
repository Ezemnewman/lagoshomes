import { useState } from "react";
import Icon from "./Icon";

/**
 * Sort dropdown + grid/map view toggle. The Stitch export hardcoded
 * the grid icon as "active" — here that's real state, so clicking
 * actually switches which icon looks selected. The map view itself
 * doesn't render yet; that's wired up properly in the Google Maps
 * integration step.
 */
const SORT_OPTIONS = [
  { value: "newest", label: "Sort: Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function SortAndViewControls({ onSortChange, onViewChange }) {
  const [view, setView] = useState("grid");

  const handleViewChange = (newView) => {
    setView(newView);
    onViewChange?.(newView);
    // TODO: map view renders an actual map once Google Maps integration is built
  };

  return (
    <div className="flex items-center gap-stack-sm">
      <select
        onChange={(e) => onSortChange?.(e.target.value)}
        className="bg-white border border-outline-variant rounded-full py-2 px-6 text-label-md focus:ring-2 focus:ring-primary appearance-none pr-10"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex bg-surface-container-high p-1 rounded-full">
        <button
          onClick={() => handleViewChange("grid")}
          aria-label="Grid view"
          className={`p-2 rounded-full transition-colors ${
            view === "grid" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <Icon name="grid_view" />
        </button>
        <button
          onClick={() => handleViewChange("map")}
          aria-label="Map view"
          className={`p-2 rounded-full transition-colors ${
            view === "map" ? "bg-white shadow-sm text-primary" : "text-on-surface-variant hover:text-primary"
          }`}
        >
          <Icon name="map" />
        </button>
      </div>
    </div>
  );
}
