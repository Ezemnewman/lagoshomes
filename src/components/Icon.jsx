/**
 * Wraps the Material Symbols font icon so the rest of the app
 * just does <Icon name="bed" /> instead of repeating the raw
 * <span class="material-symbols-outlined"> markup everywhere.
 * If we ever swap icon sets, this is the only file that changes.
 */
export default function Icon({ name, className = "", filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: '"FILL" 1' } : undefined}
    >
      {name}
    </span>
  );
}
