import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import RoleSelector from "../components/RoleSelector";
import GoogleSignInButton from "../components/GoogleSignInButton";
import FacebookSignInButton from "../components/FacebookSignInButton";
import LoadingButton from "../components/LoadingButton";

/**
 * Form fields are controlled (real React state) so they're ready for
 * real validation once the backend exists, even though per the
 * person's explicit decision, no validation logic is added yet —
 * the form just needs to look and feel right for now.
 *
 * Role determines where submission goes — but now via an intermediate
 * stop: /verify-phone first, carrying { role, phone } in router state
 * so that page knows where to send the person next (agent verification
 * vs. home) without needing a backend session to read from yet. Agents
 * still ultimately land on /agents/apply (the 3-step application
 * wizard); buyers still land on /.
 * Neither destination actually creates an account yet — that's backend
 * work — this is just correct routing intent, clearly marked with TODOs.
 *
 * The loading-state submit button (LoadingButton + a fake setTimeout
 * delay) was retrofitted from LoginPage's same pattern, added when the
 * login screen introduced it — kept both forms consistent rather than
 * leaving signup as the one form without this treatment.
 */
export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const updateField = (field) => (e) => {
    const value = field === "agreedToTerms" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Signup submitted:", { role, ...form });
    // TODO: POST to /api/auth/signup once backend exists. That endpoint
    // should hash the password, create the user record with the chosen
    // role, send a real OTP to the phone number, and return a session/
    // token — none of that exists yet. The setTimeout below stands in
    // for that real network request.
    setTimeout(() => {
      setLoading(false);
      navigate("/verify-phone", { state: { role, phone: form.phone } });
    }, 1500);
  };

  const handleGoogleCredential = (credential) => {
    console.log("Google credential received:", credential);
    // TODO: POST this credential to /api/auth/google once backend
    // exists — that endpoint verifies the token with Google and
    // creates/looks up the user, then routes the same as handleSubmit.
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-margin-mobile">
        <div className="w-full max-w-[560px] bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-6 md:p-10">
          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Create Your Account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join Nigeria's most trusted real estate marketplace.
            </p>
          </div>

          <RoleSelector value={role} onChange={setRole} />

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div>
              <label htmlFor="full-name" className="block font-label-md text-label-md text-on-surface mb-1.5">
                Full Name
              </label>
              <input
                id="full-name"
                type="text"
                placeholder="Enter your legal name"
                value={form.fullName}
                onChange={updateField("fullName")}
                className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-label-md text-label-md text-on-surface mb-1.5">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant font-body-md">
                  +234
                </span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="801 234 5678"
                  value={form.phone}
                  onChange={updateField("phone")}
                  className="w-full px-4 py-3 border border-outline-variant rounded-r-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-label-md text-label-md text-on-surface mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={updateField("email")}
                className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block font-label-md text-label-md text-on-surface mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={updateField("password")}
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block font-label-md text-label-md text-on-surface mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input
                id="terms"
                type="checkbox"
                checked={form.agreedToTerms}
                onChange={updateField("agreedToTerms")}
                className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="font-body-md text-label-md text-on-surface-variant">
                I agree to the{" "}
                <Link to="/terms" className="text-primary font-bold underline">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary font-bold underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingLabel="Creating account..."
              className="w-full py-4 bg-primary text-white rounded-full font-headline-sm text-headline-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg disabled:opacity-80"
            >
              Create Account
            </LoadingButton>
          </form>

          <div className="relative my-stack-lg">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-on-surface-variant font-label-md">or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <GoogleSignInButton onCredential={handleGoogleCredential} />
            <FacebookSignInButton />
          </div>

          <p className="mt-stack-lg text-center font-body-md text-body-md text-on-surface-variant">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
