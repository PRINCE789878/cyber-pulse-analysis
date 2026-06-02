import { useEffect, useMemo, useRef, useState } from "react";
import { RobotIcon } from "./RobotIcon";

const VOLATILITIES = [
  { id: "R_10", label: "Volatility 10 Index (V10)", vol: 10 },
  { id: "R_25", label: "Volatility 25 Index (V25)", vol: 25 },
  { id: "R_50", label: "Volatility 50 Index (V50)", vol: 50 },
  { id: "R_75", label: "Volatility 75 Index (V75)", vol: 75 },
  { id: "R_100", label: "Volatility 100 Index (V100)", vol: 100 },
  { id: "1HZ10V", label: "Volatility 10 (1s) Index", vol: 10 },
  { id: "1HZ25V", label: "Volatility 25 (1s) Index", vol: 25 },
  { id: "1HZ50V", label: "Volatility 50 (1s) Index", vol: 50 },
  { id: "1HZ75V", label: "Volatility 75 (1s) Index", vol: 75 },
  { id: "1HZ100V", label: "Volatility 100 (1s) Index", vol: 100 },
];

const POINTS = 60;

export function VolatilityMonitor() {
  const [selected, setSelected] = useState(VOLATILITIES[0].id);
  const [series, setSeries] = useState<number[]>(() =>
    Array.from({ length: POINTS }, () => 50),
  );
  const [digits, setDigits] = useState<number[]>([]);
  const seedRef = useRef(50);

  const active = useMemo(
    () => VOLATILITIES.find((v) => v.id === selected)!,
    [selected],
  );

  // Reset on volatility change
  useEffect(() => {
    seedRef.current = 50;
    setSeries(Array.from({ length: POINTS }, () => 50));
    setDigits([]);
  }, [selected]);

  // Tick speed: 1s indices faster
  useEffect(() => {
    const interval = active.id.startsWith("1HZ") ? 500 : 1000;
    const id = setInterval(() => {
      const noise = (Math.random() - 0.5) * (active.vol / 5);
      seedRef.current = Math.max(
        5,
        Math.min(95, seedRef.current + noise),
      );
      setSeries((s) => [...s.slice(1), seedRef.current]);
      setDigits((d) =>
        [...d, Math.floor(Math.random() * 10)].slice(-12),
      );
    }, interval);
    return () => clearInterval(id);
  }, [active]);

  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const w = 600;
  const h = 160;
  const path = series
    .map((v, i) => {
      const x = (i / (POINTS - 1)) * w;
      const y = h - ((v - min) / range) * (h - 20) - 10;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  const last = series[series.length - 1];
  const prev = series[series.length - 2] ?? last;
  const trendUp = last >= prev;
  const signalStrength = Math.min(
    100,
    Math.round(50 + ((last - 50) / 50) * 50 + Math.random() * 8),
  );

  return (
    <section className="panel border-glow p-5 sm:p-7 space-y-6">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="text-accent animate-float">
            <RobotIcon size={44} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-glow tracking-wider">
              VOLATILITY SIGNAL MONITOR
            </h2>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Live Market Stream · AI Pulse Engine
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 text-xs font-mono text-success">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_currentColor]" />
          STREAMING
        </span>
      </header>

      <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
        <label className="block">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            ▸ Select Volatility Index
          </span>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="mt-1 w-full bg-secondary/60 border border-border rounded-md px-3 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-accent focus:shadow-glow-sm transition"
          >
            {VOLATILITIES.map((v) => (
              <option key={v.id} value={v.id} className="bg-background">
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <div className="panel border-glow px-4 py-2 text-center min-w-[120px]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Volatility
          </div>
          <div className="text-2xl font-display font-bold text-accent text-glow">
            {active.vol}%
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="panel border-glow p-4 relative overflow-hidden scan-line">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            ▸ Signal Monitor · {active.label}
          </span>
          <span
            className={`text-xs font-mono ${trendUp ? "text-success" : "text-accent"} text-glow-sm`}
          >
            {trendUp ? "▲" : "▼"} {last.toFixed(2)}
          </span>
        </div>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-40"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="vg-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.6 0.27 28)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="oklch(0.6 0.27 28)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vg-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.5 0.22 27)" />
              <stop offset="100%" stopColor="oklch(0.68 0.28 25)" />
            </linearGradient>
          </defs>
          {/* grid */}
          {[0.25, 0.5, 0.75].map((p) => (
            <line
              key={p}
              x1="0"
              x2={w}
              y1={h * p}
              y2={h * p}
              stroke="oklch(0.6 0.27 28 / 0.12)"
              strokeDasharray="4 6"
            />
          ))}
          <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#vg-fill)" />
          <path
            d={path}
            fill="none"
            stroke="url(#vg-line)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px oklch(0.6 0.27 28 / 0.8))" }}
          />
          {/* last point */}
          {(() => {
            const x = w;
            const y = h - ((last - min) / range) * (h - 20) - 10;
            return (
              <>
                <circle cx={x - 2} cy={y} r="6" fill="oklch(0.6 0.27 28 / 0.25)" />
                <circle cx={x - 2} cy={y} r="3" fill="oklch(0.68 0.28 25)" />
              </>
            );
          })()}
        </svg>
      </div>

      {/* Signal strength + digits */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="panel border-glow p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              ▸ Signal Strength
            </span>
            <span className="font-mono text-sm text-accent text-glow-sm">
              {signalStrength}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent shadow-glow-sm transition-all duration-500"
              style={{ width: `${signalStrength}%` }}
            />
          </div>
          <div className="flex items-end gap-1 h-10">
            {Array.from({ length: 16 }).map((_, i) => {
              const height =
                20 +
                Math.abs(Math.sin((Date.now() / 300 + i) * 0.7)) * 80;
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-primary/40 to-accent rounded-sm signal-bar"
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="panel border-glow p-4 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            ▸ Recent Tick Digits
          </span>
          <div className="flex flex-wrap gap-1.5">
            {digits.length === 0 && (
              <span className="text-xs font-mono text-muted-foreground">
                Awaiting stream…
              </span>
            )}
            {digits.map((d, i) => (
              <span
                key={`${i}-${d}`}
                className={`h-8 w-8 grid place-items-center font-mono text-sm rounded-md border ${
                  i === digits.length - 1
                    ? "border-accent text-accent text-glow-sm bg-accent/10 animate-digit-pop"
                    : "border-border text-muted-foreground"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">
            Symbol: <span className="text-accent">{active.id}</span> · Ticks
            cached: {digits.length}/12
          </div>
        </div>
      </div>
    </section>
  );
}
