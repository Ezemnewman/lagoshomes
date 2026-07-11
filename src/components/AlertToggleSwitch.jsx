/**
 * Small reusable toggle switch (checkbox styled as a sliding pill).
 * The Stitch export used a raw checkbox + CSS sibling-selector trick
 * (`.switch-toggle:checked + .switch-slider`) which only works with
 * literal sibling DOM elements — converted here to controlled React
 * state instead, since each alert needs independent on/off state.
 */
export default function AlertToggleSwitch({ checked, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-label-md font-label-md text-on-surface-variant">{label}</span>}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-surface-container-highest rounded-full peer-checked:bg-primary transition-colors relative">
          <div
            className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${
              checked ? "translate-x-5" : ""
            }`}
          />
        </div>
      </label>
    </div>
  );
}
