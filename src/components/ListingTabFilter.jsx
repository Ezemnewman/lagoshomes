/**
 * Real, working tab filter — not just decorative active-state styling
 * like the Stitch export's JS-toggle-a-class approach. State lives
 * here and is reported up via onTabChange so the parent page decides
 * which listings to show; this component only knows about tabs and
 * sorting, not about property data itself.
 */
const TABS = ["For Sale", "For Rent", "Shortlet", "Land"];

export default function ListingTabFilter({ activeTab, onTabChange, onSortChange }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-outline-variant mb-stack-md">
      <div className="flex gap-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-4 font-label-md transition-colors ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-2 text-on-surface-variant text-label-md pb-4">
        <span>Sort by:</span>
        <select
          onChange={(e) => onSortChange?.(e.target.value)}
          className="bg-transparent border-none focus:ring-0 font-bold text-primary cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
