import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/ht-ea")({
  component: HtEaMobile,
  head: () => ({
    meta: [
      { title: "HT EA Mobile — Algo Trading Console" },
      { name: "description", content: "HT PRO MOBILE — Viking-powered algorithmic trading console with broker connection and session control." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
});

const VIKING_IMG =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80";

type Phase = "loading" | "login" | "dashboard";

function HtEaMobile() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  // Loading animation
  useEffect(() => {
    if (phase !== "loading") return;
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 3000) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setFading(true);
        setTimeout(() => setPhase("login"), 600);
      }
    }, 30);
    return () => clearInterval(id);
  }, [phase]);

  return (
    <div className="hte-root">
      <style>{css}</style>
      <div className="hte-bg" aria-hidden />
      <div className="hte-vignette" aria-hidden />
      <div className="hte-shell">
        {phase === "loading" && <LoadingScreen progress={progress} fading={fading} />}
        {phase === "login" && <LoginScreen onSuccess={() => setPhase("dashboard")} />}
        {phase === "dashboard" && <Dashboard onLogout={() => setPhase("login")} />}
      </div>
    </div>
  );
}

function LoadingScreen({ progress, fading }: { progress: number; fading: boolean }) {
  return (
    <div className={`hte-loading ${fading ? "fade-out" : ""}`}>
      <div className="hte-viking float">
        <img src={VIKING_IMG} alt="Viking with glowing robotic eyes" />
        <div className="hte-eye left" />
        <div className="hte-eye right" />
      </div>
      <h1 className="hte-brand">HT EA MOBILE</h1>
      <p className="hte-sub">Initializing algorithmic core…</p>
      <div className="hte-progress">
        <div className="hte-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="hte-progress-pct">{Math.floor(progress)}%</div>
    </div>
  );
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (u.trim().toLowerCase() === "viking" && p === "ht ea bot") {
      setErr("");
      onSuccess();
    } else {
      setErr("ACCESS DENIED — Invalid credentials");
    }
  };

  return (
    <div className="hte-card fade-in">
      <div className="hte-viking sm float">
        <img src={VIKING_IMG} alt="Viking" />
        <div className="hte-eye left" />
        <div className="hte-eye right" />
      </div>
      <h2 className="hte-brand sm">HT EA MOBILE</h2>
      <p className="hte-tag">Authenticate to access the bot</p>
      <form onSubmit={submit} className="hte-form">
        <label className="hte-label">Username</label>
        <input
          className="hte-input"
          placeholder="Enter Username"
          value={u}
          onChange={(e) => setU(e.target.value)}
          autoComplete="username"
        />
        <label className="hte-label">Password</label>
        <input
          className="hte-input"
          type="password"
          placeholder="Enter Password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          autoComplete="current-password"
        />
        {err && <div className="hte-error">{err}</div>}
        <button className="hte-btn primary" type="submit">LOGIN</button>
        <button className="hte-btn access" type="button" onClick={() => alert("Redirecting to purchase…")}>
          GET ACCESS FOR 250 USD
        </button>
      </form>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [brokerOn, setBrokerOn] = useState(false);
  const [loginCode, setLoginCode] = useState("");
  const [brokerPw, setBrokerPw] = useState("");
  const [accountType, setAccountType] = useState("Demo Account");
  const [session, setSession] = useState("London");
  const [algoOn, setAlgoOn] = useState(false);
  const [status, setStatus] = useState("");

  const connect = () => {
    if (!loginCode || !brokerPw) {
      setStatus("Enter login code and password");
      return;
    }
    setStatus(`Connected to Just Market (${accountType}) — ${loginCode}`);
  };

  return (
    <div className="hte-dash fade-in">
      <header className="hte-dash-header">
        <div>
          <h1 className="hte-brand sm">HT PRO MOBILE</h1>
          <span className="hte-pill">● LIVE</span>
        </div>
        <button className="hte-logout" onClick={onLogout}>Exit</button>
      </header>

      <section className="hte-block">
        <div className="hte-row">
          <span className="hte-label">Connect to Just Market Broker</span>
          <button
            className={`hte-toggle ${brokerOn ? "on" : ""}`}
            onClick={() => setBrokerOn((v) => !v)}
            aria-label="Toggle broker"
          >
            <span className="knob" />
          </button>
        </div>
      </section>

      <section className="hte-block">
        <label className="hte-label">Broker Login Code</label>
        <div className="hte-inline">
          <input
            className="hte-input"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
            placeholder="e.g. 1024558"
            inputMode="numeric"
          />
          <button className="hte-btn primary slim" onClick={connect}>Connect</button>
        </div>
        <label className="hte-label">Broker Password</label>
        <input
          className="hte-input"
          type="password"
          value={brokerPw}
          onChange={(e) => setBrokerPw(e.target.value)}
          placeholder="Broker Password"
        />
        {status && <div className="hte-status">{status}</div>}
      </section>

      <section className="hte-block">
        <label className="hte-label">Account Type</label>
        <select className="hte-input" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option>Real Account</option>
          <option>Demo Account</option>
        </select>
      </section>

      <section className="hte-block">
        <label className="hte-label">Trading Session</label>
        <div className="hte-seg">
          {["Asian", "London", "New York"].map((s) => (
            <button
              key={s}
              className={`hte-seg-btn ${session === s ? "active" : ""}`}
              onClick={() => setSession(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <button
        className={`hte-btn algo ${algoOn ? "off" : "on"}`}
        onClick={() => setAlgoOn((v) => !v)}
      >
        {algoOn ? "DE-LAUNCH ALGO TRADING" : "LAUNCH ALGO TRADING"}
      </button>
    </div>
  );
}

const css = `
.hte-root {
  position: fixed; inset: 0;
  font-family: 'Inter', system-ui, sans-serif;
  color: #e6f7ff;
  overflow: hidden;
  background: #04060a;
}
.hte-bg {
  position: absolute; inset: -8%;
  background: url('${VIKING_IMG}') center/cover no-repeat;
  filter: blur(6px) brightness(0.35) saturate(1.1) hue-rotate(-10deg);
  animation: hte-float 12s ease-in-out infinite;
}
.hte-vignette {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(0,200,255,0.18), transparent 60%),
    radial-gradient(ellipse at 50% 100%, rgba(255,30,60,0.18), transparent 60%),
    linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.85));
}
.hte-shell {
  position: relative; z-index: 2;
  max-width: 440px; margin: 0 auto;
  height: 100%;
  display: flex; flex-direction: column;
  padding: 20px 18px;
  overflow-y: auto;
}

/* Viking graphic */
.hte-viking {
  position: relative; width: 180px; height: 180px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0,229,255,0.5);
  box-shadow: 0 0 30px rgba(0,229,255,0.5), inset 0 0 40px rgba(0,0,0,0.6);
}
.hte-viking.sm { width: 110px; height: 110px; }
.hte-viking img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.1) brightness(0.8); }
.hte-eye {
  position: absolute; top: 42%; width: 10px; height: 10px;
  background: #ff2d4a; border-radius: 50%;
  box-shadow: 0 0 12px #ff2d4a, 0 0 24px #ff2d4a;
  animation: hte-eye 1.6s ease-in-out infinite;
}
.hte-viking.sm .hte-eye { width: 6px; height: 6px; top: 40%; }
.hte-eye.left { left: 38%; }
.hte-eye.right { right: 38%; }
.float { animation: hte-float 6s ease-in-out infinite; }

/* Loading */
.hte-loading {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  transition: opacity .5s ease;
}
.hte-loading.fade-out { opacity: 0; }
.hte-brand {
  font-size: 28px; letter-spacing: 4px; margin: 22px 0 4px;
  background: linear-gradient(90deg, #00e5ff, #ff2d4a);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: 0 0 20px rgba(0,229,255,0.3);
}
.hte-brand.sm { font-size: 20px; margin: 14px 0 2px; }
.hte-sub { color: #7fb8c7; font-size: 13px; letter-spacing: 2px; }
.hte-progress {
  margin-top: 26px; width: 80%; height: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(0,229,255,0.3);
  border-radius: 4px; overflow: hidden;
}
.hte-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00e5ff, #ff2d4a);
  box-shadow: 0 0 12px #00e5ff;
  transition: width .1s linear;
}
.hte-progress-pct { margin-top: 8px; font-family: monospace; color: #00e5ff; }

/* Card / form */
.hte-card {
  margin: auto;
  width: 100%;
  background: rgba(10,14,22,0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(0,229,255,0.25);
  border-radius: 18px;
  padding: 22px 18px 18px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.1);
}
.hte-tag { text-align: center; color: #88aab5; font-size: 12px; margin: 4px 0 18px; letter-spacing: 1px; }
.hte-form { display: flex; flex-direction: column; gap: 8px; }
.hte-label { font-size: 11px; letter-spacing: 2px; color: #7fb8c7; text-transform: uppercase; margin-top: 6px; }
.hte-input {
  width: 100%; padding: 12px 14px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(0,229,255,0.25);
  border-radius: 10px;
  color: #e6f7ff; font-size: 14px;
  outline: none; transition: border-color .2s, box-shadow .2s;
}
.hte-input:focus { border-color: #00e5ff; box-shadow: 0 0 0 3px rgba(0,229,255,0.15); }
.hte-error {
  margin-top: 6px; padding: 8px 10px;
  background: rgba(255,45,74,0.12);
  border: 1px solid rgba(255,45,74,0.4);
  color: #ff8a9c; border-radius: 8px; font-size: 12px; text-align: center;
}
.hte-btn {
  margin-top: 10px; padding: 13px 14px;
  border: none; border-radius: 10px;
  font-weight: 700; letter-spacing: 1.5px; font-size: 13px;
  cursor: pointer; transition: transform .15s, box-shadow .2s, filter .2s;
}
.hte-btn.slim { margin: 0; padding: 12px 16px; white-space: nowrap; }
.hte-btn:hover { transform: translateY(-1px); filter: brightness(1.1); }
.hte-btn.primary {
  background: linear-gradient(90deg, #00b8d4, #00e5ff);
  color: #02141a;
  box-shadow: 0 0 18px rgba(0,229,255,0.5);
}
.hte-btn.access {
  background: linear-gradient(90deg, #ff2d4a, #ff7847);
  color: #fff;
  box-shadow: 0 0 18px rgba(255,45,74,0.5);
}

/* Dashboard */
.hte-dash { display: flex; flex-direction: column; gap: 14px; padding-bottom: 30px; }
.hte-dash-header { display: flex; justify-content: space-between; align-items: center; }
.hte-pill {
  display: inline-block; margin-left: 8px;
  font-size: 10px; letter-spacing: 1.5px;
  color: #00ff9c; padding: 2px 8px;
  border: 1px solid rgba(0,255,156,0.4); border-radius: 999px;
  background: rgba(0,255,156,0.08);
}
.hte-logout {
  background: transparent; color: #ff8a9c;
  border: 1px solid rgba(255,45,74,0.4);
  padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px;
}
.hte-block {
  background: rgba(10,14,22,0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0,229,255,0.18);
  border-radius: 14px;
  padding: 14px;
  display: flex; flex-direction: column; gap: 6px;
}
.hte-row { display: flex; justify-content: space-between; align-items: center; }
.hte-inline { display: flex; gap: 8px; }
.hte-inline .hte-input { flex: 1; }
.hte-status {
  margin-top: 8px; font-size: 12px; color: #00ff9c;
  background: rgba(0,255,156,0.08);
  border: 1px solid rgba(0,255,156,0.3);
  padding: 8px 10px; border-radius: 8px;
}

/* Toggle */
.hte-toggle {
  position: relative; width: 50px; height: 28px;
  border-radius: 999px; border: 1px solid rgba(0,229,255,0.3);
  background: rgba(255,255,255,0.05);
  cursor: pointer; transition: background .2s;
}
.hte-toggle .knob {
  position: absolute; top: 2px; left: 2px;
  width: 22px; height: 22px; border-radius: 50%;
  background: #7fb8c7; transition: transform .25s, background .2s;
}
.hte-toggle.on { background: linear-gradient(90deg, #00b8d4, #00e5ff); box-shadow: 0 0 12px rgba(0,229,255,0.6); }
.hte-toggle.on .knob { transform: translateX(22px); background: #02141a; }

/* Segmented */
.hte-seg { display: flex; gap: 6px; }
.hte-seg-btn {
  flex: 1; padding: 10px 6px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(0,229,255,0.2);
  color: #88aab5; border-radius: 8px; font-size: 12px;
  cursor: pointer; transition: all .2s; letter-spacing: 1px;
}
.hte-seg-btn.active {
  background: linear-gradient(90deg, rgba(0,229,255,0.25), rgba(255,45,74,0.2));
  color: #fff; border-color: #00e5ff;
  box-shadow: 0 0 10px rgba(0,229,255,0.4);
}

/* Algo button */
.hte-btn.algo {
  margin-top: 8px; padding: 18px;
  font-size: 15px; letter-spacing: 2px;
  border-radius: 14px;
  animation: hte-pulse 2s ease-in-out infinite;
}
.hte-btn.algo.on {
  background: linear-gradient(90deg, #00c853, #00ff9c);
  color: #021a0d;
  box-shadow: 0 0 24px rgba(0,255,156,0.5);
}
.hte-btn.algo.off {
  background: linear-gradient(90deg, #ff2d4a, #ff5e3a);
  color: #fff;
  box-shadow: 0 0 24px rgba(255,45,74,0.6);
}

.fade-in { animation: hte-fade-in .5s ease-out; }

@keyframes hte-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes hte-eye {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes hte-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hte-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
}
`;
