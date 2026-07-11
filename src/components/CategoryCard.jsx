import Icon from "./Icon";

/** One of these per category tile. Same pattern as PropertyCard — data in, markup out. */
export default function CategoryCard({ icon, label, href }) {
  return (
    <a
      href={href}
      className="group cursor-pointer bg-surface-container p-stack-md rounded-xl text-center hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-sm block"
    >
      <Icon
        name={icon}
        className="text-4xl mb-2 text-primary group-hover:text-on-primary transition-colors"
      />
      <p className="font-label-md">{label}</p>
    </a>
  );
}
