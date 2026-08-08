import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WizardProgressBar from "../components/WizardProgressBar";
import Icon from "../components/Icon";
import { useAddListing } from "../context/AddListingContext";
import api from "../utils/api";

const AMENITIES_LIST = [
  { id: "electricity", label: "24/7 Electricity" },
  { id: "water", label: "Water Supply" },
  { id: "security", label: "Security" },
  { id: "parking", label: "Parking" },
  { id: "furnished", label: "Furnished" },
  { id: "ac", label: "Air Conditioning" },
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "cctv", label: "CCTV" },
  { id: "generator", label: "Generator" },
  { id: "serviced", label: "Serviced" },
  { id: "bq", label: "Boys' Quarters" },
  { id: "garden", label: "Garden" },
  { id: "elevator", label: "Elevator" },
];

/**
 * Step 4 — the only step that actually hits the backend.
 * Collects photos + amenities, then bundles ALL 4 steps' data into
 * a single FormData object and POSTs to /api/listings as multipart.
 * The backend's multer middleware picks up the files and sends them
 * to Cloudinary automatically before the controller runs.
 */
export default function AddListingStep4Page() {
  const navigate = useNavigate();
  const { formData, updateFields, resetListing } = useAddListing();
  const fileInputRef = useRef(null);

  const [photos, setPhotos] = useState(formData.photos || []);
  const [videoUrl, setVideoUrl] = useState(formData.videoUrl || "");
  const [amenities, setAmenities] = useState(formData.amenities || []);
  const [virtualTourUrl, setVirtualTourUrl] = useState(formData.virtualTourUrl || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addPhotos = (fileList) =>
    setPhotos((prev) => [...prev, ...Array.from(fileList)]);
  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const toggleAmenity = (id) =>
    setAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photos.length === 0) {
      setError("Please upload at least one photo");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      // Build multipart FormData from all 4 steps
      const body = new FormData();

      // Step 1 — Location
      body.append("state", formData.state);
      body.append("lga", formData.lga);
      body.append("address", formData.address);
      if (formData.latitude) body.append("latitude", formData.latitude);
      if (formData.longitude) body.append("longitude", formData.longitude);

      // Step 2 — Basic Details
      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("propertyType", formData.propertyType);
      body.append("listingType", formData.listingType);
      if (formData.bedrooms) body.append("bedrooms", formData.bedrooms);
      if (formData.bathrooms) body.append("bathrooms", formData.bathrooms);
      if (formData.toilets) body.append("toilets", formData.toilets);
      if (formData.squareMeters) body.append("squareMeters", formData.squareMeters);

      // Step 3 — Price
      body.append("price", formData.price.replace(/,/g, ""));
      body.append("negotiable", formData.negotiable);
      if (formData.paymentTerms) body.append("paymentTerms", formData.paymentTerms);
      body.append("agencyFeePercent", formData.agencyFeePercent || "5");
      body.append("legalFeePercent", formData.legalFeePercent || "5");

      // Step 4 — Media & amenities
      amenities.forEach((a) => body.append("amenities", a));
      if (videoUrl) body.append("videoUrl", videoUrl);
      if (virtualTourUrl) body.append("virtualTourUrl", virtualTourUrl);

      // Actual photo files — multer picks these up server-side
      photos.forEach((file) => body.append("files", file));

      await api.upload("/listings", body);

      resetListing();
      navigate("/agent-dashboard/listings", {
        state: { successMessage: "Listing submitted for review! It will be live once approved." },
      });
    } catch (err) {
      setError(err.message || "Failed to submit listing — please try again");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-stack-lg">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface mb-1">Add New Listing</h1>
          <p className="text-on-surface-variant font-body-md">Step 4 of 4 — Media & Property Details</p>
        </div>

        <WizardProgressBar currentStep={4} totalSteps={4} />

        {error && (
          <div className="mt-4 p-4 bg-error-container rounded-xl flex items-center gap-3">
            <Icon name="error" className="text-error" />
            <p className="text-error font-label-md">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl property-shadow p-8 mt-stack-lg space-y-8">
          {/* Photo Upload */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Property Photos <span className="text-error">*</span>
              <span className="text-on-surface-variant text-xs ml-2">(min 1, max 20)</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); addPhotos(e.dataTransfer.files); }}
              className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addPhotos(e.target.files)}
              />
              <Icon name="add_photo_alternate"
                className="text-[48px] text-outline-variant group-hover:text-primary transition-colors mb-2" />
              <p className="font-body-md text-on-surface-variant">
                Click to upload or drag & drop photos
              </p>
              <p className="text-xs text-outline mt-1">JPG, PNG up to 10MB each</p>
            </div>

            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {photos.map((file, i) => (
                  <div key={`${file.name}-${i}`}
                    className="flex items-center justify-between p-2 bg-surface-container rounded border border-outline-variant">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Icon name="image" className="text-primary text-sm flex-shrink-0" />
                      <span className="font-label-md text-label-md truncate text-sm">{file.name}</span>
                    </div>
                    <button type="button" onClick={() => removePhoto(i)}
                      className="text-error ml-2 flex-shrink-0 hover:scale-110 transition-transform">
                      <Icon name="close" className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Video Tour URL
              <span className="text-on-surface-variant text-xs ml-2">(YouTube or Vimeo, optional)</span>
            </label>
            <div className="relative">
              <Icon name="play_circle" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-4">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((amenity) => {
                const checked = amenities.includes(amenity.id);
                return (
                  <button key={amenity.id} type="button" onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all text-left ${
                      checked
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                    }`}>
                    <Icon name={checked ? "check_circle" : "check_box_outline_blank"} className="text-lg" filled={checked} />
                    <span className="font-label-md text-label-md text-sm">{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Virtual Tour */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              360° Virtual Tour URL <span className="text-on-surface-variant text-xs">(optional)</span>
            </label>
            <input type="url" value={virtualTourUrl} onChange={(e) => setVirtualTourUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant">
            <button type="button"
              onClick={() => navigate("/agent-dashboard/listings/new/price")}
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors">
              <Icon name="arrow_back" className="text-lg" />
              Back
            </button>
            <button type="submit" disabled={submitting || photos.length === 0}
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? (
                <><Icon name="progress_activity" className="animate-spin" />Submitting...</>
              ) : (
                <><Icon name="check_circle" className="text-lg" filled />Publish Listing</>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
