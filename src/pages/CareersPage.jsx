import StaticPage from "../components/StaticPage";

export default function CareersPage() {
  return (
    <StaticPage title="Careers at KCEE" subtitle="We're not hiring yet — but check back soon.">
      <p>
        {/* TODO: replace with real open roles once there are any */}
        KCEE doesn't have any open positions right now. As the platform
        grows, opportunities will be posted here — covering engineering,
        agent partnerships, and customer support roles across Nigeria.
      </p>
    </StaticPage>
  );
}
