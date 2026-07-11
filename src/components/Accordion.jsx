import { useState } from "react";
import Icon from "./Icon";

/**
 * Single-open-at-a-time accordion (opening one closes any other open
 * item, matching the Stitch export's "close all, then open clicked"
 * script logic). Built generically — takes an `items` array of
 * {question, answer} — so it's reusable for any future FAQ-style
 * content, not hardcoded to the Help Center's specific 3 questions.
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-stack-md">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] overflow-hidden border border-outline-variant/30"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-stack-lg text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-headline-sm text-headline-sm">{item.question}</span>
              <Icon
                name="expand_more"
                className={`text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-300 ease-out"
              style={{ maxHeight: isOpen ? "300px" : "0px" }}
            >
              <div className="p-stack-lg pt-0 text-on-surface-variant font-body-md">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
