import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { SITE_CONFIG } from "../data/siteConfig";

/**
 * One footer component for the whole site, replacing what was about
 * to become THREE near-duplicate footers (home page, search results,
 * listing detail) — each only differing in their link columns and
 * their 4th column's special content. That drift is exactly the kind
 * of duplication this project is meant to avoid, so it's consolidated
 * here instead of letting it multiply with every new Stitch screen.
 *
 * `linkColumns` — array of { heading, links: [{label, href}] } — covers
 * "Quick Links"/"Cities" or "Company"/"Legal" or "Navigation"/"Support",
 * however many columns a given page's Stitch export used.
 *
 * `fourthColumn` picks what the last column shows:
 *   - { type: "whatsapp-cta" }                     (home page style)
 *   - { type: "newsletter" }                        (search results style)
 *   - { type: "contact", address, email }           (listing detail style)
 * This is the one piece of real layout variation across the three
 * Stitch exports, so it's the one thing left switchable — everything
 * else (brand blurb, social icons, link columns, copyright line) is
 * shared structure driven by data.
 */
export default function SiteFooter({ linkColumns = [], fourthColumn = { type: "whatsapp-cta" } }) {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="space-y-4">
          <div className="text-headline-sm font-headline-sm font-bold text-primary">
            {SITE_CONFIG.siteName}
          </div>
          <p className="text-on-surface-variant font-body-md">
            Nigeria's most trusted real estate marketplace. Finding your home, simplified.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="Website" className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="public" />
            </a>
            <a href="#" aria-label="Share" className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="share" />
            </a>
          </div>
        </div>

        {linkColumns.map((column) => (
          <div key={column.heading}>
            <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">{column.heading}</h4>
            <ul className="space-y-2 text-on-surface-variant font-body-md">
              {column.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    {isExternal ? (
                      <a href={link.href} className="hover:underline transition-all">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="hover:underline transition-all">
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <FourthColumn {...fourthColumn} />
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-md border-t border-outline-variant/30 text-center text-on-surface-variant text-[12px]">
        © {new Date().getFullYear()} {SITE_CONFIG.siteName} Real Estate Marketplace. All rights reserved.
      </div>
    </footer>
  );
}

function FourthColumn({ type, address, email }) {
  if (type === "none") {
    return null;
  }

  if (type === "newsletter") {
    return <NewsletterColumn />;
  }

  if (type === "contact") {
    return (
      <div className="space-y-4">
        <h4 className="font-headline-sm text-headline-sm text-primary">Contact</h4>
        <p className="text-on-surface-variant font-body-md">{address}</p>
        <p className="text-on-surface-variant font-body-md">{email}</p>
        <div className="flex gap-4">
          <Icon name="share" className="text-on-surface-variant" />
          <Icon name="forum" className="text-on-surface-variant" />
        </div>
      </div>
    );
  }

  // default: "whatsapp-cta"
  return (
    <div className="flex flex-col items-start gap-4">
      <h4 className="font-headline-sm text-headline-sm text-primary">Need Help?</h4>
      <a
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
        className="flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-full hover:opacity-90 transition-all font-label-md"
      >
        <Icon name="forum" />
        Chat on WhatsApp
      </a>
    </div>
  );
}

function NewsletterColumn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: connect to POST /api/newsletter once backend exists
  };

  return (
    <div className="space-y-stack-md">
      <h4 className="font-headline-sm text-headline-sm text-primary">Subscribe</h4>
      <p className="text-on-surface-variant text-xs">
        Get the latest property alerts directly in your inbox.
      </p>
      {submitted ? (
        <p className="text-primary text-sm font-medium">Thanks — you're subscribed!</p>
      ) : (
        <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-lg border border-outline-variant">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="bg-white px-4 py-2 text-label-md w-full focus:outline-none"
          />
          <button type="submit" className="bg-primary text-white px-4 py-2 hover:bg-primary-container transition-colors">
            Join
          </button>
        </form>
      )}
    </div>
  );
}
