import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import Accordion from "../components/Accordion";
import Icon from "../components/Icon";
import { HELP_CATEGORIES, HELP_FAQS } from "../data/helpCenterContent";
import { SITE_CONFIG } from "../data/siteConfig";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

/**
 * Real Help Center page, replacing the StaticPage placeholder. The
 * category cards don't link anywhere real yet (the Stitch export
 * didn't specify destinations either, just <button> elements) — left
 * as visual-only for now rather than inventing fake destinations.
 */
export default function HelpCenterPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <Navbar />

      <section className="relative bg-primary-container text-on-primary-container py-24 px-margin-mobile md:px-margin-desktop text-center overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-md">
            How can we help you?
          </h1>
          <div className="relative group">
            <Icon
              name="search"
              className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-2xl"
            />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full h-16 pl-16 pr-6 rounded-full border-none focus:ring-4 focus:ring-secondary-container/50 text-on-surface text-lg font-body-md shadow-xl"
            />
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-20">
        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-lg text-primary">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {HELP_CATEGORIES.map((category) => (
              <button
                key={category.label}
                className="flex flex-col items-center p-stack-lg bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all group border border-outline-variant/30"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-stack-md group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon name={category.icon} className="text-3xl" />
                </div>
                <span className="font-label-md text-label-md text-center">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto">
          <h2 className="font-headline-md text-headline-md mb-stack-lg text-primary text-center">
            Frequently Asked Questions
          </h2>
          <Accordion items={HELP_FAQS} />
        </section>

        <section className="bg-surface-container-high rounded-3xl p-stack-lg md:p-16 text-center">
          <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">
            Need more help?
          </h2>
          <p className="text-on-surface-variant mb-stack-lg max-w-lg mx-auto">
            Our dedicated support team is available 24/7 to assist you with any inquiries or
            issues you might be facing.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-stack-md">
            <a
              href="mailto:support@kcee.com"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              <Icon name="mail" />
              Email Support
            </a>
            <a
              href="tel:+2340000000000"
              className="bg-white border-2 border-primary text-primary px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all shadow-sm"
            >
              <Icon name="call" />
              Call Us
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              <Icon name="chat" />
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
    </div>
  );
}
