import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import RoleSelector from "../components/RoleSelector";
import LoadingButton from "../components/LoadingButton";
import Icon from "../components/Icon";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState("BUYER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!form.agreedToTerms) {
      return setError("Please agree to the Terms of Service");
    }

    setLoading(true);
    try {
      await register({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role, // "BUYER" or "AGENT"
      });
      navigate("/verify-phone", { state: { role, phone: form.phone } });
    } catch (err) {
      setError(err.message || "Registration failed — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center px-margin-mobile py-stack-lg">
        <div className="w-full max-w-[520px] bg-white rounded-xl property-shadow p-8 md:p-12">
          <div className="text-center mb-6">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">
              Create Your Account
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join thousands of Nigerians finding their perfect home
            </p>
          </div>

          {/* Role selector — onChange receives "BUYER" or "AGENT" */}
          <RoleSelector role={role} onChange={setRole} />

          {error && (
            <div className="mb-4 p-3 bg-error-container rounded-lg flex items-center gap-2">
              <Icon name="error" className="text-error text-sm" />
              <p className="text-error text-sm font-label-md">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Full Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="text" required value={form.fullName} onChange={updateField("fullName")}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Phone Number <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="call" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="tel" required value={form.phone} onChange={updateField("phone")}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Email Address <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="email" required value={form.email} onChange={updateField("email")}
                  placeholder="name@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="password" required value={form.password} onChange={updateField("password")}
                  placeholder="Min 8 characters, 1 uppercase, 1 number"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2">
                Confirm Password <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Icon name="verified_user" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input type="password" required value={form.confirmPassword} onChange={updateField("confirmPassword")}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-lg font-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.agreedToTerms} onChange={updateField("agreedToTerms")}
                className="w-4 h-4 mt-1 rounded text-primary focus:ring-primary border-outline" />
              <span className="font-body-md text-body-md text-on-surface-variant text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <LoadingButton type="submit" loading={loading} loadingLabel="Creating account..."
              className="w-full py-4 bg-primary text-on-primary font-label-md font-bold rounded-full hover:opacity-90 transition-all mt-2">
              Create Account
            </LoadingButton>
          </form>

          <p className="text-center font-body-md text-on-surface-variant mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
