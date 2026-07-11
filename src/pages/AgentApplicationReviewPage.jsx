import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import Icon from "../components/Icon";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Navigation",
    links: [
      { label: "Properties", href: "/buy" },
      { label: "Agents", href: "/agents/tunde-bakare" },
      { label: "Rentals", href: "/rent" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/**
 * Final screen after submitting the 3-step application. "Go to
 * Dashboard" points at /dashboard (the buyer dashboard) since the agent
 * dashboard requires verification first per platform rules — same
 * logic as routing fresh signups to /agents/apply before /agents/:id.
 * Once a real backend exists with actual approval state, this could
 * instead redirect to a pending-state version of the agent dashboard.
 */
export default function AgentApplicationReviewPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg relative overflow-hidden">
        <section className="max-w-2xl w-full bg-surface-container-lowest p-stack-lg md:p-12 rounded-xl border border-outline-variant/30 text-center relative z-10">
          <div className="mb-stack-lg flex justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-surface-container-low">
              <Icon name="hourglass_top" className="text-primary text-[64px]" />
            </div>
          </div>

          <h1 className="font-headline-md text-headline-md md:text-display-lg-mobile text-on-surface mb-stack-md">
            Your application is under review
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-stack-lg leading-relaxed">
            We typically review applications within 24-48 hours. We'll notify you by SMS and email
            once approved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md">
            <Link
              to="/dashboard"
              className="bg-primary text-on-primary font-label-md px-8 py-3 rounded-full hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Icon name="dashboard" className="text-[20px]" />
              Go to Dashboard
            </Link>
            <Link
              to="/contact"
              className="text-primary font-label-md px-8 py-3 border-2 border-primary rounded-full hover:bg-primary/5 transition-all flex items-center gap-2"
            >
              <Icon name="support_agent" className="text-[20px]" />
              Contact Support
            </Link>
          </div>

          <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant/30">
            <div className="flex items-center justify-center gap-stack-sm text-label-md text-on-surface-variant">
              <Icon name="verified" className="text-secondary" filled />
              <span className="font-medium">KCEE Verified Professional</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
    </div>
  );
}
