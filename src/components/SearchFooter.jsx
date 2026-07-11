import { useState } from "react";
import Icon from "./Icon";

/**
 * A second, deliberately distinct footer for search/listing-style pages.
 * The Stitch export for this page has a real structural difference from
 * the home page Footer (legal links + email signup vs. cities + WhatsApp
 * CTA) — not just a styling tweak, so it's its own component rather than
 * forcing one Footer to branch into two unrelated layouts.
 *
 * Both footers share the same Icon component and SITE_CONFIG, so brand
 * name changes still only happen in one place.
 */
export default function SearchFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: connect to POST /api/newsletter once backend exists
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div>
          <div className="font-headline-sm text-headline-sm font-black text-primary mb-stack-md">
            KCEE
          </div>
          <p className="text-on-surface-variant mb-stack-md">
            Your most trusted partner in finding premium real estate across Nigeria.
          </p>
          <div className="flex gap-4">
            <button
              aria-label="Website"
              className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:opacity-80 transition-all"
            >
              <Icon name="public" className="text-[18px]" />
            </button>
            <button
              aria-label="Share"
              className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:opacity-80 transition-all"
            >
              <Icon name="share" className="text-[18px]" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-primary mb-stack-sm">Company</h4>
          <a href="#" className="block text-on-surface-variant hover:text-secondary transition-all">
            About Us
          </a>
          <a href="#" className="block text-on-surface-variant hover:text-secondary transition-all">
            Contact Support
          </a>
          <a href="#" className="block text-on-surface-variant hover:text-secondary transition-all">
            WhatsApp Us
          </a>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-primary mb-stack-sm">Legal</h4>
          <a href="#" className="block text-on-surface-variant hover:text-secondary transition-all">
            Terms of Service
          </a>
          <a href="#" className="block text-on-surface-variant hover:text-secondary transition-all">
            Privacy Policy
          </a>
        </div>

        <div className="space-y-stack-md">
          <h4 className="font-bold text-primary mb-stack-sm">Subscribe</h4>
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
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 hover:bg-primary-container transition-colors"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-desktop py-stack-md border-t border-outline-variant/30 text-center text-on-surface-variant text-[12px]">
        © {new Date().getFullYear()} KCEE Real Estate Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
