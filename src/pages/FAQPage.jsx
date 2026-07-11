import { useState } from "react";
import StaticPage from "../components/StaticPage";
import Icon from "../components/Icon";

const FAQS = [
  {
    question: "How do I know an agent on KCEE is legitimate?",
    answer:
      "Every agent goes through a verification process before they can list a property. Verified agents show a green checkmark badge on their profile and listings.",
  },
  {
    question: "Is it free to browse listings?",
    answer: "Yes — browsing, searching, and saving favorites is completely free for buyers and renters.",
  },
  {
    question: "How does KCEE make money?",
    answer:
      "KCEE takes a small commission when a deal is successfully completed through the platform, rather than charging upfront listing fees.",
  },
  {
    question: "Can I list a property myself, without an agent?",
    answer:
      "Currently, only verified agents and agencies can list properties on KCEE. This helps maintain trust and quality across listings.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <StaticPage title="Frequently Asked Questions">
      <div className="space-y-2 not-italic">
        {FAQS.map((faq, i) => (
          <div key={faq.question} className="border border-outline-variant rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center text-left px-4 py-3 font-medium text-on-surface hover:bg-surface-container transition-colors"
            >
              {faq.question}
              <Icon name={openIndex === i ? "expand_less" : "expand_more"} />
            </button>
            {openIndex === i && (
              <p className="px-4 pb-4 text-on-surface-variant">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm italic mt-stack-md">
        This is a starter set of FAQs — more will be added over time.
      </p>
    </StaticPage>
  );
}
