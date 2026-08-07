import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { useAuth } from "../context/AuthContext";

const DEFAULT_LINKS = [
  { label: "Buy", to: "/buy" },
  { label: "Rent", to: "/rent" },
  { label: "Shortlet", to: "/shortlet" },
  { label: "Land", to: "/land" },
  { label: "Agents", to: "/agents" },
];

export default function Navbar({ links = DEFAULT_LINKS }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  /**
   * Smart "List Your Property" routing:
   * - Not logged in → /signup
   * - Buyer → /signup (to become an agent)
   * - Agent pending → /agents/apply/review
   * - Agent approved → /agent-dashboard/listings/new
   * - Admin → /admin
   */
  const handleListProperty = () => {
    setMobileOpen(false);
    if (!user) return navigate("/signup");
    if (user.role === "ADMIN") return navigate("/admin");
    if (user.role === "AGENT") {
      if (user.agentProfile?.status === "APPROVED") {
        return navigate("/agent-dashboard/listings/new");
      }
      return navigate("/agents/apply/review");
    }
    // BUYER — send to signup to become an agent
    return navigate("/signup");
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "AGENT") return "/agent-dashboard";
    return "/dashboard";
  };

  const initials = user?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="font-headline-md text-headline-md text-primary font-bold flex-shrink-0">
          KCEE
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-label-md text-label-md transition-colors ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleListProperty}
            className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
          >
            {user?.role === "AGENT" && user.agentProfile?.status === "APPROVED"
              ? "Add Listing"
              : "List Your Property"}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 hover:bg-surface-container rounded-full px-3 py-1.5 transition-colors"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-fixed" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-sm">
                    {initials}
                  </div>
                )}
                <Icon name="keyboard_arrow_down" className="text-on-surface-variant text-sm" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl property-shadow border border-outline-variant/20 py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/20">
                    <p className="font-bold text-on-surface text-sm truncate">{user.fullName}</p>
                    <p className="text-xs text-on-surface-variant capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <Link to={getDashboardLink()} onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-on-surface hover:bg-surface-container text-sm transition-colors">
                    <Icon name="dashboard" className="text-sm" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-error hover:bg-error/5 text-sm transition-colors">
                    <Icon name="logout" className="text-sm" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors">
              <Icon name="person" />
              Log In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <Icon name={mobileOpen ? "close" : "menu"} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 py-4 px-margin-mobile">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg font-label-md transition-colors ${
                    isActive ? "text-primary font-bold bg-primary/5" : "text-on-surface-variant hover:bg-surface-container"
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="text-left px-4 py-3 rounded-lg font-label-md text-error hover:bg-error/5 transition-colors">
                  Log Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
                Log In
              </Link>
            )}
            <button
              onClick={handleListProperty}
              className="mt-2 w-full text-center bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md hover:opacity-90 transition-all"
            >
              {user?.role === "AGENT" && user.agentProfile?.status === "APPROVED"
                ? "Add Listing"
                : "List Your Property"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
