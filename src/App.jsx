import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SearchMapPage from "./pages/SearchMapPage";
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
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import FavoritesPage from "./pages/FavoritesPage";
import AlertsPage from "./pages/AlertsPage";
import MessagesPage from "./pages/MessagesPage";
import CreateAlertPage from "./pages/CreateAlertPage";
import BuyerProfileSettingsPage from "./pages/BuyerProfileSettingsPage";
import AgentApplicationStep1Page from "./pages/AgentApplicationStep1Page";
import AgentApplicationStep2Page from "./pages/AgentApplicationStep2Page";
import AgentApplicationStep3Page from "./pages/AgentApplicationStep3Page";
import AgentApplicationReviewPage from "./pages/AgentApplicationReviewPage";
import { AgentApplicationProvider } from "./context/AgentApplicationContext";
import AgentDashboardLayout from "./components/AgentDashboardLayout";
import AgentDashboardOverviewPage from "./pages/AgentDashboardOverviewPage";
import MyListingsPage from "./pages/MyListingsPage";
import AgentMessagesPage from "./pages/AgentMessagesPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import SubscriptionConfirmationPage from "./pages/SubscriptionConfirmationPage";
import AgentProfileSettingsPage from "./pages/AgentProfileSettingsPage";
import AddListingStep1Page from "./pages/AddListingStep1Page";
import AddListingStep2Page from "./pages/AddListingStep2Page";
import AddListingStep3Page from "./pages/AddListingStep3Page";
import AddListingStep4Page from "./pages/AddListingStep4Page";
import { AddListingProvider } from "./context/AddListingContext";
import AdminLayout from "./components/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAgentsPage from "./pages/AdminAgentsPage";
import AdminListingsPage from "./pages/AdminListingsPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminMonetizationPage from "./pages/AdminMonetizationPage";
import AdminSiteSettingsPage from "./pages/AdminSiteSettingsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buy" element={<SearchResultsPage />} />
      <Route path="/rent" element={<SearchResultsPage />} />
      <Route path="/shortlet" element={<SearchResultsPage />} />
      <Route path="/land" element={<SearchResultsPage />} />
      <Route path="/search/map" element={<SearchMapPage />} />
      <Route path="/listing/:id" element={<PropertyDetailPage />} />
      <Route path="/listing/:id/report" element={<ReportListingPage />} />
      <Route path="/agents/:id" element={<AgentProfilePage />} />
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
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverviewPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="alerts/new" element={<CreateAlertPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="settings" element={<BuyerProfileSettingsPage />} />
      </Route>
      <Route path="/agent-dashboard" element={<AgentDashboardLayout />}>
        <Route index element={<AgentDashboardOverviewPage />} />
        <Route path="listings" element={<MyListingsPage />} />
        <Route
          path="listings/new"
          element={
            <AddListingProvider>
              <Outlet />
            </AddListingProvider>
          }
        >
          <Route index element={<AddListingStep1Page />} />
          <Route path="details" element={<AddListingStep2Page />} />
          <Route path="price" element={<AddListingStep3Page />} />
          <Route path="media" element={<AddListingStep4Page />} />
        </Route>
        <Route path="messages" element={<AgentMessagesPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="subscription/confirmation" element={<SubscriptionConfirmationPage />} />
        <Route path="settings" element={<AgentProfileSettingsPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="agents" element={<AdminAgentsPage />} />
        <Route path="listings" element={<AdminListingsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="monetization" element={<AdminMonetizationPage />} />
        <Route path="settings" element={<AdminSiteSettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
