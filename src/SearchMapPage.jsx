import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Icon from "../components/Icon";
import { SEARCH_RESULTS_PROPERTIES } from "../data/properties";

/**
 * The API key must be in .env as VITE_GOOGLE_MAPS_API_KEY.
 * See .env.example for setup instructions (same Google Cloud
 * Console project as the OAuth key setup).
 *
 * When the key is missing, the map panel shows a clear placeholder
 * instead of crashing — same pattern as GoogleSignInButton.
 *
 * Demo property coordinates are approximate Lagos locations.
 * Real coordinates will come from GET /api/listings which will
 * include lat/lng fields from the listing creation form's
 * location step once the backend exists.
 */

const DEMO_MAP_CENTER = { lat: 6.4281, lng: 3.4219 }; // Lagos

const DEMO_PINS = [
  { id: "s1", lat: 6.4698, lng: 3.5852, price: "₦85M", title: "Luxury 4 Bedroom Duplex", location: "Lekki Phase 1", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNH9P9UQcYTPLw1_G-LvypRQybhMDPxyKJV3bLco1cAyPsNDTzJFBOdbSGipv5kHze-UfiCbhxjHvLvqQFREscfcxsoPR0Oubx9Yult5zOFrd8xRLebkI67Rl0y6EDv7FBnTXN8Y6lFGjHVsHn5N4rz7OjkVipo-sbh_FwcwKFtKbJjzQnOc1BRVuxgkbbI26vchEqhdCEjlXkhPcH1lKf1i7iRgSh-o3QzB4ZXYenRvHT5fJXfWyk3JzW50Gm4GRdsXGpGYObQ3aV" },
  { id: "s2", lat: 6.4550, lng: 3.4350, price: "₦120M", title: "Modern 3 Bedroom Flat", location: "Ikoyi", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVF1Ex1Aks04Kyvr2pesSd1qGAZORCNPaiSR62Vk6bxGcuPNNg6SrvBwy4A5RT-74xHd_amJBGBe1c9ZK_tMHrLhYvyrh7Q9byUZOBY0pzmAZgtegyrZsbpqKQSiE4Rpajce9bp05huLW7TyiXM_CvgyhARZcOTwU8o3us6yGOiPXHUxmlFOkhU2bF1HjFMfzuv1e-_IyUkfKVHRyXUJn07cuHCBxnBX5Bhl0duykHoWnfKz-4W6d523Us_dQEWplbAroOnc3izsQF" },
  { id: "s3", lat: 6.4300, lng: 3.4100, price: "₦65M", title: "Detached 5 Bedroom Villa", location: "Ajah", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBWD9O6ksrKXEQAuf7m3OeZ2rZktRHTgStZFolDpKpDnEPgo5AHRjfwMGOgQj7PCpVTbSLaADyC1xq6ME6K3Kf-eXAfe2eYw9tQy63B0gyPTdzdNMLrTAR4XxHfzQ8eQVyk2Phg_2EfTFTxXGBy71AAIE6zb6AnSdBQ7aFWICUG8AmVbQXCoAr15H1WJZMCONpGyWWGioOi02AzQ4oIw2Mv9EgftsjsgUYVSf2gUUo4Sa3IxikSN5mC65yP9Kww3BuqqHs15B7KKZV" },
  { id: "s4", lat: 6.5244, lng: 3.3792, price: "₦45M", title: "Premium 2 Bedroom Flat", location: "Surulere", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_5MpiOow5JuBX1RsNs0q0dFUmAug_ycYBVyT8I5gtOj0Sri_HMWTGS3V-H1y8LdM291Jl99mxXiiSAXQHi_DD0lVMWjOgKWrDoJEXPK0WGHF2xrwccoL-Jk2x1g4Ed3_zBDY7IkUbosYKwtwqWGdeylbsZIYqZJGZeAhQQLqI-1pJNtuEztzpxXVIAhVShWBn_BfFLTq6xhXSiAGNZQrfDqYxAEApqsj-_TdVTdEh4BSpG5fwDsjixsaPvkev5EFVl8uq1_ofgU6k" },
];

const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  ],
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function SearchMapPage() {
  const [activePin, setActivePin] = useState(null);
  const [activeListingId, setActiveListingId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY || "",
    id: "kcee-google-map",
  });

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handlePinClick = (pin) => {
    setActivePin(pin);
    setActiveListingId(pin.id);
  };

  const handleListingHover = (id) => setActiveListingId(id);
  const handleListingLeave = () => setActiveListingId(null);

  const handleSearchThisArea = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      console.log("Search area:", center.lat(), center.lng());
      // TODO: refetch GET /api/listings?lat=...&lng=...&radius=... once backend exists
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Left panel — listing list */}
        <aside className="w-full md:w-[420px] flex-shrink-0 flex flex-col border-r border-outline-variant overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-outline-variant bg-surface">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search area, city or property..."
                  className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg text-sm font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
              <Link
                to="/buy"
                className="flex items-center gap-1.5 px-4 py-2.5 border border-outline-variant rounded-lg text-on-surface-variant text-sm hover:bg-surface-container transition-colors"
              >
                <Icon name="grid_view" className="text-sm" />
                Grid
              </Link>
            </div>
            <p className="text-xs text-on-surface-variant mt-2 ml-1">
              {DEMO_PINS.length} properties in Lagos
            </p>
          </div>

          {/* Listing list */}
          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant/30">
            {SEARCH_RESULTS_PROPERTIES.slice(0, 4).map((property, i) => {
              const pin = DEMO_PINS[i];
              const isActive = activeListingId === (pin?.id || property.id);
              return (
                <Link
                  key={property.id}
                  to={`/listing/${property.id}`}
                  onMouseEnter={() => handleListingHover(pin?.id || property.id)}
                  onMouseLeave={handleListingLeave}
                  className={`flex gap-3 p-4 transition-all ${
                    isActive ? "bg-primary/5 border-l-4 border-primary" : "hover:bg-surface-container"
                  }`}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={property.imageUrl} alt={property.imageAlt} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary text-sm">{property.formattedPrice}</p>
                    <p className="font-label-md text-on-surface text-sm font-semibold truncate">{property.title}</p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                      <Icon name="location_on" className="text-xs" />
                      {property.location}
                    </p>
                    <div className="flex gap-3 mt-1.5">
                      {property.details.map((d) => (
                        <span key={d.label} className="flex items-center gap-0.5 text-xs text-on-surface-variant">
                          <Icon name={d.icon} className="text-xs" />
                          {d.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Right panel — map */}
        <div className="flex-1 relative hidden md:block">
          {!API_KEY ? (
            <div className="w-full h-full bg-surface-container flex flex-col items-center justify-center gap-4 text-on-surface-variant">
              <Icon name="map" className="text-[64px] opacity-20" />
              <div className="text-center max-w-xs">
                <p className="font-label-md font-bold text-on-surface mb-1">Google Maps not configured</p>
                <p className="text-sm">
                  Add <code className="bg-surface-container-high px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to your{" "}
                  <code className="bg-surface-container-high px-1 rounded">.env</code> file and restart the dev server.
                </p>
                <p className="text-xs mt-2 text-on-surface-variant">See .env.example for setup instructions.</p>
              </div>
            </div>
          ) : loadError ? (
            <div className="w-full h-full bg-surface-container flex items-center justify-center text-error">
              <p>Failed to load Google Maps. Check your API key and billing settings.</p>
            </div>
          ) : !isLoaded ? (
            <div className="w-full h-full bg-surface-container flex items-center justify-center">
              <Icon name="progress_activity" className="animate-spin text-primary text-[40px]" />
            </div>
          ) : (
            <>
              {/* "Search this area" button */}
              <button
                onClick={handleSearchThisArea}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white shadow-lg border border-outline-variant px-5 py-2.5 rounded-full font-label-md text-sm hover:bg-surface-container transition-all flex items-center gap-2"
              >
                <Icon name="my_location" className="text-primary text-sm" />
                Search this area
              </button>

              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={DEMO_MAP_CENTER}
                zoom={12}
                options={MAP_OPTIONS}
                onLoad={onMapLoad}
              >
                {DEMO_PINS.map((pin) => (
                  <Marker
                    key={pin.id}
                    position={{ lat: pin.lat, lng: pin.lng }}
                    onClick={() => handlePinClick(pin)}
                    label={{
                      text: pin.price,
                      color: activeListingId === pin.id ? "#ffffff" : "#005138",
                      fontWeight: "bold",
                      fontSize: "11px",
                    }}
                    icon={{
                      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                      fillColor: activeListingId === pin.id ? "#005138" : "#ffffff",
                      fillOpacity: 1,
                      strokeColor: "#005138",
                      strokeWeight: 2,
                      scale: 2,
                      anchor: { x: 12, y: 22 },
                      labelOrigin: { x: 12, y: 9 },
                    }}
                  />
                ))}

                {activePin && (
                  <InfoWindow
                    position={{ lat: activePin.lat, lng: activePin.lng }}
                    onCloseClick={() => setActivePin(null)}
                  >
                    <Link to={`/listing/${activePin.id}`} className="block w-48 no-underline">
                      <img src={activePin.imageUrl} alt={activePin.title} className="w-full h-28 object-cover rounded-t" />
                      <div className="p-2">
                        <p className="font-bold text-primary text-sm">{activePin.price}</p>
                        <p className="text-xs text-gray-700 font-medium truncate">{activePin.title}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-0.5 mt-0.5">
                          <span>📍</span>{activePin.location}
                        </p>
                      </div>
                    </Link>
                  </InfoWindow>
                )}
              </GoogleMap>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
