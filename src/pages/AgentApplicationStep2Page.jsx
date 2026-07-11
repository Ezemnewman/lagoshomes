import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import WizardProgressBar from "../components/WizardProgressBar";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useAgentApplication } from "../context/AgentApplicationContext";

const NIGERIAN_STATES = ["Lagos", "Abuja (FCT)", "Rivers", "Enugu", "Kano", "Ogun", "Delta"];

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Property Guide", href: "/help" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Support", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/**
 * Step 2 of 3. Reads defaults from context so going back to step 1
 * and returning here doesn't wipe what was already typed — same
 * pattern as step 1, just one step further into the wizard.
 */
export default function AgentApplicationStep2Page() {
  const navigate = useNavigate();
  const { formData, updateFields } = useAgentApplication();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateFields({
      state: form.get("state"),
      city: form.get("city"),
      address: form.get("address"),
    });
    navigate("/agents/apply/documents");
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl property-shadow overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-headline-md font-headline-md text-primary">Agent Registration</h1>
                <p className="text-on-surface-variant text-body-md">
                  Where is your primary base of operations?
                </p>
              </div>
            </div>
            <WizardProgressBar step={2} label="" />
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-stack-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-stack-sm">
                <label htmlFor="state" className="block text-label-md font-label-md text-on-surface-variant">
                  State
                </label>
                <div className="relative">
                  <select
                    id="state"
                    name="state"
                    required
                    defaultValue={formData.state}
                    className="w-full h-12 bg-white border border-outline-variant rounded-lg px-4 appearance-none focus:ring-2 focus:ring-primary/10 focus:border-primary text-body-md transition-all"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <Icon
                    name="expand_more"
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline"
                  />
                </div>
              </div>

              <div className="space-y-stack-sm">
                <label htmlFor="city" className="block text-label-md font-label-md text-on-surface-variant">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  defaultValue={formData.city}
                  placeholder="e.g. Ikeja"
                  className="w-full h-12 bg-white border border-outline-variant rounded-lg px-4 focus:ring-2 focus:ring-primary/10 focus:border-primary text-body-md transition-all"
                />
              </div>
            </div>

            <div className="space-y-stack-sm">
              <label htmlFor="address" className="block text-label-md font-label-md text-on-surface-variant">
                Office Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={4}
                required
                defaultValue={formData.address}
                placeholder="Enter your full business address here..."
                className="w-full bg-white border border-outline-variant rounded-lg p-4 focus:ring-2 focus:ring-primary/10 focus:border-primary text-body-md transition-all resize-none"
              />
            </div>

            <div className="flex gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
              <Icon name="info" className="text-primary" filled />
              <p className="text-label-md text-on-surface-variant">
                Providing an accurate office address helps us verify your legitimacy and build
                trust with prospective clients in your local area.
              </p>
            </div>

            <div className="flex items-center justify-between pt-stack-md">
              <button
                type="button"
                onClick={() => navigate("/agents/apply")}
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all text-label-md active:scale-95 flex items-center gap-2"
              >
                <Icon name="arrow_back" className="text-[20px]" />
                Back
              </button>
              <LoadingButton
                type="submit"
                className="px-10 py-3 rounded-full bg-primary text-on-primary font-bold hover:bg-primary-container shadow-md hover:shadow-lg transition-all text-label-md flex items-center gap-2"
              >
                Next
                <Icon name="arrow_forward" className="text-[20px]" />
              </LoadingButton>
            </div>
          </form>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
