import { useState, useRef } from "react";
import Icon from "../components/Icon";
import { AGENT_DASHBOARD_USER } from "../data/properties";

const NIGERIAN_STATES_SIMPLE = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];

/**
 * Renders inside AgentDashboardLayout's <Outlet> at
 * /agent-dashboard/settings. Agents can edit their public profile
 * info here — photo, bio, social links, agency details.
 * All changes are local state for now; TODO comments mark where
 * PATCH /api/agents/:id will go once the backend exists.
 */
export default function AgentProfileSettingsPage() {
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(AGENT_DASHBOARD_USER.avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);
  const [fullName, setFullName] = useState("Tunde Bakare");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [whatsapp, setWhatsapp] = useState("+234 801 234 5678");
  const [yearsExp, setYearsExp] = useState("5");
  const [agencyName, setAgencyName] = useState("Prime Lagos Realty");
  const [agencyAddress, setAgencyAddress] = useState("14 Admiralty Way, Lekki Phase 1, Lagos");
  const [rcNumber, setRcNumber] = useState("RC1234567");
  const [bio, setBio] = useState(
    "I am a dedicated real estate professional with over 5 years of experience helping clients find their perfect homes across Lagos. Specialising in luxury properties in Lekki, Ikoyi, and Victoria Island."
  );
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Agent profile saved:", {
      fullName, phone, whatsapp, yearsExp,
      agencyName, agencyAddress, rcNumber,
      bio, instagram, linkedin, twitter,
      avatarFile: avatarFile?.name,
    });
    // TODO: PATCH /api/agents/:id as multipart/form-data
    // (multipart because it may include a new avatar file)
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <header className="h-20 bg-surface border-b border-outline-variant/30 shadow-sm flex items-center px-8 sticky top-0 z-40">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Profile Settings</h2>
      </header>

      <div className="p-8 max-w-3xl mx-auto space-y-8">
        {saved && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
            <Icon name="check_circle" className="text-primary" filled />
            <p className="font-label-md text-primary font-bold">Profile updated successfully.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo */}
          <section className="bg-white rounded-xl property-shadow p-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 border-b border-outline-variant pb-3">
              Profile Photo
            </h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container border-4 border-white shadow-md flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                    <Icon name="person" className="text-[40px]" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="block px-5 py-2.5 bg-primary text-white rounded-full font-label-md text-sm hover:opacity-90 transition-all"
                >
                  Upload New Photo
                </button>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="block text-error text-sm font-label-md hover:underline"
                  >
                    Remove Photo
                  </button>
                )}
                <p className="text-xs text-on-surface-variant">JPG or PNG, max 5MB</p>
              </div>
            </div>
          </section>

          {/* Personal Info */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
              Personal Information
            </h3>
            {[
              { label: "Full Name", value: fullName, onChange: setFullName, icon: "person" },
              { label: "Phone Number", value: phone, onChange: setPhone, icon: "call" },
              { label: "WhatsApp Number", value: whatsapp, onChange: setWhatsapp, icon: "chat" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block font-label-md text-label-md text-on-surface mb-2">{field.label}</label>
                <div className="relative">
                  <Icon name={field.icon} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">Email Address</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <Icon name="lock" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="email"
                  value="tunde@primelagosrealty.com"
                  disabled
                  className="w-full pl-10 pr-10 py-3 border border-outline-variant rounded-lg font-body-md bg-surface-container text-on-surface-variant cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">Years of Experience</label>
              <input
                type="number"
                min={0}
                max={50}
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                className="w-32 px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </section>

          {/* Agency Info */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
              Agency Information
            </h3>
            {[
              { label: "Agency Name", value: agencyName, onChange: setAgencyName },
              { label: "Agency Address", value: agencyAddress, onChange: setAgencyAddress },
              { label: "RC Number / Business Registration", value: rcNumber, onChange: setRcNumber },
            ].map((field) => (
              <div key={field.label}>
                <label className="block font-label-md text-label-md text-on-surface mb-2">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            ))}
          </section>

          {/* Bio */}
          <section className="bg-white rounded-xl property-shadow p-6">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3 mb-5">
              Bio / About Me
            </h3>
            <textarea
              rows={5}
              maxLength={500}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell potential clients about yourself..."
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
            />
            <p className="text-xs text-on-surface-variant mt-1 text-right">{bio.length}/500</p>
          </section>

          {/* Social Links */}
          <section className="bg-white rounded-xl property-shadow p-6 space-y-5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-3">
              Social Links
            </h3>
            {[
              { label: "Instagram", icon: "photo_camera", value: instagram, onChange: setInstagram, placeholder: "https://instagram.com/yourhandle" },
              { label: "LinkedIn", icon: "work", value: linkedin, onChange: setLinkedin, placeholder: "https://linkedin.com/in/yourname" },
              { label: "Twitter / X", icon: "alternate_email", value: twitter, onChange: setTwitter, placeholder: "https://twitter.com/yourhandle" },
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

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <><Icon name="progress_activity" className="animate-spin" /> Saving...</>
            ) : (
              <><Icon name="save" /> Save Changes</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
