import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import Icon from "../components/Icon";

const FOOTER_LINKS = [
  {
    heading: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * Shown for any unmatched route via a catch-all <Route path="*"> in
 * App.jsx. The illustrated SVG house graphic is built inline —
 * same as the Stitch export intended, using brand colors #005138
 * and #7c5800 rather than importing an external image that could
 * break at runtime.
 */
export default function NotFoundPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/buy?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Illustrated SVG house */}
        <svg
          viewBox="0 0 240 200"
          className="w-56 h-48 mb-6"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ground */}
          <ellipse cx="120" cy="185" rx="90" ry="10" fill="#e8f5f0" />
          {/* House body */}
          <rect x="55" y="100" width="130" height="80" rx="4" fill="#f0faf6" stroke="#005138" strokeWidth="2" />
          {/* Roof */}
          <polygon points="40,105 120,45 200,105" fill="#005138" />
          {/* Roof highlight */}
          <polygon points="55,105 120,55 185,105" fill="#006848" />
          {/* Door */}
          <rect x="100" y="140" width="40" height="40" rx="3" fill="#7c5800" />
          <circle cx="136" cy="162" r="3" fill="#f5e6c8" />
          {/* Windows */}
          <rect x="65" y="115" width="30" height="25" rx="3" fill="#b8e8d4" stroke="#005138" strokeWidth="1.5" />
          <line x1="80" y1="115" x2="80" y2="140" stroke="#005138" strokeWidth="1" />
          <line x1="65" y1="127" x2="95" y2="127" stroke="#005138" strokeWidth="1" />
          <rect x="145" y="115" width="30" height="25" rx="3" fill="#b8e8d4" stroke="#005138" strokeWidth="1.5" />
          <line x1="160" y1="115" x2="160" y2="140" stroke="#005138" strokeWidth="1" />
          <line x1="145" y1="127" x2="175" y2="127" stroke="#005138" strokeWidth="1" />
          {/* Question mark pin */}
          <circle cx="165" cy="55" r="18" fill="#7c5800" />
          <text x="165" y="62" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" fontFamily="sans-serif">?</text>
          {/* Pin tail */}
          <polygon points="160,70 170,70 165,82" fill="#7c5800" />
          {/* Confused face on house */}
          <circle cx="120" cy="82" r="0" fill="none" />
          {/* Small stars/sparkles for lost effect */}
          <text x="35" y="80" fontSize="14" fill="#7c5800" opacity="0.6">✦</text>
          <text x="190" y="70" fontSize="10" fill="#005138" opacity="0.5">✦</text>
          <text x="25" y="120" fontSize="8" fill="#7c5800" opacity="0.4">✦</text>
        </svg>

        {/* 404 number */}
        <h1 className="text-[80px] md:text-[100px] font-black text-primary leading-none mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}>
          404
        </h1>

        <h2 className="font-headline-md text-headline-md text-on-surface mb-3">
          Looks like this property doesn't exist
        </h2>
        <p className="text-on-surface-variant font-body-md max-w-md mb-8">
          The page you're looking for may have been moved, deleted, or never existed.
          Let's get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
          >
            <Icon name="home" className="text-lg" />
            Go Back Home
          </Link>
          <Link
            to="/buy"
            className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md hover:bg-primary/5 transition-all"
          >
            <Icon name="search" className="text-lg" />
            Browse Listings
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors px-4 py-3"
          >
            Contact Support
          </Link>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
          <div className="relative flex-1">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a property instead..."
              className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-full font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
          >
            Search
          </button>
        </form>
      </main>

      <SiteFooter linkColumns={FOOTER_LINKS} fourthColumn={{ type: "whatsapp-cta" }} />
    </div>
  );
}
