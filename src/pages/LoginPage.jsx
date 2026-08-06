import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      // Route based on role
      if (user.role === "ADMIN") return navigate("/admin");
      if (user.role === "AGENT") return navigate("/agent-dashboard");
      return navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg">
        <div className="w-full max-w-[480px] bg-white rounded-xl property-shadow p-8 md:p-12">
          <div className="text-center mb-stack-lg">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Welcome Back
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sign in to your KCEE account
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error-container rounded-lg flex items-center gap-2">
              <Icon name="error" className="text-error text-sm" />
              <p className="text-error text-sm font-label-md">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Email Address
              </label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-label-md text-label-md text-on-surface">Password</label>
                <Link to="/forgot-password" className="text-primary font-label-md text-sm hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingLabel="Signing in..."
              className="w-full py-4 bg-primary text-on-primary font-label-md font-bold rounded-full hover:opacity-90 transition-all"
            >
              Log In
            </LoadingButton>
          </form>

          <p className="text-center font-body-md text-on-surface-variant mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
