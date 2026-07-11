import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import GoogleSignInButton from "../components/GoogleSignInButton";
import FacebookSignInButton from "../components/FacebookSignInButton";
import LoadingButton from "../components/LoadingButton";

/**
 * Mirrors SignupPage's structure (same AuthHeader/AuthFooter shell,
 * same social buttons) since login and signup are the same category
 * of page — visitors bounce between them via the links at the bottom
 * of each.
 *
 * The Stitch export's "Signing in..." spinner was a raw setTimeout in
 * a <script> tag with manual innerHTML swapping. Here it's real React
 * state driving the new LoadingButton component. The 1.5s delay is
 * fake — there's no backend to actually wait on yet — but the UI
 * pattern itself (disable + spinner + label swap while a request is
 * in flight) is exactly what a real login request will need, so
 * building it now isn't wasted work.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identity: "", password: "" });
  const [loading, setLoading] = useState(false);

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login submitted:", form);
    // TODO: POST to /api/auth/login once backend exists. That endpoint
    // verifies credentials and returns a session/token — the setTimeout
    // below is a placeholder for that real network request.
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleGoogleCredential = (credential) => {
    console.log("Google credential received:", credential);
    // TODO: POST this credential to /api/auth/google once backend exists.
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <AuthHeader />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-margin-mobile">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-outline-variant/30">
          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-md text-headline-md text-primary mb-2">Welcome Back</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Log in to manage your properties and saved favorites.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div className="space-y-1">
              <label htmlFor="identity" className="font-label-md text-label-md text-on-surface-variant">
                Phone Number or Email
              </label>
              <input
                id="identity"
                type="text"
                placeholder="Enter your email or phone"
                value={form.identity}
                onChange={updateField("identity")}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="font-label-md text-label-md text-on-surface-variant">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={updateField("password")}
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-primary font-label-md hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingLabel="Signing in..."
              className="w-full py-4 bg-primary text-on-primary font-bold rounded-full text-body-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-150 mt-stack-md disabled:opacity-80"
            >
              Log In
            </LoadingButton>
          </form>

          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-outline-variant" />
            <span className="flex-shrink mx-4 text-on-surface-variant font-label-md text-label-md">
              or log in with
            </span>
            <div className="flex-grow border-t border-outline-variant" />
          </div>

          <div className="flex gap-4 mb-stack-lg">
            <div className="flex-1">
              <GoogleSignInButton onCredential={handleGoogleCredential} />
            </div>
            <div className="flex-1">
              <FacebookSignInButton />
            </div>
          </div>

          <div className="text-center">
            <p className="font-body-md text-on-surface-variant">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
