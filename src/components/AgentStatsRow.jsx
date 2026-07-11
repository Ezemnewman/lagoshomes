import Icon from "./Icon";

/**
 * Three stat cards. Takes a `stats` array rather than hardcoding three
 * fixed fields, since a future version of this page (or a different
 * agent tier) might show more or fewer stats — e.g. "Avg. Response
 * Time" or "Client Rating" — without needing a new component.
 */
export default function AgentStatsRow({ stats }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-stack-lg">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-xl property-shadow border border-outline-variant/30 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
            <Icon name={stat.icon} />
          </div>
          <div>
            <p className="text-on-surface-variant text-label-md">{stat.label}</p>
            <p className="text-headline-sm font-bold text-on-surface">{stat.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
