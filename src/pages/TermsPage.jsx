import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import TableOfContents from "../components/TableOfContents";
import TermsContent from "../components/TermsContent";
import DownloadTermsPdfButton from "../components/DownloadTermsPdfButton";
import { TERMS_SECTIONS, TERMS_LAST_UPDATED } from "../data/termsContent";
import { DEMO_USER } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Social",
    links: [
      // TODO: replace with real social media URLs once accounts exist
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
];

/**
 * A real, full page rather than the StaticPage shell used for About/
 * Privacy/Contact/etc. — this design needs a wide layout, a sticky
 * scroll-spy table of contents, a fee table, and richer per-section
 * content that StaticPage's narrow single-column shell can't hold.
 * Privacy Policy will likely want this same shape later.
 */
export default function TermsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-md">
      <Navbar user={DEMO_USER} />

      <main className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="mb-12">
          <span className="text-secondary font-semibold tracking-wider text-sm uppercase">
            Legal & Compliance
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mt-2">
            Terms of Service
          </h1>
          <p className="text-on-surface-variant mt-4 max-w-2xl text-body-lg font-body-lg">
            Please read these terms carefully before using the KCEE platform. These terms
            govern your access to and use of our real estate services in Nigeria.
          </p>
          <div className="mt-6 flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Last updated: {TERMS_LAST_UPDATED}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 relative">
          <TableOfContents sections={TERMS_SECTIONS} />
          <TermsContent sections={TERMS_SECTIONS} />
        </div>

        <div className="mt-12 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-on-surface-variant">Still have questions about our terms?</p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="px-6 py-2 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/5 transition-colors"
            >
              Contact Support
            </a>
            <DownloadTermsPdfButton
              title="KCEE Terms of Service"
              lastUpdated={TERMS_LAST_UPDATED}
              sections={TERMS_SECTIONS}
            />
          </div>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
    </div>
  );
}
