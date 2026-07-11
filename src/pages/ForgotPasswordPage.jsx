import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";

/**
 * First real step of password reset (replaces the old
 * ForgotPasswordPlaceholderPage entirely). Collects an email or phone,
 * then carries it forward to ResetPasswordPage via router state — same
 * pattern as SignupPage -> VerifyPhonePage, so the next screen can show
 * "code sent to X" without needing a backend session yet.
 *
 * Uses the stripped-down AuthHeader/AuthFooter, matching Signup and
 * Login — this is a focused auth task, not a content page, same
 * category as those two rather than the full-site-shell treatment we
 * used for phone verification.
 */
export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    console.log("Password reset requested for:", identifier);
    // TODO: POST to /api/auth/forgot-password once backend exists.
    // That endpoint looks up the account by email/phone, generates a
    // time-limited reset code, and sends it via SMS/email. The
    // setTimeout below stands in for that real network request.
    setTimeout(() => {
      setSending(false);
      navigate("/reset-password", { state: { identifier } });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg relative overflow-hidden">
        <section className="z-10 w-full max-w-[480px] bg-white rounded-xl property-shadow p-8 md:p-12">
          <div className="flex flex-col gap-stack-md text-center">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Icon name="lock_reset" className="text-4xl" />
              </div>
            </div>

            <h1 className="font-headline-md text-headline-md text-on-surface">
              Reset Your Password
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] mx-auto">
              Enter your registered email or phone number to receive a verification code.
            </p>

            <form onSubmit={handleSubmit} className="mt-stack-lg flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier" className="font-label-md text-label-md text-on-surface-variant">
                  Phone Number or Email
                </label>
                <div className="relative">
                  <Icon
                    name="mail"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. name@email.com or 08012345678"
                    className="w-full pl-12 pr-4 py-4 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <LoadingButton
                type="submit"
                loading={sending}
                loadingLabel="Sending..."
                className="w-full py-4 px-6 bg-primary text-on-primary font-label-md text-body-md rounded-full font-bold hover:bg-primary-container transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                Send Reset Code
                <Icon name="arrow_forward" className="text-xl" />
              </LoadingButton>
            </form>

            <div className="mt-8 pt-6 border-t border-surface-variant">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-primary font-label-md hover:underline transition-all"
              >
                <Icon name="keyboard_backspace" className="text-lg" />
                Back to Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AuthFooter />
    </div>
  );
}
