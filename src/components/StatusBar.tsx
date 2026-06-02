import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="panel border-glow px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono">
      <div className="flex items-center gap-2 text-success">
        <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse shadow-[0_0_10px_currentColor]" />
        AI SYSTEM ONLINE
      </div>
      <div className="flex items-center gap-2 text-accent">
        <span>CONNECTED TO DERIV ANALYSIS STREAM</span>
        <span className="flex items-end gap-0.5 h-4">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-0.5 bg-accent signal-bar"
              style={{ height: `${(i + 1) * 25}%`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
      <div className="text-muted-foreground tabular-nums">
        <span className="text-accent">⏱</span> {time}
      </div>
    </div>
  );
}
