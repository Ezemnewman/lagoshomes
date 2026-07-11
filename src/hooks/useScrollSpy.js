import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently scrolled into view, so a sticky
 * table-of-contents can highlight the active section. Built as a hook
 * (not baked into one page) because Privacy Policy and Cookie Policy
 * will need this exact same behavior once they exist — same long-form,
 * sectioned-legal-document shape as Terms of Service.
 *
 * Mirrors the Stitch export's IntersectionObserver logic, just moved
 * from a <script> tag into idiomatic React lifecycle handling.
 */
export default function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
