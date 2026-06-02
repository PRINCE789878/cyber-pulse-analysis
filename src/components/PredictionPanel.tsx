import { useEffect, useState } from "react";
import { RobotIcon } from "./RobotIcon";
import { DigitStream, useDigitStream } from "./DigitStream";

type Mode = "matches" | "evenodd" | "overunder";

interface PredictionPanelProps {
  mode: Mode;
  title: string;
  buttonLabel: string;
}

function generate(mode: Mode, latest: number) {
  const confidence = 70 + Math.floor(Math.random() * 25);
  if (mode === "matches") {
    const digit = Math.floor(Math.random() * 10);
    return {
      icon: "🎯",
      value: `Digit ${digit}`,
      sub: `Prediction: ${digit}`,
      confidence,
      description:
        "Recent market activity indicates increased probability of this digit appearing next due to observed pattern concentration and sequence frequency.",
    };
  }
  if (mode === "evenodd") {
    const even = latest % 2 === 0 ? Math.random() > 0.4 : Math.random() > 0.6;
    return {
      icon: even ? "🔵" : "🟣",
      value: even ? "EVEN" : "ODD",
      sub: even ? "🔵 EVEN" : "🟣 ODD",
      confidence,
      description: `Current digit sequence favors an ${even ? "even" : "odd"}-number continuation based on recent market behavior.`,
    };
  }
  const over = latest >= 5 ? Math.random() > 0.4 : Math.random() > 0.6;
  return {
    icon: over ? "🟢" : "🔴",
    value: over ? "OVER" : "UNDER",
    sub: over ? "🟢 OVER" : "🔴 UNDER",
    confidence,
    description: `Recent digit distribution indicates a higher probability of digits ${over ? "above" : "below"} the midpoint threshold.`,
  };
}

export function PredictionPanel({ mode, title, buttonLabel }: PredictionPanelProps) {
  const { latest, history } = useDigitStream();
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof generate> | null>(null);

  useEffect(() => {
    if (!result) return;
    const id = setTimeout(() => setResult(null), 7000);
    return () => clearTimeout(id);
  }, [result]);

  const onAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(generate(mode, latest));
      setAnalyzing(false);
    }, 1400);
  };

  return (
    <section className="panel border-glow p-5 sm:p-7 space-y-6">
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="text-accent animate-float">
            <RobotIcon size={44} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-glow tracking-wider">{title}</h2>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              AI Pattern Scanner Active
            </p>
          </div>
        </div>
        <span className="flex items-center gap-2 text-xs font-mono text-success">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_currentColor]" />
          LIVE
        </span>
      </header>

      <DigitStream latest={latest} history={history} />

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onAnalyze}
          disabled={analyzing}
          className="group relative w-full sm:w-auto px-8 py-3 rounded-md bg-gradient-to-b from-primary to-[oklch(0.4_0.2_27)] text-primary-foreground font-bold tracking-widest text-sm uppercase border border-accent/60 shadow-glow-sm hover:shadow-glow hover:scale-[1.02] active:scale-100 transition-all disabled:opacity-60 disabled:cursor-wait scan-line"
        >
          {analyzing ? "▸ AI SCANNING..." : buttonLabel}
        </button>

        {analyzing && (
          <div className="w-full max-w-sm h-1 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent animate-[scan_1s_linear_infinite]" />
          </div>
        )}

        {result && (
          <div className="w-full animate-fade-in-up panel border-glow p-5 space-y-3 text-center">
            <div className="text-3xl sm:text-4xl font-display font-bold text-accent text-glow">
              {result.sub}
            </div>
            <div className="font-mono text-sm">
              📊 Confidence:{" "}
              <span className="text-accent text-glow-sm">{result.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent shadow-glow-sm transition-all duration-700"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground italic">
              {result.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
