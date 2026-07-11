import Icon from "./Icon";
import useScrollSpy from "../hooks/useScrollSpy";

/**
 * Sticky sidebar TOC with scroll-spy highlighting. Takes `sections` as
 * data ({ id, label, icon }) rather than hardcoded links, so Privacy
 * Policy or Cookie Policy can reuse this with their own section list.
 */
export default function TableOfContents({ sections }) {
  const activeId = useScrollSpy(sections.map((s) => s.id));

  return (
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="sticky top-28 space-y-1 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
        <p className="px-4 py-2 text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
          Table of Contents
        </p>
        <nav className="flex flex-col">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                style={isActive ? { borderLeft: "3px solid #005138" } : undefined}
                className={`px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3 ${
                  isActive
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                <Icon name={section.icon} className="text-[18px]" />
                {section.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
