/**
 * The terms content lives here as data — both the on-page TermsContent
 * component and DownloadTermsPdfButton read from this same array, so
 * the downloaded PDF can never drift out of sync with what's shown on
 * the page (a real risk if the PDF had its own hardcoded copy of the
 * text).
 *
 * `paragraphs` is plain text only (used directly by the PDF generator,
 * which can't render JSX) — anything needing richer on-page treatment
 * (the quoted callout box, the verification-method cards, the fee
 * table, the prohibited-conduct list) is handled separately inside
 * TermsContent.jsx itself, since those are presentational only and
 * don't need to exist in the PDF version word-for-word.
 */
export const TERMS_LAST_UPDATED = "October 24, 2023";

export const TERMS_SECTIONS = [
  {
    id: "definitions",
    label: "Definitions",
    icon: "info",
    paragraphs: [
      'In these Terms and Conditions, the following words and expressions shall have the meanings assigned to them.',
      '"KCEE" refers to KCEE Real Estate Marketplace, including its website, mobile applications, and subsidiaries.',
      '"Platform" means the digital infrastructure provided by KCEE to facilitate property listings, searches, and interactions.',
      '"User" refers to any individual or entity browsing the platform, whether as a buyer, tenant, or casual visitor.',
      '"Verified Agent" refers to real estate professionals who have passed our internal vetting process and hold a valid KCEE badge.',
    ],
  },
  {
    id: "user-responsibilities",
    label: "User Responsibilities",
    icon: "person",
    paragraphs: [
      "Users must provide accurate, current, and complete information during the registration process and keep their account information up-to-date. Users are responsible for maintaining the confidentiality of their account credentials.",
      "Users are strictly prohibited from sharing personal contact details in property comment sections to circumvent platform verification protocols.",
      "By using KCEE, you represent that you are at least 18 years of age and possess the legal authority to enter into binding agreements under Nigerian law.",
    ],
  },
  {
    id: "agent-verification",
    label: "Agent Verification",
    icon: "verified_user",
    paragraphs: [
      "KCEE prioritizes trust and safety. All listing agents are subject to a multi-tiered verification process, which includes identity checks (validation of NIN or International Passport via official government databases) and office inspection (physical or digital verification of the agent's business location).",
      "While we strive for 100% accuracy, KCEE does not guarantee the integrity of every individual listing and advises users to perform independent due diligence before making payments.",
    ],
  },
  {
    id: "fees-payments",
    label: "Fees & Payments",
    icon: "payments",
    paragraphs: [
      "KCEE operates on a transparent fee structure. All listed prices are in Nigerian Naira. Standard property listings, premium featured slots, and the agent verification badge each carry their own fee, detailed in the fee table on this page.",
      "Caution: KCEE does not currently process direct rental payments. All rental transactions should happen via our verified escrow partners or directly with verified agents after physical inspection.",
    ],
  },
  {
    id: "refund-policy",
    label: "Caution & Refund",
    icon: "assignment_return",
    paragraphs: [
      "Caution fees are deposits paid by tenants to cover potential damages to a property. On KCEE, the standard caution fee is typically 10% of the annual rent.",
      "Refunds must be requested within 14 days of lease termination. A joint inspection by the tenant and agent/landlord is required to document property state, and deductions from the caution fee must be backed by receipts or formal repair quotes.",
    ],
  },
  {
    id: "prohibited-conduct",
    label: "Prohibited Conduct",
    icon: "block",
    paragraphs: [
      "The following activities are strictly prohibited on the KCEE platform: posting fraudulent or bait-and-switch listings; impersonating KCEE officials or agents; scraping platform data for unauthorized third-party use; and discriminatory behavior based on ethnicity, religion, or gender.",
    ],
  },
  {
    id: "dispute-resolution",
    label: "Dispute Resolution",
    icon: "gavel",
    paragraphs: [
      "Any disputes arising out of these terms shall first be attempted to be settled through amicable mediation facilitated by the KCEE Legal Compliance Team.",
      "If mediation fails within 30 days, the dispute shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Mediation Act of Nigeria.",
    ],
  },
  {
    id: "liability-disclaimer",
    label: "Liability Disclaimer",
    icon: "warning",
    paragraphs: [
      "Limitation of Liability: to the maximum extent permitted by applicable law, KCEE shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services, or any conduct or content of any third party on the services.",
    ],
  },
];

export const TERMS_FEE_TABLE = [
  { service: "Standard Property Listing", fee: "₦5,000 / month" },
  { service: "Premium Featured Slot", fee: "₦15,000 / week" },
  { service: "Agent Verification Badge", fee: "₦25,000 (Annual)" },
];
