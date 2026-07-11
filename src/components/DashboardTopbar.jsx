import Icon from "./Icon";

/**
 * Shared topbar for the dashboard shell. Search placeholder text is a
 * prop since Overview's export says "Search properties, areas, or
 * agents..." while Favorites' says "Search your favorites..." — same
 * bar, different copy per page, so that one detail is left flexible
 * rather than hardcoded.
 *
 * User info placement: per explicit choice, kept in the topbar
 * (Overview export's pattern) rather than the sidebar (Favorites
 * export's alternate pattern) — one consistent spot across every
 * dashboard page instead of drifting per-screen.
 */
export default function DashboardTopbar({ searchPlaceholder = "Search...", user, rightSlot }) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 z-40">
      <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant w-96">
        <Icon name="search" className="text-on-surface-variant text-[20px]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="bg-transparent border-none focus:ring-0 text-body-md font-body-md w-full px-2 placeholder:text-on-surface-variant/60"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-on-surface-variant hover:text-primary transition-all" aria-label="Notifications">
          <Icon name="notifications" />
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-all" aria-label="Help">
          <Icon name="help_outline" />
        </button>

        {rightSlot ? (
          rightSlot
        ) : (
          <>
            <div className="h-8 w-px bg-outline-variant" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-label-md text-label-md text-on-surface">{user?.name}</p>
                <p className="text-[12px] text-on-surface-variant leading-none">{user?.tier}</p>
              </div>
              {user?.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-primary-fixed object-cover"
                />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
