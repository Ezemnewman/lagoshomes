import Icon from "./Icon";

/**
 * Static placeholder map image for now, per our decision to wire up
 * real Google Maps in the dedicated Maps/API integration step rather
 * than now. The `mapImageUrl` prop is how that swap happens later —
 * this component's job (show a location visual + nearby places lists)
 * doesn't change, only what fills the map slot does.
 *
 * `nearbyPlaceGroups` is generic ({ title, icon, places: [] }[]) rather
 * than hardcoded "schools" and "medical" fields, since some listings
 * might want to show "Nearby Transit" or "Shopping" instead.
 */
export default function LocationSection({ mapImageUrl, mapImageAlt, nearbyPlaceGroups = [] }) {
  return (
    <div>
      <h2 className="font-headline-md text-headline-md mb-6">Location</h2>

      <div className="w-full h-80 rounded-xl overflow-hidden property-shadow mb-6">
        <img src={mapImageUrl} alt={mapImageAlt} className="w-full h-full object-cover" />
        {/* TODO: replace with an embedded interactive Google Map once
            the Maps/API integration step is built */}
      </div>

      {nearbyPlaceGroups.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          {nearbyPlaceGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-label-md text-primary mb-3 uppercase">{group.title}</h3>
              <ul className="space-y-2 text-on-surface-variant">
                {group.places.map((place) => (
                  <li key={place} className="flex items-center gap-2">
                    <Icon name={group.icon} className="text-[18px]" />
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
