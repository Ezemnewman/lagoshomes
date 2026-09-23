import { useContext, useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/admin/dashboard',     icon: '▦',  label: 'Dashboard'       },
  { to: '/admin/agents',        icon: '✔',  label: 'Agents'          },
  { to: '/admin/listings',      icon: '⌂',  label: 'Listings'        },
  { to: '/admin/reports',       icon: '⚑',  label: 'Reports'         },
  { to: '/admin/monetization',  icon: '₦',  label: 'Monetization'    },
  { to: '/admin/settings',      icon: '⚙',  label: 'Site Settings'   },
];

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ── SIDEBAR ───────────────────────────────────── */}
      <aside
        className={`flex flex-col bg-[#005138] text-white transition-all duration-300
                    ${collapsed ? 'w-16' : 'w-64'} flex-shrink-0`}
      >
        {/* Logo / Brand */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-green-700">
          {!collapsed && (
            <span className="text-lg font-bold tracking-wide">KCEE Admin</span>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="text-green-300 hover:text-white text-xl ml-auto"
            title="Toggle sidebar"
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium
                 transition-colors hover:bg-green-700
                 ${isActive ? 'bg-green-800 border-r-4 border-yellow-400' : ''}`
              }
            >
              <span className="text-lg w-6 text-center">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-green-700 p-4">
          {!collapsed && (
            <div className="mb-3">
              <p className="text-xs text-green-300">Signed in as</p>
              <p className="text-sm font-semibold truncate">{user?.fullName}</p>
              <p className="text-xs text-green-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-300
                       hover:text-red-100 transition-colors w-full"
          >
            <span>⎋</span>
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ──────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top status bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              KCEE Real Estate — Admin Portal
            </h1>
            <p className="text-xs text-gray-400">
              {new Date().toLocaleDateString('en-NG', {
                weekday: 'long', year: 'numeric',
                month: 'long',   day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <span className="flex items-center gap-1 text-xs bg-green-50
                             text-green-700 px-3 py-1 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Online
            </span>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-green-700 text-white text-sm
                            flex items-center justify-center font-bold">
              {user?.fullName?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}