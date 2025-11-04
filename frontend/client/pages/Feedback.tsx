import { useState } from "react";
import { Link } from "react-router-dom";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Experience");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (e: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (feedback.trim().length < 10) {
      setError("Feedback must be at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          feedback,
          timestamp: Date.now(),
        }),
      });
      if (res.ok) {
        setSuccess("Thank you for your feedback!");
        setName("");
        setEmail("");
        setCategory("Experience");
        setFeedback("");
      } else {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Failed to submit feedback.");
      }
    } catch (err: any) {
      setError(err?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-12 flex justify-center">
      <div className="max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          We Value Your Feedback
        </h1>

        <div className="rounded-lg bg-[#E6D4F6] p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-3">Share Your Experience</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-11 rounded-md border px-3 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 rounded-md border px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
              >
                <option value="Experience">💬 Experience</option>
                <option value="Website Design">🎨 Website Design</option>
                <option value="Technical Issue">🐞 Technical Issue</option>
                <option value="Suggestion">💡 Suggestion</option>
                <option value="Other">🔎 Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                rows={6}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B9A]"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}
            {success && (
              <div className="text-sm text-foreground font-medium">
                {success}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-[#6A1B9A] text-white font-semibold btn-primary disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

            <div className="text-center mt-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:underline"
              >
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
