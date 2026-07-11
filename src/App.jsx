import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AgentProfilePage from "./pages/AgentProfilePage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import CareersPage from "./pages/CareersPage";
import SignupPage from "./pages/SignupPage";
import VerifyPhonePage from "./pages/VerifyPhonePage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ReportListingPage from "./pages/ReportListingPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import FavoritesPage from "./pages/FavoritesPage";
import AlertsPage from "./pages/AlertsPage";
import MessagesPage from "./pages/MessagesPage";
import AgentApplicationStep1Page from "./pages/AgentApplicationStep1Page";
import AgentApplicationStep2Page from "./pages/AgentApplicationStep2Page";
import AgentApplicationStep3Page from "./pages/AgentApplicationStep3Page";
import AgentApplicationReviewPage from "./pages/AgentApplicationReviewPage";
import { AgentApplicationProvider } from "./context/AgentApplicationContext";
import AgentDashboardLayout from "./components/AgentDashboardLayout";
import AgentDashboardOverviewPage from "./pages/AgentDashboardOverviewPage";

/**
 * Real routing, replacing the temporary dev-only page switcher.
 * Buy/Rent/Shortlet/Land all currently point at SearchResultsPage —
 * once the backend exists, each route can pass a default filter
 * (e.g. /rent pre-filters listingType="For Rent") rather than each
 * needing a separate page component.
 *
 * The static content pages (About/Privacy/Terms/etc.) are placeholders
 * per the person's request — real copy will replace the filler text
 * inside each page file, but the routes and navigation are real now.
 *
 * /agents/apply (and its nested wizard steps) and /agents/:id can be
 * declared in any order — React Router v6 ranks routes by specificity
 * (static segments beat dynamic ones), not by declaration order like
 * v5 did, so /agents/apply always wins against that exact path
 * regardless of where it's listed. Kept it above /agents/:id anyway
 * for readability, not correctness.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buy" element={<SearchResultsPage />} />
      <Route path="/rent" element={<SearchResultsPage />} />
      <Route path="/shortlet" element={<SearchResultsPage />} />
      <Route path="/land" element={<SearchResultsPage />} />
      <Route path="/listing/:id" element={<PropertyDetailPage />} />
      <Route path="/listing/:id/report" element={<ReportListingPage />} />
      <Route path="/agents/:id" element={<AgentProfilePage />} />
      <Route
        path="/agents/apply"
        element={
          <AgentApplicationProvider>
            <Outlet />
          </AgentApplicationProvider>
        }
      >
        <Route index element={<AgentApplicationStep1Page />} />
        <Route path="location" element={<AgentApplicationStep2Page />} />
        <Route path="documents" element={<AgentApplicationStep3Page />} />
      </Route>
      <Route path="/agents/apply/review" element={<AgentApplicationReviewPage />} />
      <Route path="/agent-dashboard" element={<AgentDashboardLayout />}>
        <Route index element={<AgentDashboardOverviewPage />} />
        {/* verifications, listings, messages, settings routes will slot in
            here once those screens exist — AgentDashboardSidebar already
            links to all five */}
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        {/* settings route will slot in here once that screen exists */}
      </Route>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-phone" element={<VerifyPhonePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/careers" element={<CareersPage />} />
    </Routes>
  );
}
