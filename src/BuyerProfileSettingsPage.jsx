import { useState, useRef } from "react";
import Icon from "../components/Icon";
import { NIGERIAN_STATES } from "../data/nigerianLocations";

const PROPERTY_TYPES = ["Duplex", "Flat", "Bungalow", "Land", "Shortlet", "Office Space"];
const LISTING_TYPES = ["For Sale", "For Rent", "Shortlet"];

/**
 * Renders inside DashboardLayout's <Outlet> at /dashboard/settings.
 * Buyers can update personal info, location/property preferences,
 * and notification settings. The "Delete Account" danger zone is
 * a confirmation-gated action — clicking it shows an inline
 * confirm step rather than immediately deleting, since there's no
 * undo once the backend supports this for real.
 */
export default function BuyerProfileSettingsPage() {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fullName, setFullName] = useState("Demo Buyer");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [preferredState, setPreferredState] = useState("");
  const [preferredArea, setPreferredArea] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [listingTypes, setListingTypes] = useState([]);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleItem = (list, setList, item) =>
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Buyer profile saved:", {
      fullName, phone, whatsapp, preferredState, preferredArea,
      minBudget, maxBudget, propertyTypes, listingTypes,
      emailNotifs, smsNotifs,
    });
    // TODO: PATCH /api/users/:id once backend exists
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  const handleDeleteAccount = () => {
    console.log("Account deletion confirmed");
    // TODO: DELETE /api/users/:id once backend exists,
    // then clear auth session and redirect to home
  };

  return (
    <div className="ml-64 min-h-screen">
      <header className="h-16 bg-surface border-b border-outline-variant/30 shadow-sm flex items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Profile Settings</h2>
      </header>

      <div className="p-8 max-w-3xl mx-auto space-y-6 pt-10">
        {saved && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
            <Icon name="check_circle" className="text-primary" filled />
            <p className="font-label-md text-primary font-bold">Profile updated successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <section className="bg-white rounded-xl property-shadow p-6">
            <h3 className="font-headline-sm text-on-surface border-b border-outline-variant pb-3 mb-5">
              Profile Photo
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container border-4 border-white shadow-md flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                    <Icon name="person" className="text-[36px]" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                <button type="button" onClick={() => fileInputRef.current?.click()} className="px-5 py-2 bg-primary text-white rounded-full font-label-md text-sm hover:opacity-90 transition-all">
                  Upload Photo
                </button>
                {avatarPreview && (
                  <button type="button" onClick={() => setAvatarPreview(null)} className="block text-error text-sm hover:underline">Remove</button>
                )}
              </div>
            </div>
          </section>

          {/* Personal Info */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-on-surface border-b border-outline-variant pb-3">Personal Information</h3>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Full Name</label>
              <div className="relative">
                <Icon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Email Address</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <Icon name="lock" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="email" value="buyer@example.com" disabled className="w-full pl-10 pr-10 py-3 border border-outline-variant rounded-lg bg-surface-container text-on-surface-variant cursor-not-allowed" />
              </div>
              <p className="text-xs text-on-surface-variant mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Phone Number</label>
              <div className="relative">
                <Icon name="call" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 800 000 0000" className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">WhatsApp Number</label>
              <div className="relative">
                <Icon name="chat" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+234 800 000 0000" className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
          </section>

          {/* Location Preferences */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-on-surface border-b border-outline-variant pb-3">Location Preferences</h3>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Preferred State</label>
              <select value={preferredState} onChange={(e) => setPreferredState(e.target.value)} className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select a state</option>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s.name} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Preferred Area / City</label>
              <input type="text" value={preferredArea} onChange={(e) => setPreferredArea(e.target.value)} placeholder="e.g. Lekki, Ikoyi, Maitama" className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Budget Range (₦)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                  <input type="text" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} placeholder="Min" className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                  <input type="text" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} placeholder="Max" className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>
            </div>
          </section>

          {/* Property Preferences */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-on-surface border-b border-outline-variant pb-3">Property Preferences</h3>
            <div>
              <label className="block font-label-md text-on-surface mb-3">Property Types</label>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_TYPES.map((type) => {
                  const selected = propertyTypes.includes(type);
                  return (
                    <button key={type} type="button" onClick={() => toggleItem(propertyTypes, setPropertyTypes, type)}
                      className={`px-4 py-2 rounded-full font-label-md text-sm border transition-all ${selected ? "bg-primary text-white border-primary" : "border-outline-variant text-on-surface-variant hover:border-primary/50"}`}>
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-3">Listing Type</label>
              <div className="flex gap-2">
                {LISTING_TYPES.map((type) => {
                  const selected = listingTypes.includes(type);
                  return (
                    <button key={type} type="button" onClick={() => toggleItem(listingTypes, setListingTypes, type)}
                      className={`px-4 py-2 rounded-full font-label-md text-sm border transition-all ${selected ? "bg-primary text-white border-primary" : "border-outline-variant text-on-surface-variant hover:border-primary/50"}`}>
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-4">
            <h3 className="font-headline-sm text-on-surface border-b border-outline-variant pb-3">Notification Preferences</h3>
            {[
              { label: "Email Notifications", sub: "Receive alerts and updates via email", value: emailNotifs, set: setEmailNotifs },
              { label: "SMS Notifications", sub: "Receive alerts via text message", value: smsNotifs, set: setSmsNotifs },
            ].map((notif) => (
              <div key={notif.label} className="flex items-center justify-between">
                <div>
                  <p className="font-label-md text-on-surface">{notif.label}</p>
                  <p className="text-xs text-on-surface-variant">{notif.sub}</p>
                </div>
                <button type="button" role="switch" aria-checked={notif.value} onClick={() => notif.set((p) => !p)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${notif.value ? "bg-primary" : "bg-surface-container-highest"}`}>
                  <span className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-all ${notif.value ? "translate-x-6" : ""}`} />
                </button>
              </div>
            ))}
          </section>

          <button type="submit" disabled={saving}
            className="w-full py-4 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {saving ? <><Icon name="progress_activity" className="animate-spin" /> Saving...</> : <><Icon name="save" /> Save Changes</>}
          </button>
        </form>

        {/* Danger Zone */}
        <section className="bg-white rounded-xl border-2 border-error/30 p-6 space-y-4">
          <h3 className="font-headline-sm text-error">Danger Zone</h3>
          <p className="text-on-surface-variant font-body-md text-sm">
            Deleting your account is permanent and cannot be undone. All your saved properties, alerts, and messages will be lost.
          </p>
          {!showDeleteConfirm ? (
            <button type="button" onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2.5 border-2 border-error text-error rounded-full font-label-md hover:bg-error/5 transition-all">
              Delete Account
            </button>
          ) : (
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 space-y-3">
              <p className="font-bold text-error text-sm">Are you absolutely sure? This cannot be undone.</p>
              <div className="flex gap-3">
                <button type="button" onClick={handleDeleteAccount}
                  className="px-5 py-2 bg-error text-white rounded-full font-label-md text-sm hover:opacity-90 transition-all">
                  Yes, Delete My Account
                </button>
                <button type="button" onClick={() => setShowDeleteConfirm(false)}
                  className="px-5 py-2 border border-outline-variant text-on-surface-variant rounded-full font-label-md text-sm hover:bg-surface-container transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
