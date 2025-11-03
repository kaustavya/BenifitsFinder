import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/digilocker/init");
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error || "Failed to initiate Digilocker auth");
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data?.url) {
        // Redirect browser to Digilocker authorization URL
        window.location.href = data.url;
      } else {
        setError("No redirect URL returned by server.");
      }
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-16">
      <div className="max-w-lg mx-auto bg-white shadow p-8 rounded">
        <h1 className="text-2xl font-semibold mb-4">Sign in with DigiLocker</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Use your DigiLocker account to securely sign in and share verified documents.
        </p>
        <div className="space-y-4">
          <button
            onClick={startLogin}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? "Redirecting…" : "Sign in with DigiLocker"}
          </button>

          <div className="text-sm text-muted-foreground">
            <strong>Note:</strong> To enable DigiLocker in development, set the following environment variables on the server:
            <ul className="pl-4 list-disc mt-2">
              <li>DIGILOCKER_CLIENT_ID</li>
              <li>DIGILOCKER_CLIENT_SECRET</li>
              <li>DIGILOCKER_REDIRECT_URI (e.g. https://your-app.com/api/auth/digilocker/callback)</li>
            </ul>
          </div>

          {error && <div className="text-sm text-destructive mt-2">{error}</div>}
        </div>
      </div>
    </section>
  );
}
