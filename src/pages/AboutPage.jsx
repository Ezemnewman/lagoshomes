import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import Icon from "../components/Icon";
import {
  ABOUT_HERO,
  ABOUT_MISSION,
  ABOUT_TRUST_STATS,
  ABOUT_HOW_IT_WORKS,
} from "../data/aboutContent";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "Properties", href: "/buy" },
      { label: "Verified Agents", href: "/agents/tunde-bakare" },
      { label: "List a Property", href: "/signup" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

/**
 * Real About Us page, replacing the StaticPage-based placeholder.
 * Uses the standard Navbar/SiteFooter — this export's nav (Properties/
 * Agents/About Us/Contact + Sign In) is close enough to our standard
 * set that forking a third navbar variant isn't worth it, same call
 * made for the Agent Profile and Terms pages.
 */
export default function AboutPage() {
  return (
    <div className="bg-background text-on-surface font-body-md">
      <Navbar />

      <header
        className="relative min-h-[600px] flex items-center justify-center text-center px-margin-mobile md:px-margin-desktop"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 81, 56, 0.85), rgba(0, 81, 56, 0.7)), url('${ABOUT_HERO.backgroundImageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6">
            {ABOUT_HERO.heading}
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto mb-10">
            {ABOUT_HERO.subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/buy"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-headline-sm text-headline-sm hover:scale-105 transition-transform"
            >
              Explore Properties
            </Link>
            <Link
              to="/agents/tunde-bakare"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-headline-sm text-headline-sm hover:bg-white/10 transition-colors"
            >
              Meet Our Agents
            </Link>
          </div>
        </div>
      </header>

      <section className="py-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-stack-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md">
              <Icon name="verified" className="text-sm" />
              {ABOUT_MISSION.eyebrow}
            </div>
            <h2 className="font-display-lg text-display-lg text-on-surface leading-tight">
              {ABOUT_MISSION.heading}
            </h2>
            {ABOUT_MISSION.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "font-body-lg text-body-lg text-on-surface-variant" : "font-body-md text-body-md text-on-surface-variant"}
              >
                {p}
              </p>
            ))}
            <div className="flex gap-4 pt-4 flex-wrap">
              {ABOUT_MISSION.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-primary" filled />
                  <span className="font-label-md text-label-md">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-secondary-container/20 rounded-xl -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <img
              src={ABOUT_MISSION.imageUrl}
              alt="Modern Nigerian luxury interior"
              className="relative z-10 w-full h-[500px] object-cover rounded-xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg z-20 hidden md:block border border-outline-variant">
              <p className="font-headline-md text-headline-md text-primary mb-1">
                {ABOUT_MISSION.statBadge.value}
              </p>
              <p className="font-label-md text-label-md text-on-surface-variant uppercase">
                {ABOUT_MISSION.statBadge.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-primary-container text-on-primary-container py-12">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {ABOUT_TRUST_STATS.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="font-display-lg text-display-lg text-secondary-container">
                {stat.value}
              </p>
              <p className="font-headline-sm text-headline-sm text-white uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-20">
            <h2 className="font-display-lg text-display-lg mb-4">{ABOUT_HOW_IT_WORKS.heading}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {ABOUT_HOW_IT_WORKS.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="bg-white p-12 rounded-xl shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={ABOUT_HOW_IT_WORKS.seekers.icon} className="text-primary" />
                </div>
                <h3 className="font-headline-md text-headline-md">
                  {ABOUT_HOW_IT_WORKS.seekers.title}
                </h3>
              </div>
              <div className="space-y-12">
                {ABOUT_HOW_IT_WORKS.seekers.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm mb-2">{step.title}</h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-on-primary p-12 rounded-xl shadow-sm border border-primary-container">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Icon name={ABOUT_HOW_IT_WORKS.agents.icon} className="text-white" />
                </div>
                <h3 className="font-headline-md text-headline-md text-white">
                  {ABOUT_HOW_IT_WORKS.agents.title}
                </h3>
              </div>
              <div className="space-y-12">
                {ABOUT_HOW_IT_WORKS.agents.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-primary font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm mb-2 text-white">
                        {step.title}
                      </h4>
                      <p className="font-body-md text-body-md text-on-primary-container">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-surface-bright overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
          <h2 className="font-display-lg text-display-lg mb-8">Ready to find your next home?</h2>
          <Link
            to="/buy"
            className="bg-primary text-on-primary px-12 py-5 rounded-full font-headline-md text-headline-md hover:scale-105 transition-transform shadow-lg inline-block"
          >
            Browse Listings
          </Link>
        </div>
      </section>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "none" }} />
    </div>
  );
}
