import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardTopbar from "../components/DashboardTopbar";
import Icon from "../components/Icon";
import { NIGERIAN_STATES } from "../data/nigerianLocations";
import { DASHBOARD_USER } from "../data/properties";

const PROPERTY_TYPES = ["Duplex", "Flat", "Bungalow", "Land", "Shortlet", "Office Space"];
const LISTING_TYPES = ["For Sale", "For Rent", "Shortlet"];
const BEDROOM_OPTIONS = ["Any", "1+", "2+", "3+", "4+", "5+"];

/**
 * Renders inside DashboardLayout's <Outlet> at /dashboard/alerts/new.
 * Full alert creation form — the Alerts page's "Create New Alert"
 * button navigates here instead of logging to console.
 * Submitting saves to local state for now and navigates back to alerts.
 * TODO: POST /api/alerts once backend exists.
 */
export default function CreateAlertPage() {
  const navigate = useNavigate();
  const [alertName, setAlertName] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [listingType, setListingType] = useState("For Sale");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [saving, setSaving] = useState(false);

  const togglePropertyType = (type) =>
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const selectedState = NIGERIAN_STATES.find((s) => s.name === state);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("Alert created:", {
      alertName, state, area, propertyTypes,
      listingType, minBudget, maxBudget, bedrooms,
      emailNotifs, smsNotifs,
    });
    // TODO: POST /api/alerts once backend exists
    setTimeout(() => {
      setSaving(false);
      navigate("/dashboard/alerts");
    }, 1000);
  };

  return (
    <div className="ml-64 min-h-screen">
      <DashboardTopbar searchPlaceholder="Search..." user={DASHBOARD_USER} />

      <div className="pt-24 pb-12 px-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="notifications_active" className="text-primary text-[32px]" />
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Create Property Alert</h1>
          <p className="text-on-surface-variant font-body-md">
            Get notified when matching properties are listed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl property-shadow p-8 space-y-6">
          <div>
            <label className="block font-label-md text-on-surface mb-2">
              Alert Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
              placeholder="e.g. 3-Bed Flat in Lekki under 50M"
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md text-on-surface mb-2">State</label>
              <select value={state} onChange={(e) => { setState(e.target.value); setArea(""); }}
                className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-white font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">All States</option>
                {NIGERIAN_STATES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-label-md text-on-surface mb-2">Area / LGA</label>
              {selectedState ? (
                <select value={area} onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-white font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                  <option value="">All Areas</option>
                  {selectedState.lgas.map((lga) => <option key={lga} value={lga}>{lga}</option>)}
                </select>
              ) : (
                <input type="text" value={area} onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Lekki, Ikoyi"
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              )}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-3">Property Type</label>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => {
                const selected = propertyTypes.includes(type);
                return (
                  <button key={type} type="button" onClick={() => togglePropertyType(type)}
                    className={`px-4 py-2 rounded-full font-label-md text-sm border transition-all ${
                      selected ? "bg-primary text-white border-primary" : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                    }`}>
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-3">Listing Type</label>
            <div className="flex gap-2">
              {LISTING_TYPES.map((type) => (
                <button key={type} type="button" onClick={() => setListingType(type)}
                  className={`px-4 py-2 rounded-full font-label-md text-sm border transition-all ${
                    listingType === type ? "bg-primary text-white border-primary" : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                  }`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-2">Budget Range (₦)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                <input type="text" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} placeholder="Min Price"
                  className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
                <input type="text" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} placeholder="Max Price"
                  className="w-full pl-8 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-label-md text-on-surface mb-3">Bedrooms</label>
            <div className="flex gap-2">
              {BEDROOM_OPTIONS.map((opt) => (
                <button key={opt} type="button" onClick={() => setBedrooms(opt)}
                  className={`px-4 py-2 rounded-full font-label-md text-sm border transition-all ${
                    bedrooms === opt ? "bg-primary text-white border-primary" : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-outline-variant">
            <h4 className="font-label-md text-on-surface pt-2">Notification Method</h4>
            {[
              { label: "Email Notifications", value: emailNotifs, set: setEmailNotifs },
              { label: "SMS Notifications", value: smsNotifs, set: setSmsNotifs },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <span className="font-label-md text-on-surface-variant">{n.label}</span>
                <button type="button" role="switch" aria-checked={n.value} onClick={() => n.set((p) => !p)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${n.value ? "bg-primary" : "bg-surface-container-highest"}`}>
                  <span className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-all ${n.value ? "translate-x-5" : ""}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate("/dashboard/alerts")}
              className="flex-1 py-3 border-2 border-outline-variant text-on-surface-variant rounded-full font-label-md hover:bg-surface-container transition-all">
              Cancel
            </button>
            <button type="submit" disabled={saving || !alertName.trim()}
              className="flex-1 py-3 bg-primary text-on-primary rounded-full font-label-md font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {saving ? <><Icon name="progress_activity" className="animate-spin" />Creating...</> : <><Icon name="notifications_active" />Create Alert</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
