import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { RobotIcon } from "@/components/RobotIcon";
import { PredictionPanel } from "@/components/PredictionPanel";
import { StatusBar } from "@/components/StatusBar";
import { VolatilityMonitor } from "@/components/VolatilityMonitor";
import { authStore } from "@/lib/auth-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Tactical Analysis Tool" },
      { name: "description", content: "AI-powered analysis dashboard for Deriv digit markets." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isAuthed()) {
      navigate({ to: "/" });
    }
  }, [navigate]);

  const handleLogout = () => {
    authStore.logout();
    navigate({ to: "/" });
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8 sm:py-10 max-w-6xl mx-auto space-y-6">
      <header className="panel border-glow p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="text-accent animate-float">
            <RobotIcon size={56} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-glow tracking-[0.15em]">
              TACTICAL ANALYSIS TOOL
            </h1>
            <p className="text-xs font-mono text-muted-foreground">
              Welcome to Tactical Analysis Tool — Deriv Digit AI Suite
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-mono uppercase tracking-widest px-4 py-2 border border-border rounded-md hover:border-accent hover:text-accent transition-colors"
        >
          ▸ Logout
        </button>
      </header>

      <StatusBar />

      <VolatilityMonitor />

      <PredictionPanel
        mode="matches"
        title="MATCHES & DIFFERS"
        buttonLabel="ANALYZE NEXT DIGIT"
      />
      <PredictionPanel
        mode="evenodd"
        title="EVEN / ODD ANALYSIS"
        buttonLabel="PREDICT EVEN OR ODD"
      />
      <PredictionPanel
        mode="overunder"
        title="OVER / UNDER"
        buttonLabel="PREDICT OVER / UNDER"
      />

      <footer className="pt-4">
        <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent shadow-glow-sm" />
        <div className="flex flex-col items-center gap-2 py-6 text-center">
          <div className="text-accent opacity-70">
            <RobotIcon size={40} />
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            © 2026 Tactical Analysis Tool. All Rights Reserved.
          </p>
          <p className="text-[10px] font-mono text-accent tracking-widest">
            AI-POWERED MARKET ANALYSIS DASHBOARD
          </p>
        </div>
      </footer>
    </main>
  );
}
