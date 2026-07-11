import Icon from "./Icon";
import { SITE_CONFIG } from "../data/siteConfig";

const QUICK_LINKS = ["About Us", "Terms of Service", "Privacy Policy", "Contact Support"];
const CITY_LINKS = [
  "Lagos Real Estate",
  "Abuja Real Estate",
  "Port Harcourt Real Estate",
  "Enugu Real Estate",
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-stack-lg max-w-container-max mx-auto">
        <div className="space-y-4">
          <div className="text-headline-sm font-headline-sm font-bold text-primary">
            LagosHomes
          </div>
          <p className="text-on-surface-variant font-body-md">
            Nigeria's most trusted real estate marketplace. Finding your home, simplified.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="share" />
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="thumb_up" />
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Icon name="chat" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-on-surface-variant font-body-md">
            {QUICK_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="hover:underline transition-all">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-headline-sm text-headline-sm mb-4 text-primary">Cities</h4>
          <ul className="space-y-2 text-on-surface-variant font-body-md">
            {CITY_LINKS.map((label) => (
              <li key={label}>
                <a href="#" className="hover:underline transition-all">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h4 className="font-headline-sm text-headline-sm text-primary">Need Help?</h4>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            className="flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-full hover:opacity-90 transition-all font-label-md"
          >
            <Icon name="forum" />
            Chat on WhatsApp
          </a>
          <p className="text-on-surface-variant text-sm mt-4">
            © {new Date().getFullYear()} LagosHomes Real Estate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
