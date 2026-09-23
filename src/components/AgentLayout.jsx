import { useContext } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/agent/dashboard',     icon: '▦', label: 'Overview'      },
  { to: '/agent/listings',      icon: '⌂', label: 'My Listings'   },
  { to: '/agent/messages',      icon: '✉', label: 'Messages'      },
  { to: '/agent/subscription',  icon: '₦', label: 'Subscription'  },
  { to: '/agent/settings',      icon: '⚙', label: 'Settings'      },
];

export default function AgentLayout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <span className="text-base font-bold text-green-800">KCEE Agent</span>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.fullName}</p>
        </div>
        <nav className="flex-1 py-3">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm font-medium
                 transition-colors hover:bg-green-50 hover:text-green-800
                 ${isActive
                   ? 'text-green-800 bg-green-50 border-r-2 border-green-700'
                   : 'text-gray-600'}`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={async () => { await logout(); navigate('/login'); }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            ⎋ Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}