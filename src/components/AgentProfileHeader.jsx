import Icon from "./Icon";
import { SITE_CONFIG } from "../data/siteConfig";

/**
 * The big header card at the top of an agent's profile: photo with a
 * verified checkmark badge, name, agency, years active, phone, and
 * the same Message/WhatsApp contact actions used on the listing detail
 * page's ListingInfoCard — kept as plain buttons here rather than
 * extracting a shared "ContactButtons" component, since this page only
 * has one such pair and a shared component for two call sites with
 * slightly different surrounding layout isn't worth the indirection yet.
 */
export default function AgentProfileHeader({ agent, onMessageAgent }) {
  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 property-shadow flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div className="relative">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-lg border-4 border-white">
          <img src={agent.photoUrl} alt={agent.name} className="w-full h-full object-cover" />
        </div>
        {agent.verified && (
          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-full border-4 border-white flex items-center justify-center">
            <Icon name="verified" className="text-sm" filled />
          </div>
        )}
      </div>

      <div className="flex-grow space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-headline-md text-headline-md text-on-surface">{agent.name}</h1>
          {agent.verified && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Icon name="check_circle" className="text-xs" filled />
              Verified Agent
            </span>
          )}
        </div>

        <p className="text-tertiary font-medium font-body-md">{agent.agencyName}</p>

        <div className="flex flex-wrap gap-4 text-on-surface-variant font-label-md">
          <span className="flex items-center gap-1">
            <Icon name="calendar_today" className="text-lg" />
            {agent.yearsActive} years active
          </span>
          <span className="flex items-center gap-1">
            <Icon name="call" className="text-lg" />
            {agent.phone}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={onMessageAgent}
            className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:bg-primary-container transition-all flex items-center gap-2"
          >
            <Icon name="mail" className="text-lg" />
            Message Agent
          </button>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            className="border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md hover:bg-primary/5 transition-all flex items-center gap-2"
          >
            <Icon name="chat" className="text-lg" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
