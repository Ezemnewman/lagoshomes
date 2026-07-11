import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import WizardProgressBar from "../components/WizardProgressBar";
import FileUploadZone from "../components/FileUploadZone";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useAgentApplication } from "../context/AgentApplicationContext";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Property Guide", href: "/help" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
];

/**
 * Step 3 of 3, final step. Submits the FULL accumulated context state
 * (all of steps 1 and 2, plus these 2 files) together, matching the
 * person's explicit choice for this wizard — nothing was sent
 * partially at steps 1 or 2, only here. Resets the context after
 * submitting so a second application later starts clean.
 *
 * Two of the three Stitch exports for step 3 were byte-identical
 * (Government ID + CAC Certificate cards) — the Profile Photo card
 * only appeared in one version, so it's included here since it's
 * clearly part of the intended final design, not a one-off variant.
 */
export default function AgentApplicationStep3Page() {
  const navigate = useNavigate();
  const { formData, updateFields, resetApplication } = useAgentApplication();

  const canSubmit = formData.governmentId && formData.cacCertificate && formData.profilePhoto;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    console.log("Submitting full agent application:", formData);
    // TODO: POST multipart/form-data to /api/agents/apply once a real
    // backend exists, carrying every field collected across all 3
    // steps plus the 3 uploaded files together in one request.
    resetApplication();
    navigate("/agents/apply/review");
  };

  return (
    <div className="text-on-background min-h-screen flex flex-col font-body-md">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-2xl">
          <div className="mb-stack-lg">
            <WizardProgressBar step={3} label="" />
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 property-shadow border border-outline-variant">
            <header className="mb-stack-lg text-center">
              <h2 className="text-headline-sm font-headline-sm mb-2">
                Final Step: Identity &amp; Business
              </h2>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Please upload the required documents to verify your professional status.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-stack-lg">
              <FileUploadZone
                label="Government-Issued ID (NIN/Driver's License/Voter's Card)"
                required
                icon="cloud_upload"
                hint="PNG, JPG, PDF up to 10MB"
                file={formData.governmentId}
                onFileSelect={(file) => updateFields({ governmentId: file })}
              />

              <FileUploadZone
                label="CAC Certificate (if registered business)"
                icon="business_center"
                hint="PNG, JPG, PDF up to 10MB"
                file={formData.cacCertificate}
                onFileSelect={(file) => updateFields({ cacCertificate: file })}
              />

              <FileUploadZone
                label="Profile Photo"
                required
                icon="account_circle"
                hint="Professional headshot preferred — min 400x400px"
                accept="image/*"
                file={formData.profilePhoto}
                onFileSelect={(file) => updateFields({ profilePhoto: file })}
              />

              <div className="bg-surface-container-low rounded-lg p-4 flex items-start gap-3">
                <Icon name="info" className="text-secondary text-2xl" />
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Your application will be reviewed within 24-48 hours. We will notify you via
                  email once your account is verified.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/agents/apply/location")}
                  className="flex-1 border-2 border-primary text-primary py-3 rounded-full font-label-md hover:bg-primary/5 transition-colors text-center"
                >
                  Back
                </button>
                <LoadingButton
                  type="submit"
                  disabled={!canSubmit}
                  className="flex-1 bg-primary text-on-primary py-3 rounded-full font-label-md hover:opacity-90 shadow-lg transition-all text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
