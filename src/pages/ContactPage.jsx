import { useState } from "react";
import StaticPage from "../components/StaticPage";

/**
 * A real, working form (controlled inputs, validation via `required`)
 * rather than a static placeholder — this is the one footer page where
 * "looks clickable but does nothing" would feel most obviously broken
 * to a visitor. Submission just confirms locally for now; the TODO
 * marks where it connects to a real endpoint later.
 */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: connect to POST /api/contact once backend exists
  };

  return (
    <StaticPage title="Contact Us" subtitle="We'd love to hear from you.">
      {submitted ? (
        <p className="text-primary font-medium">
          Thanks, {form.name || "there"} — your message has been received.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 not-italic">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              className="w-full border border-outline-variant rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              className="w-full border border-outline-variant rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={handleChange("message")}
              className="w-full border border-outline-variant rounded-lg py-2 px-3 focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-full font-label-md hover:opacity-90 transition-all"
          >
            Send Message
          </button>
        </form>
      )}
    </StaticPage>
  );
}
