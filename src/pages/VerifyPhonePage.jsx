import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import OtpInput from "../components/OtpInput";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import useCountdown from "../hooks/useCountdown";
import { DEMO_USER } from "../data/properties";

const FOOTER_LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Careers", href: "/careers" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/**
 * Continues the signup flow: SignupPage navigates here with
 * `{ role, phone }` in router state instead of the URL, so this page
 * knows where to send the person next without a backend session to
 * read from yet. If someone lands here directly (refresh, bookmarked
 * link, no state), role/phone are simply undefined and we fall back
 * to sending them home after verifying — there's no account context
 * to recover without a real backend anyway.
 *
 * Per the person's explicit choice, this uses the standard Navbar/
 * SiteFooter (not the stripped-down AuthHeader/AuthFooter Signup and
 * Login use) — task-focused doesn't have to mean minimal-shell here.
 */
export default function VerifyPhonePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, phone } = location.state || {};

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const countdown = useCountdown(45);

  const maskedPhone = phone ? `+234 ${phone.slice(0, 1)}XX XXX XXXX` : "+234 8XX XXX XXXX";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }
    setError("");
    setVerifying(true);
    console.log("Verifying OTP:", code);
    // TODO: POST to /api/auth/verify-phone once backend exists. That
    // endpoint checks the code against what was actually sent and
    // marks the account as phone-verified. The setTimeout below stands
    // in for that real network request.
    setTimeout(() => {
      setVerifying(false);
      navigate(role === "agent" ? "/agents/apply" : "/");
    }, 1200);
  };

  const handleResend = () => {
    console.log("Resend code requested");
    // TODO: POST to /api/auth/resend-otp once backend exists
    countdown.restart();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar user={DEMO_USER} />

      <main className="flex-grow flex items-center justify-center px-4 py-stack-lg">
        <div className="w-full max-w-md bg-white rounded-xl property-shadow p-stack-lg flex flex-col items-center">
          <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-stack-md">
            <Icon name="smartphone" className="text-primary text-4xl" />
          </div>

          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Verify Your Phone Number
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We sent a code to <span className="font-semibold">{maskedPhone}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <OtpInput value={code} onChange={setCode} />

            {error && (
              <p className="text-error text-sm text-center -mt-4 mb-stack-md">{error}</p>
            )}

            <div className="text-center mb-stack-lg">
              {!countdown.isFinished ? (
                <p className="font-label-md text-label-md text-on-surface-variant mb-1">
                  Resend code in {countdown.formatted}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary font-semibold text-body-md hover:underline transition-all"
                >
                  Resend Code
                </button>
              )}
            </div>

            <LoadingButton
              type="submit"
              loading={verifying}
              loadingLabel="Verifying..."
              className="w-full bg-primary-container text-white py-4 rounded-full font-headline-sm text-headline-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-80"
            >
              Verify
            </LoadingButton>
          </form>
        </div>
      </main>

      <SiteFooter linkColumns={FOOTER_LINK_COLUMNS} fourthColumn={{ type: "newsletter" }} />
    </div>
  );
}
