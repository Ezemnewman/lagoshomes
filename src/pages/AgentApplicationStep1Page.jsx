import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import WizardProgressBar from "../components/WizardProgressBar";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useAgentApplication } from "../context/AgentApplicationContext";

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "Less than 1 year" },
  { value: "1-3", label: "1 - 3 years" },
  { value: "3-5", label: "3 - 5 years" },
  { value: "5-10", label: "5 - 10 years" },
  { value: "10+", label: "10+ years" },
];

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/**
 * Step 1 of 3. Writes into the shared AgentApplicationContext on
 * submit (not on every keystroke) so step 2/3 can read it back if the
 * person navigates forward then back — same multi-step persistence
 * pattern as the rest of this wizard.
 */
export default function AgentApplicationStep1Page() {
  const navigate = useNavigate();
  const { formData, updateFields } = useAgentApplication();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    updateFields({
      fullName: form.get("full_name"),
      phone: form.get("phone"),
      email: form.get("email"),
      agencyName: form.get("agency"),
      experience: form.get("experience"),
    });
    navigate("/agents/apply/location");
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-[640px] mb-stack-md text-center">
          <h1 className="text-headline-md font-headline-md text-primary mb-2">Partner with KCEE</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Join Nigeria's most trusted real estate marketplace.
          </p>
        </div>

        <div className="w-full max-w-[640px] bg-surface-container-lowest rounded-xl p-8 md:p-12 property-shadow border border-outline-variant">
          <WizardProgressBar step={1} label="Basic Info" />

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div className="space-y-2">
              <label htmlFor="full_name" className="block text-label-md font-label-md text-on-surface">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                defaultValue={formData.fullName}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-label-md font-label-md text-on-surface">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md">
                    +234
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    defaultValue={formData.phone}
                    placeholder="800 000 0000"
                    className="w-full pl-16 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-label-md font-label-md text-on-surface">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={formData.email}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="agency" className="block text-label-md font-label-md text-on-surface">
                  Agency/Company Name
                </label>
                <span className="text-label-md font-label-md text-on-surface-variant opacity-60 italic">
                  Optional
                </span>
              </div>
              <input
                id="agency"
                name="agency"
                type="text"
                defaultValue={formData.agencyName}
                placeholder="e.g. Heritage Properties Ltd"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className="block text-label-md font-label-md text-on-surface">
                Years of Experience
              </label>
              <div className="relative">
                <select
                  id="experience"
                  name="experience"
                  required
                  defaultValue={formData.experience}
                  className="w-full appearance-none px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md cursor-pointer"
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Icon
                  name="expand_more"
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant"
                />
              </div>
            </div>

            <div className="pt-stack-md">
              <LoadingButton
                type="submit"
                className="w-full bg-primary text-on-primary py-4 rounded-full font-headline-sm text-headline-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Next
                <Icon name="arrow_forward" />
              </LoadingButton>
              <p className="text-center text-label-md font-label-md text-on-surface-variant mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-stack-lg max-w-[640px] flex items-start gap-4 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <Icon name="verified_user" className="text-secondary scale-150 mt-1" filled />
          <p className="text-body-md font-body-md text-on-surface italic">
            "KCEE has helped over 5,000 agents in Lagos and Abuja connect with qualified property
            buyers through a seamless digital experience."
          </p>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
