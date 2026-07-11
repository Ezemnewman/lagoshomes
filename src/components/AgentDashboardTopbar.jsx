import Icon from "./Icon";

/**
 * Distinct from the buyer dashboard's DashboardTopbar — no search bar
 * here (the export replaced it with a page title), plus a "Verified
 * Professional" badge and an online-status dot on the avatar that the
 * buyer topbar has no equivalent for.
 */
export default function AgentDashboardTopbar({ pageTitle, agent }) {
  return (
    <header className="h-20 bg-surface flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full sticky top-0 z-40 shadow-sm border-b border-outline-variant/30">
      <div className="flex items-center gap-2">
        <Icon name="menu" className="md:hidden text-primary" />
        <h2 className="font-headline-sm text-headline-sm text-on-surface hidden md:block">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-stack-lg">
        {agent.verified && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary-fixed/20 rounded-full">
            <Icon name="workspace_premium" className="text-[#E0A526] text-sm" filled />
            <span className="font-label-md text-label-md text-on-secondary-fixed-variant">
              Verified Professional
            </span>
          </div>
        )}

        <div className="flex items-center gap-stack-md">
          <div className="text-right hidden sm:block">
            <p className="font-label-md text-label-md font-bold text-on-surface">{agent.name}</p>
            <p className="text-[12px] text-on-surface-variant">{agent.role}</p>
          </div>
          <div className="relative">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover"
            />
            {agent.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
