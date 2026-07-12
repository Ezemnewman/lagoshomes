import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WizardProgressBar from "../components/WizardProgressBar";
import Icon from "../components/Icon";
import { useAddListing } from "../context/AddListingContext";
import { AMENITIES_LIST } from "../data/nigerianLocations";

/**
 * Step 4 of 4: Media & Property Details. The final step — submitting
 * here gathers formData from the context (which has all prior steps'
 * data) and would POST it as multipart/form-data once a backend exists.
 * Photos are held as real File objects in context state, not previewed
 * as URLs since URL.createObjectURL() results are ephemeral and would
 * be lost on re-render anyway — just show filenames for now.
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

  const addPhotos = (fileList) =>
    setPhotos((prev) => [...prev, ...Array.from(fileList)]);
  const removePhoto = (index) =>
    setPhotos((prev) => prev.filter((_, i) => i !== index));

  const toggleAmenity = (amenity) =>
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFields({ photos, videoUrl, amenities, virtualTourUrl });
    setSubmitting(true);
    const fullFormData = { ...formData, photos, videoUrl, amenities, virtualTourUrl };
    console.log("Listing submitted:", fullFormData);
    // TODO: POST to /api/listings as multipart/form-data once backend exists.
    // Endpoint should return the new listing id, then navigate to /listing/:id
    setTimeout(() => {
      setSubmitting(false);
      resetListing();
      navigate("/agent-dashboard/listings");
    }, 1500);
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

        <form onSubmit={handleSubmit} className="bg-white rounded-xl property-shadow p-8 mt-stack-lg space-y-8">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Property Photos <span className="text-error">*</span>
              <span className="text-on-surface-variant text-xs ml-2">(min 3 recommended)</span>
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
              <Icon name="add_photo_alternate" className="text-[48px] text-outline-variant group-hover:text-primary transition-colors mb-2" />
              <p className="font-body-md text-on-surface-variant">
                Click to upload or drag & drop photos
              </p>
              <p className="text-xs text-outline mt-1">JPG, PNG up to 10MB each</p>
            </div>

            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {photos.map((file, i) => (
                  <div key={`${file.name}-${i}`} className="flex items-center justify-between p-2 bg-surface-container rounded border border-outline-variant">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Icon name="image" className="text-primary text-sm" />
                      <span className="font-label-md text-label-md truncate">{file.name}</span>
                    </div>
                    <button type="button" onClick={() => removePhoto(i)} className="text-error ml-2">
                      <Icon name="close" className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              Video Tour URL
              <span className="text-on-surface-variant text-xs ml-2">(YouTube or Vimeo link, optional)</span>
            </label>
            <div className="relative">
              <Icon name="play_circle" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-4">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES_LIST.map((amenity) => {
                const checked = amenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all text-left ${
                      checked
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                    }`}
                  >
                    <Icon
                      name={checked ? "check_circle" : (amenity.icon || "check_box_outline_blank")}
                      className="text-lg"
                      filled={checked}
                    />
                    <span className="font-label-md text-label-md">{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-2">
              360° Virtual Tour URL
              <span className="text-on-surface-variant text-xs ml-2">(optional)</span>
            </label>
            <input
              type="url"
              value={virtualTourUrl}
              onChange={(e) => setVirtualTourUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div className="flex justify-between pt-4 border-t border-outline-variant">
            <button
              type="button"
              onClick={() => navigate("/agent-dashboard/listings/new/price")}
              className="flex items-center gap-2 text-on-surface-variant font-label-md hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-lg" />
              Back
            </button>
            <button
              type="submit"
              disabled={submitting || photos.length === 0}
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Icon name="progress_activity" className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Listing
                  <Icon name="check_circle" className="text-lg" filled />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
