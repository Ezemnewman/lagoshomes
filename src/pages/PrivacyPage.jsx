import StaticPage from "../components/StaticPage";

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="Last updated: placeholder date">
      {/* TODO: replace with real, lawyer-reviewed privacy policy before launch */}
      <p>
        This is a placeholder Privacy Policy. KCEE will describe here what
        personal information is collected (e.g. name, email, phone number),
        how it's used (e.g. connecting buyers with agents), and how it's
        protected.
      </p>
      <p>
        Before this site goes live, this page must be replaced with an
        actual privacy policy reviewed against Nigerian data protection
        regulations (NDPR) and any other applicable law.
      </p>
    </StaticPage>
  );
}
