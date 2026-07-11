import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import OtpInput from "../components/OtpInput";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import useCountdown from "../hooks/useCountdown";

/**
 * Second step of password reset. Reuses OtpInput and useCountdown
 * exactly as built for VerifyPhonePage — same auto-advance digit boxes,
 * same countdown-then-resend pattern, just a different seconds value
 * (59, matching this Stitch export) and paired with a new-password
 * form instead of standing alone.
 *
 * Reads `identifier` from router state (set by ForgotPasswordPage) so
 * "code sent to X" could be shown if needed — not displayed in this
 * export's design, but available if a future revision wants it.
 *
 * No real password-match or strength validation here, consistent with
 * the earlier decision on SignupPage: validation arrives with the
 * backend, not before.
 */
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { identifier } = location.state || {};

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const countdown = useCountdown(59);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }
    setError("");
    setSubmitting(true);
    console.log("Resetting password for:", identifier, "with code:", code);
    // TODO: POST to /api/auth/reset-password once backend exists. That
    // endpoint verifies the code matches what was sent for this
    // identifier, then updates the password hash. The setTimeout below
    // stands in for that real network request.
    setTimeout(() => {
      setSubmitting(false);
      navigate("/login");
    }, 1200);
  };

  const handleResend = () => {
    console.log("Resend reset code requested for:", identifier);
    // TODO: POST to /api/auth/forgot-password again once backend exists
    countdown.restart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg">
        <div className="w-full max-w-md bg-white rounded-xl property-shadow p-8 md:p-10">
          <div className="text-center mb-stack-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-fixed text-primary mb-stack-md">
              <Icon name="lock_reset" className="text-[32px]" />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Set New Password
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Enter the code sent to your device and your new password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-stack-lg">
            <div className="space-y-stack-sm">
              <label className="font-label-md text-label-md text-on-surface-variant">
                Verification Code
              </label>
              <OtpInput value={code} onChange={setCode} />

              {error && <p className="text-error text-sm text-center -mt-2">{error}</p>}

              <div className="flex justify-between items-center mt-2">
                <p className="font-label-md text-label-md text-on-surface-variant">
                  Didn't receive code?
                </p>
                {!countdown.isFinished ? (
                  <span className="font-label-md text-label-md text-secondary font-bold opacity-50">
                    Resend in {countdown.formatted}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-label-md text-label-md text-secondary font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-stack-md">
              <div className="space-y-stack-sm">
                <label htmlFor="new-password" className="font-label-md text-label-md text-on-surface-variant">
                  New Password
                </label>
                <div className="relative">
                  <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    id="new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
                  />
                </div>
              </div>

              <div className="space-y-stack-sm">
                <label htmlFor="confirm-password" className="font-label-md text-label-md text-on-surface-variant">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Icon
                    name="verified_user"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                  />
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
                  />
                </div>
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={submitting}
              loadingLabel="Resetting..."
              className="w-full bg-primary text-on-primary font-label-md text-label-md font-bold py-4 rounded-full hover:shadow-lg active:scale-[0.98] transition-all duration-150 uppercase tracking-wider"
            >
              Reset Password
            </LoadingButton>
          </form>

          <div className="mt-stack-lg text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon name="arrow_back" className="text-sm" />
              Back to Login
            </Link>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
