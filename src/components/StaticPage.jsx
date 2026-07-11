import Navbar from "./Navbar";
import SiteFooter from "./SiteFooter";
import { DEMO_USER } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Help Center", href: "/help" },
    ],
  },
];

/**
 * One shared shell for simple content pages — About, Privacy, Terms,
 * Contact, FAQ, Help Center, Careers — instead of six nearly-identical
 * page files that only differ in heading and body text. Each real page
 * (e.g. AboutPage.jsx) is just this component with a title and content.
 *
 * `children` carries the actual page content so each page can still
 * have its own structure (e.g. FAQ wants a list, Contact wants a form)
 * while sharing the same navbar/footer/heading treatment.
 */
export default function StaticPage({ title, subtitle, children }) {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <Navbar user={DEMO_USER} />

      <main className="flex-1 max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg w-full">
        <h1 className="font-headline-md text-headline-md mb-2">{title}</h1>
        {subtitle && <p className="text-on-surface-variant font-body-md mb-stack-lg">{subtitle}</p>}

        <div className="text-on-surface-variant font-body-md space-y-4 leading-relaxed">
          {children}
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "whatsapp-cta" }} />
    </div>
  );
}
