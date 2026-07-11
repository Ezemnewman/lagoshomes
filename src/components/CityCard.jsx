/** One tile in the "Explore Popular Cities" grid. */
export default function CityCard({ name, imageUrl, imageAlt, href }) {
  return (
    <a
      href={href}
      className="relative rounded-xl overflow-hidden group cursor-pointer block"
    >
      <img
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        src={imageUrl}
        alt={imageAlt}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
      <div className="absolute bottom-4 left-4 text-white font-bold text-lg">{name}</div>
    </a>
  );
}
