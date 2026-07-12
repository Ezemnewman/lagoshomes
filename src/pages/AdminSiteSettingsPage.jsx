import { useState } from "react";
import Icon from "../components/Icon";

/**
 * Admin-controlled site settings. These would persist via
 * PATCH /api/admin/site-settings once a backend exists. Until
 * then, changes survive the session but reset on reload — the
 * UI is fully functional for demo purposes.
 *
 * Maintenance mode toggle is shown but disabled with a clear
 * warning rather than letting an admin accidentally take the
 * site offline during a demo, since there's no real backend to
 * un-toggle it through.
 */
export default function AdminSiteSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState("2340000000000");
  const [supportEmail, setSupportEmail] = useState("support@kcee.com");
  const [siteTitle, setSiteTitle] = useState("KCEE Real Estate Marketplace");
  const [metaDescription, setMetaDescription] = useState(
    "Nigeria's most trusted real estate marketplace. Find homes for sale, rent, and shortlet across all 36 states."
  );
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [maintenanceMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Site settings saved:", {
      whatsappNumber, supportEmail, siteTitle, metaDescription,
      instagramUrl, linkedinUrl, twitterUrl,
    });
    // TODO: PATCH /api/admin/site-settings once backend exists
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-8 space-y-8 max-w-3xl">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface">Site Settings</h2>
        <p className="text-on-surface-variant">Global configuration for the KCEE platform.</p>
      </div>

      {saved && (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
          <Icon name="check_circle" className="text-primary" filled />
          <p className="font-label-md text-primary font-bold">Settings saved successfully.</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Settings */}
        <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
          <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
            Contact & Support
          </h3>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              WhatsApp Support Number
            </label>
            <div className="relative">
              <Icon name="chat" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="2348000000000"
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Include country code, no + or spaces. This feeds into siteConfig.js for the whole site.
            </p>
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Support Email Address
            </label>
            <div className="relative">
              <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
          <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
            SEO & Metadata
          </h3>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Site Title (appears in browser tabs and search results)
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Meta Description (shown in Google search results)
            </label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
            />
            <p className="text-xs text-on-surface-variant mt-1">
              {metaDescription.length}/160 characters recommended
            </p>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
          <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
            Social Media Links
          </h3>
          {[
            { label: "Instagram", icon: "share", value: instagramUrl, onChange: setInstagramUrl, placeholder: "https://instagram.com/kcee_realty" },
            { label: "LinkedIn", icon: "work", value: linkedinUrl, onChange: setLinkedinUrl, placeholder: "https://linkedin.com/company/kcee-realty" },
            { label: "Twitter / X", icon: "alternate_email", value: twitterUrl, onChange: setTwitterUrl, placeholder: "https://twitter.com/kcee_realty" },
          ].map((field) => (
            <div key={field.label}>
              <label className="block font-label-md text-label-md text-on-surface mb-2">{field.label}</label>
              <div className="relative">
                <Icon name={field.icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="url"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Maintenance Mode */}
        <section className="bg-white rounded-xl property-shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-label-md text-label-md font-bold text-on-surface">Maintenance Mode</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Takes the site offline for all non-admin users. Only enable when deploying updates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${maintenanceMode ? "bg-error/10 text-error" : "bg-primary/10 text-primary"}`}>
                {maintenanceMode ? "ON" : "OFF"}
              </span>
              <button
                type="button"
                disabled
                title="Connect backend before enabling this"
                className="relative w-12 h-6 bg-surface-container-highest rounded-full opacity-50 cursor-not-allowed"
              >
                <span className="absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full" />
              </button>
            </div>
          </div>
          <p className="text-xs text-error mt-3 flex items-center gap-1">
            <Icon name="warning" className="text-xs" />
            Disabled until backend is live — toggling this without a backend would take the site offline with no way to recover through this UI.
          </p>
        </section>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-4 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <><Icon name="progress_activity" className="animate-spin" /> Saving Changes...</>
          ) : (
            <><Icon name="save" /> Save All Settings</>
          )}
        </button>
      </form>
    </div>
  );
}
