/**
 * Real About Us page content, replacing the earlier placeholder. Kept
 * as data (not hardcoded JSX) for the same reason TERMS_SECTIONS is —
 * easy to edit copy later without touching component code.
 */
export const ABOUT_HERO = {
  heading: "Connecting Nigerians to Trusted Homes",
  subheading:
    "We are redefining the real estate experience in Nigeria through transparency, technology, and trust.",
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1590059040398-61f4c71888ad?q=80&w=2000&auto=format&fit=crop",
};

export const ABOUT_MISSION = {
  eyebrow: "OUR MISSION",
  heading: "Empowering Every Nigerian to Find Their Space",
  paragraphs: [
    "At KCEE, we believe homeownership shouldn't be a dream deferred. Our mission is to provide every Nigerian — from Lagos to Kano, Port Harcourt to Abuja — with a seamless, secure, and transparent path to owning or renting their perfect property.",
    "By bridging the gap between verified real estate professionals and home seekers, we are building an ecosystem where trust is the primary currency. We leverage cutting-edge data and local expertise to ensure your next move is your best move.",
  ],
  highlights: ["100% Verified Listings", "Transparent Pricing"],
  imageUrl:
    "https://lh3.googleusercontent.com/aida/AP1WRLsXzfUXlxnQ35AZ53cX-u7ytkmAxWgGnwCZEm701kapih8-GDIZ9d9NXSaB_Ujf1YRLzbqOX2ZOioP7RUPI6hk4l9kNp9xE4t1CfpinBkf5gFqYevKo8CXSLp6nFN7ES3s7WY3zqBcPz3T2brtte0fMFs-IPpZjj061Y7kNowNt0VF3zQgxOzGTSb5pwSDAAzXLRS6jONpIFTJlAhJMChJkxc2WnbuQr5tu65Ov9TbIGdfUYNE_ezm_S85a",
  statBadge: { value: "2,500+", label: "Families Housed" },
};

export const ABOUT_TRUST_STATS = [
  { value: "10,000+", label: "Listings" },
  { value: "500+", label: "Verified Agents" },
  { value: "36", label: "States Covered" },
];

export const ABOUT_HOW_IT_WORKS = {
  heading: "How KCEE Works",
  subheading: "We've simplified the journey for everyone in the real estate ecosystem.",
  seekers: {
    title: "For Seekers",
    icon: "search_insights",
    steps: [
      {
        title: "Search",
        description:
          "Explore thousands of verified listings across residential and commercial sectors in every state.",
      },
      {
        title: "Connect",
        description:
          "Chat directly with our verified agents via our secure platform to ask questions or schedule tours.",
      },
      {
        title: "Move In",
        description:
          "Complete your transaction and secure your dream home with total confidence in our platform.",
      },
    ],
  },
  agents: {
    title: "For Agents",
    icon: "person_pin",
    steps: [
      {
        title: "Register",
        description:
          "Join our network of elite professionals and create your digital agency profile in minutes.",
      },
      {
        title: "Get Verified",
        description:
          'Pass our rigorous trust checks to earn the "Verified" badge, boosting your credibility instantly.',
      },
      {
        title: "List Properties",
        description:
          "Reach thousands of potential clients daily and manage your leads through our advanced dashboard.",
      },
    ],
  },
};
