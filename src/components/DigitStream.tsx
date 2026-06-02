import { useEffect, useState } from "react";

interface DigitStreamProps {
  latest: number;
  history: number[];
}

export function DigitStream({ latest, history }: DigitStreamProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3">
        {Array.from({ length: 10 }, (_, d) => {
          const isLatest = d === latest;
          return (
            <div
              key={d}
              className={`relative flex h-9 w-9 sm:h-14 sm:w-14 items-center justify-center rounded-full border font-mono text-sm sm:text-xl font-bold transition-all duration-300 ${
                isLatest
                  ? "border-accent bg-accent/20 text-accent text-glow animate-pulse-glow scale-110"
                  : "border-border bg-card text-muted-foreground"
              }`}
            >
              {d}
              {isLatest && (
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-ping" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 justify-center text-xs font-mono text-muted-foreground">
        <span className="text-accent">▸ STREAM:</span>
        {history.slice(-12).map((d, i) => (
          <span key={i} className={i === history.slice(-12).length - 1 ? "text-accent text-glow-sm" : ""}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function useDigitStream() {
  const [latest, setLatest] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    // seed
    const seed = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
    setHistory(seed);
    setLatest(seed[seed.length - 1]);

    const id = setInterval(() => {
      const next = Math.floor(Math.random() * 10);
      setLatest(next);
      setHistory((h) => [...h.slice(-30), next]);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return { latest, history };
}
