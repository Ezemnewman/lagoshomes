import Icon from "./Icon";

/**
 * Each listing can have a different set of amenities — a shortlet
 * might list "Pool" and "WiFi" while a land plot has none at all.
 * Takes an array of {icon, label} so AmenitiesGrid renders nothing
 * special-cased; an empty array just renders an empty grid (the page
 * decides whether to hide the whole section).
 */
export default function AmenitiesGrid({ amenities }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {amenities.map((amenity) => (
        <div key={amenity.label} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
            <Icon name={amenity.icon} className="text-primary" />
          </div>
          <span className="text-on-surface font-body-md">{amenity.label}</span>
        </div>
      ))}
    </div>
  );
}
