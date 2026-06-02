import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RobotIcon } from "@/components/RobotIcon";
import { authStore, CREDENTIALS } from "@/lib/auth-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tactical Analysis Tool — AI for Deriv Digit Markets" },
      {
        name: "description",
        content:
          "Premium AI-powered tactical analysis tool for Deriv digit markets. Matches/Differs, Even/Odd and Over/Under predictions.",
      },
      { property: "og:title", content: "Tactical Analysis Tool" },
      { property: "og:description", content: "Advanced AI Analysis for Deriv Digit Markets" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        authStore.login();
        navigate({ to: "/dashboard" });
      } else {
        setError("Access denied. Invalid credentials.");
        setLoading(false);
      }
    }, 1200);
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent("I want to purchase Tactical Analysis Tool for $75");
    window.open(`https://wa.me/254100737377?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* corner robot silhouettes */}
      <div className="absolute top-6 left-6 opacity-10 text-accent hidden md:block">
        <RobotIcon size={120} />
      </div>
      <div className="absolute bottom-6 right-6 opacity-10 text-accent hidden md:block">
        <RobotIcon size={120} />
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in-up relative z-10">
        <div className="text-center space-y-3">
          <div className="flex justify-center text-accent animate-float">
            <RobotIcon size={80} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-glow tracking-[0.15em]">
            TACTICAL ANALYSIS TOOL
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Advanced AI Analysis for Deriv Digit Markets
          </p>
        </div>

        <button
          onClick={openWhatsApp}
          className="w-full panel border-glow animate-pulse-glow hover:scale-[1.03] transition-transform p-4 text-center group"
        >
          <div className="text-lg font-bold text-accent text-glow tracking-wider">
            💰 PREMIUM ACCESS — $75
          </div>
          <div className="text-xs font-mono text-muted-foreground mt-1 group-hover:text-foreground">
            Tap to purchase via WhatsApp
          </div>
        </button>

        <form onSubmit={handleLogin} className="panel border-glow p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-accent">
              ▸ Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              className="w-full bg-input/40 border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-accent focus:shadow-glow-sm transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-accent">
              ▸ Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              className="w-full bg-input/40 border border-border rounded-md px-3 py-2.5 font-mono text-sm focus:outline-none focus:border-accent focus:shadow-glow-sm transition-all"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-[oklch(0.6_0.27_28)]"
            />
            <span>
              I agree to the <span className="text-accent">Terms and Conditions</span>
            </span>
          </label>

          {error && (
            <div className="text-xs font-mono text-accent text-center animate-fade-in-up">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!agreed || loading}
            className="relative w-full py-3 rounded-md bg-gradient-to-b from-primary to-[oklch(0.4_0.2_27)] text-primary-foreground font-bold tracking-[0.2em] border border-accent/60 shadow-glow-sm hover:shadow-glow hover:scale-[1.01] active:scale-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 scan-line"
          >
            {loading ? "▸ SCANNING IDENTITY..." : "LOGIN"}
          </button>
        </form>

        <p className="text-center text-[10px] font-mono text-muted-foreground">
          © 2026 TACTICAL ANALYSIS TOOL · AI-POWERED MARKET INTELLIGENCE
        </p>
      </div>
    </main>
  );
}
