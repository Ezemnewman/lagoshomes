/**
 * Role selector used on the signup page.
 * `role` must be "BUYER" or "AGENT" — matching the backend enum exactly.
 * `onChange` receives the new role string when a button is clicked.
 */
export default function RoleSelector({ role, onChange }) {
  const options = [
    {
      value: "BUYER",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      ),
      label: "I'm Looking for a Property",
      sub: "Buyer / Renter",
    },
    {
      value: "AGENT",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
          <path d="M9 21V12h6v9"/>
          <circle cx="19" cy="5" r="3" fill="currentColor" stroke="none"/>
        </svg>
      ),
      label: "I'm an Agent/Landlord",
      sub: "List & sell properties",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {options.map((opt) => {
        const selected = role === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all text-center cursor-pointer ${
              selected
                ? "border-primary bg-primary/5 text-primary shadow-sm"
                : "border-outline-variant text-on-surface-variant hover:border-primary/50 hover:bg-surface-container"
            }`}
          >
            <span className={selected ? "text-primary" : "text-on-surface-variant"}>
              {opt.icon}
            </span>
            <span className="font-label-md text-label-md font-bold leading-tight">{opt.label}</span>
            <span className="text-xs opacity-70">{opt.sub}</span>
          </button>
        );
      })}
    </div>
  );
}
