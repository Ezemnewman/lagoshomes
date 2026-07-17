import { useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useFavorites } from "../context/FavoritesContext";

/**
 * SearchMapPage
 * Split-screen search results: scrollable list on the left, real Google Map
 * on the right with pins for each property. Clicking a pin opens a popup
 * card; clicking a card in the list highlights + pans to its pin.
 *
 * Env: reads VITE_GOOGLE_MAPS_API_KEY from .env. If it's missing/empty,
 * the map area renders a clear placeholder instead of crashing or going blank.
 */

const MAP_LIBRARIES = ["places"];

const LAGOS_CENTER = { lat: 6.5244, lng: 3.3792 };

// TODO: replace with real API data (fetched by bounds/filters)
const MOCK_PROPERTIES = [
  {
    id: "p1",
    title: "3 Bedroom Flat, Lekki Phase 1",
    price: 4500000,
    rentOrSale: "rent",
    beds: 3,
    baths: 3,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    lat: 6.4432,
    lng: 3.4726,
    agent: "Chidera Okafor",
  },
  {
    id: "p2",
    title: "4 Bedroom Duplex, Ikoyi",
    price: 120000000,
    rentOrSale: "sale",
    beds: 4,
    baths: 5,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    lat: 6.4541,
    lng: 3.4316,
    agent: "Ifeoma Adeyemi",
  },
  {
    id: "p3",
    title: "2 Bedroom Apartment, Yaba",
    price: 2200000,
    rentOrSale: "rent",
    beds: 2,
    baths: 2,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
    lat: 6.5158,
    lng: 3.3708,
    agent: "Tunde Bakare",
  },
  {
    id: "p4",
    title: "5 Bedroom Detached House, Victoria Island",
    price: 250000000,
    rentOrSale: "sale",
    beds: 5,
    baths: 6,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    lat: 6.4281,
    lng: 3.4219,
    agent: "Ngozi Eze",
  },
];

function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

const mapContainerStyle = { width: "100%", height: "100%" };

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

function MapPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#f3f1ea] px-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#005138]/10">
        <svg
          className="h-7 w-7 text-[#005138]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </div>
      <p className="font-semibold text-[#1a1a1a]">Map unavailable</p>
      <p className="mt-1 max-w-xs text-sm text-[#6b6b6b]">
        Add a valid <code className="rounded bg-white px-1 py-0.5 text-xs">VITE_GOOGLE_MAPS_API_KEY</code> to
        your <code className="rounded bg-white px-1 py-0.5 text-xs">.env</code> file to enable the live map
        view. Listings are still browsable in the list on the left.
      </p>
    </div>
  );
}

function PropertyListCard({ property, isActive, onHover, onClick }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(property.id);

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(property.id)}
      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition ${
        isActive
          ? "border-[#005138] bg-[#005138]/5 shadow-sm"
          : "border-[#e7e5df] bg-white hover:border-[#005138]/40"
      }`}
    >
      <img
        src={property.image}
        alt={property.title}
        className="h-20 w-24 flex-shrink-0 rounded-lg object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold text-[#1a1a1a]">
            {property.title}
          </p>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property);
            }}
            className="flex-shrink-0 text-[#c9c6bd] hover:text-[#7c5800]"
            aria-label={fav ? "Remove from favorites" : "Save to favorites"}
          >
            <svg
              className="h-5 w-5"
              fill={fav ? "#7c5800" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z"
              />
            </svg>
          </span>
        </div>
        <p className="mt-1 text-sm font-bold text-[#005138]">
          {formatNaira(property.price)}
          {property.rentOrSale === "rent" && (
            <span className="font-normal text-[#6b6b6b]"> /year</span>
          )}
        </p>
        <p className="mt-1 text-xs text-[#6b6b6b]">
          {property.beds} beds &middot; {property.baths} baths
        </p>
        <p className="mt-auto truncate text-xs text-[#8a8a8a]">
          Agent: {property.agent}
        </p>
      </div>
    </button>
  );
}

function MapPopupCard({ property, onClose }) {
  return (
    <div className="w-64 overflow-hidden rounded-xl bg-white shadow-lg">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow"
      >
        &times;
      </button>
      <img
        src={property.image}
        alt={property.title}
        className="h-32 w-full object-cover"
      />
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-[#1a1a1a]">
          {property.title}
        </p>
        <p className="mt-1 text-sm font-bold text-[#005138]">
          {formatNaira(property.price)}
          {property.rentOrSale === "rent" && (
            <span className="font-normal text-[#6b6b6b]"> /year</span>
          )}
        </p>
        <p className="mt-1 text-xs text-[#6b6b6b]">
          {property.beds} beds &middot; {property.baths} baths
        </p>
        <Link
          to={`/property/${property.id}`}
          className="mt-2 block rounded-lg bg-[#005138] px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-[#00402c]"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default function SearchMapPage() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "kcee-google-map-script",
    googleMapsApiKey: apiKey || "",
    libraries: MAP_LIBRARIES,
  });

  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [openPopupId, setOpenPopupId] = useState(null);
  const mapRef = useRef(null);

  const properties = MOCK_PROPERTIES;

  const highlightedId = hoveredId ?? activeId;

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleListClick = (id) => {
    setActiveId(id);
    setOpenPopupId(id);
    const property = properties.find((p) => p.id === id);
    if (mapRef.current && property) {
      mapRef.current.panTo({ lat: property.lat, lng: property.lng });
    }
  };

  const handlePinClick = (id) => {
    setActiveId(id);
    setOpenPopupId(id);
  };

  const openPopupProperty = useMemo(
    () => properties.find((p) => p.id === openPopupId) || null,
    [openPopupId, properties]
  );

  const canRenderMap = Boolean(apiKey) && isLoaded && !loadError;

  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col bg-white">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e7e5df] px-4 py-3">
        <select className="rounded-lg border border-[#e7e5df] px-3 py-1.5 text-sm text-[#1a1a1a]">
          <option>For Rent</option>
          <option>For Sale</option>
        </select>
        <select className="rounded-lg border border-[#e7e5df] px-3 py-1.5 text-sm text-[#1a1a1a]">
          <option>Lagos</option>
          <option>Abuja</option>
          <option>Port Harcourt</option>
          <option>Enugu</option>
          <option>Ibadan</option>
        </select>
        <select className="rounded-lg border border-[#e7e5df] px-3 py-1.5 text-sm text-[#1a1a1a]">
          <option>Any Price</option>
          <option>Under ₦2M</option>
          <option>₦2M - ₦5M</option>
          <option>₦5M+</option>
        </select>
        <select className="rounded-lg border border-[#e7e5df] px-3 py-1.5 text-sm text-[#1a1a1a]">
          <option>Any Beds</option>
          <option>1+</option>
          <option>2+</option>
          <option>3+</option>
          <option>4+</option>
        </select>
        <p className="ml-auto text-sm text-[#6b6b6b]">
          {properties.length} results
        </p>
      </div>

      {/* Split screen */}
      <div className="flex min-h-0 flex-1">
        {/* Results list */}
        <div className="w-full max-w-sm flex-shrink-0 overflow-y-auto border-r border-[#e7e5df] p-3 md:max-w-md">
          <div className="flex flex-col gap-3">
            {properties.map((property) => (
              <PropertyListCard
                key={property.id}
                property={property}
                isActive={highlightedId === property.id}
                onHover={setHoveredId}
                onClick={handleListClick}
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="relative hidden flex-1 md:block">
          {!apiKey || loadError ? (
            <MapPlaceholder />
          ) : !isLoaded ? (
            <div className="flex h-full w-full items-center justify-center bg-[#f3f1ea] text-sm text-[#6b6b6b]">
              Loading map...
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={LAGOS_CENTER}
              zoom={11}
              options={mapOptions}
              onLoad={onMapLoad}
              onClick={() => setOpenPopupId(null)}
            >
              {properties.map((property) => (
                <MarkerF
                  key={property.id}
                  position={{ lat: property.lat, lng: property.lng }}
                  onClick={() => handlePinClick(property.id)}
                  onMouseOver={() => setHoveredId(property.id)}
                  onMouseOut={() => setHoveredId(null)}
                  icon={{
                    path: "M12 0C7.6 0 4 3.6 4 8c0 5.4 7 15 8 16 1-1 8-10.6 8-16 0-4.4-3.6-8-8-8z",
                    fillColor:
                      highlightedId === property.id ? "#7c5800" : "#005138",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: "#ffffff",
                    scale: 1.6,
                    anchor: canRenderMap
                      ? new window.google.maps.Point(12, 24)
                      : undefined,
                  }}
                />
              ))}

              {openPopupProperty && canRenderMap && (
                <div
                  className="absolute z-10"
                  style={{
                    // Simple fixed-position popup anchored bottom-right of map;
                    // swap for an OverlayView/InfoWindow if precise pin-anchoring is needed.
                    right: 16,
                    bottom: 16,
                  }}
                >
                  <MapPopupCard
                    property={openPopupProperty}
                    onClose={() => setOpenPopupId(null)}
                  />
                </div>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}
