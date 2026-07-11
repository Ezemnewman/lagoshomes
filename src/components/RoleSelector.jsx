import Icon from "./Icon";

/**
 * Two-tab role picker (Buyer vs Agent/Landlord). The Stitch export
 * used a global switchRole() function manually toggling classList on
 * two hardcoded button IDs — here it's controlled state passed down,
 * so SignupPage decides what role means for routing after submit
 * instead of the toggle living disconnected from the rest of the form.
 */
const ROLES = [
  { id: "buyer", icon: "home", label: "I'm Looking for a Property" },
  { id: "agent", icon: "real_estate_agent", label: "I'm an Agent/Landlord" },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="flex p-1 bg-surface-container rounded-lg mb-stack-lg relative overflow-hidden">
      {ROLES.map((role) => {
        const isActive = value === role.id;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={`flex-1 py-3 px-2 rounded-md font-label-md text-label-md transition-all duration-300 z-10 flex flex-col items-center gap-1 ${
              isActive
                ? "bg-white text-primary shadow-[0px_2px_8px_rgba(0,0,0,0.08)]"
                : "text-on-surface-variant"
            }`}
          >
            <Icon name={role.icon} className="text-xl" />
            <span className="text-center leading-tight">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}
