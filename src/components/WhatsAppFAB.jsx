import Icon from "./Icon";
import { SITE_CONFIG } from "../data/siteConfig";

/** Mobile-only floating WhatsApp button. Reads the number from siteConfig so it always matches the Footer link. */
export default function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
      className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg z-50"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="forum" className="text-3xl" />
    </a>
  );
}
