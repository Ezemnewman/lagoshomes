import { Link } from "react-router-dom";

/**
 * Simplified footer for signup/login — brand + copyright + the four
 * legal/support links, no Cities/Quick-Links/WhatsApp-CTA clutter the
 * main SiteFooter carries. Links point at real routes, not "#".
 */
export default function AuthFooter() {
  return (
    <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-highest flex flex-col md:flex-row justify-between items-center gap-gutter">
      <div className="flex flex-col items-center md:items-start">
        <span className="font-headline-sm text-headline-sm font-bold text-primary mb-2">KCEE</span>
        <p className="font-body-md text-label-md text-on-surface-variant text-center md:text-left">
          © {new Date().getFullYear()} KCEE Real Estate Marketplace. All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/privacy" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <Link to="/terms" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
          Terms of Service
        </Link>
        <Link to="/contact" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
          Contact Us
        </Link>
        <Link to="/careers" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
          Careers
        </Link>
      </div>
    </footer>
  );
}
