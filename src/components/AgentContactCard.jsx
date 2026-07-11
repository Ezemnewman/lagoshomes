import { Link } from "react-router-dom";
import Icon from "./Icon";

/**
 * Small agent identity card shown on listing detail pages. Verified
 * badge is conditional (property.agent.verified) since not every
 * agent will be verified, even though most demo data will show true.
 */
export default function AgentContactCard({ agent }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 property-shadow border border-outline-variant/30 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
        <img src={agent.avatarUrl} alt={agent.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h4 className="font-headline-sm text-body-lg text-on-surface">{agent.name}</h4>
          {agent.verified && <Icon name="verified" className="text-primary text-[18px]" filled />}
        </div>
        <p className="text-on-surface-variant text-label-md mb-1">{agent.phone}</p>
        <Link to={`/agents/${agent.id}`} className="text-primary font-bold text-label-md hover:underline">
          View Profile
        </Link>
      </div>
    </div>
  );
}
