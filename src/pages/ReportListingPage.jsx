import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";

const REPORT_REASONS = [
  { value: "fake", label: "Fake/Scam Listing" },
  { value: "sold", label: "Property Already Sold/Rented" },
  { value: "wrong_details", label: "Wrong Price or Details" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "other", label: "Other" },
];

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

/**
 * Reads :id from the URL so this knows which listing is being
 * reported — PropertyDetailPage's "Report Listing" button now links
 * here as /listing/:id/report instead of just logging to console.
 *
 * The file upload dropzone was vanilla JS (manual DOM node creation,
 * drag/drop class toggling) in the export — rebuilt here as real React
 * state (`files` array), with the same drag-over visual feedback and
 * a remove button per file, since real file objects need somewhere to
 * live before an actual upload endpoint exists.
 */
export default function ReportListingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addFiles = (fileList) => {
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Report submitted:", { listingId: id, reason, details, fileCount: files.length });
    // TODO: POST to /api/listings/:id/report once backend exists (as
    // multipart/form-data, since real screenshot files are attached).
    // The setTimeout below stands in for that real network request.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-surface text-on-surface min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg">
          <div className="w-full max-w-lg bg-surface-container-lowest property-shadow rounded-xl p-8 md:p-10 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
              <Icon name="check_circle" className="text-[32px]" filled />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">Report Submitted</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Thank you. Your report has been submitted and will be reviewed by our team.
            </p>
            <button
              onClick={() => navigate(id ? `/listing/${id}` : "/")}
              className="mt-4 bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
            >
              Back to Listing
            </button>
          </div>
        </main>
        <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-lg bg-surface-container-lowest property-shadow rounded-xl p-8 md:p-10">
          <div className="text-center mb-stack-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-container text-error mb-4">
              <Icon name="report_problem" className="text-[32px]" />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Help us keep KCEE safe
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              If you've noticed something wrong with this listing, please let us know. Your
              feedback helps us maintain a high-quality marketplace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="reason" className="block font-label-md text-label-md text-on-surface mb-2">
                Reason for reporting
              </label>
              <select
                id="reason"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 cursor-pointer"
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {REPORT_REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="details" className="block font-label-md text-label-md text-on-surface mb-2">
                Additional details (optional)
              </label>
              <textarea
                id="details"
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Tell us more about the issue..."
                className="w-full p-4 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Upload supporting screenshots (optional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingOver(true);
                }}
                onDragLeave={() => setIsDraggingOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors group ${
                  isDraggingOver
                    ? "bg-primary-container border-primary"
                    : "border-outline-variant hover:bg-surface-container"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <Icon
                  name="cloud_upload"
                  className="text-outline-variant text-[40px] mb-2 group-hover:text-primary transition-colors"
                />
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-outline mt-1 uppercase tracking-wider">
                  PNG, JPG up to 5MB
                </p>
              </div>

              {files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-2 bg-surface rounded border border-outline-variant"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Icon name="image" className="text-sm text-primary" />
                        <span className="font-label-md text-label-md truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-error hover:scale-110 transition-transform"
                        aria-label={`Remove ${file.name}`}
                      >
                        <Icon name="close" className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start gap-2 p-4 bg-surface-container-high rounded-lg">
              <Icon name="verified_user" className="text-primary text-sm mt-0.5" filled />
              <p className="font-label-md text-label-md text-on-surface-variant leading-tight">
                Your report is anonymous and helps protect other users.
              </p>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <LoadingButton
                type="submit"
                loading={submitting}
                loadingLabel="Submitting..."
                className="w-full h-12 bg-error text-on-error font-headline-sm text-headline-sm rounded-full hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Submit Report
              </LoadingButton>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full h-12 bg-transparent border-2 border-outline-variant text-on-surface-variant font-headline-sm text-headline-sm rounded-full hover:bg-surface-container-high transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
    </div>
  );
}
