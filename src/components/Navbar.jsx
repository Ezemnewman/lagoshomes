import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon";

/**
 * Site-wide navigation. Used on every page, so any nav change
 * (new tab, renamed link, login state) happens in exactly one place.
 *
 * navLinks is passed in as data rather than hardcoded JSX, so adding
 * a page (e.g. "New Developments") later is a one-line data change,
 * not a markup edit on every page that renders the navbar.
 *
 * Uses react-router's NavLink instead of a plain <a> so these links
 * actually navigate (no more dead href="#") and the active/underline
 * state is determined automatically by the current URL instead of a
 * hardcoded `active: true` flag that never changed pages.
 */
const DEFAULT_LINKS = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Shortlet", to: "/shortlet" },
  { label: "Land", to: "/land" },
  { label: "Agents", to: "/agents/tunde-bakare" },
];

export default function Navbar({ links = DEFAULT_LINKS, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-primary border-b-2 border-primary pb-1 transition-colors"
      : "text-on-surface-variant hover:text-primary transition-colors";

  return (
    <header className="bg-surface sticky top-0 z-50 shadow-sm">
      <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
        <Link to="/" className="text-headline-md font-headline-md font-bold text-primary">
          KCEE
        </Link>

        <ul className="hidden md:flex items-center gap-gutter font-label-md text-label-md">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink to={link.to} className={linkClasses}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to="/signup"
            className="hidden md:block bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
          >
            List Your Property
          </Link>

          {/* Shows the user's photo once they have one (e.g. on the search
              results page export); falls back to the plain icon for
              logged-out visitors or agents who haven't uploaded a photo yet. */}
          {user?.avatarUrl ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer">
              <img
                src={user.avatarUrl}
                alt={user.name ? `${user.name}'s profile` : "User profile"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center text-on-surface-variant">
              <Icon name="person" />
            </div>
          )}

          <button
            className="md:hidden flex items-center"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <Icon name="menu" />
          </button>
        </div>
      </nav>

      {/* Mobile menu — Stitch export didn't include this, added so the
          hamburger button actually does something instead of being decorative */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col gap-stack-sm px-margin-mobile pb-4 font-label-md text-label-md">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-on-surface-variant"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-primary text-on-primary px-6 py-2.5 rounded-full mt-stack-sm"
            >
              List Your Property
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
